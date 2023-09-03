import eslintJs from '@eslint/js';
import type { Linter } from 'eslint';
import fsExt from 'fs-extra';
import path from 'node:path';
import process from 'node:process';
import {
  plugins,
  type EslintConfig,
  type EslintConfigWithExtends,
} from './common.js';
import { mergeEslintConfigs } from './utils.js';

/** 生成配置集 */
export async function generateConfigs() {
  /** 配置集目录 */
  const configsDir = path.join(process.cwd(), 'lib/configs');
  // 输出eslint内置配置集
  const eslintConfigs: Record<string, EslintConfig> = {
    all: {
      rules: eslintJs.configs.all.rules,
      settings: {},
    },
    recommended: {
      rules: eslintJs.configs.recommended.rules,
      settings: {},
    },
  };
  fsExt.outputFileSync(
    path.join(configsDir, 'eslint.js'),
    // prettier-ignore
    `export default ${JSON.stringify(eslintConfigs, null, 2)};
`,
    { encoding: 'utf-8' },
  );

  // 遍历输出插件配置集
  for (const plugin of plugins) {
    /** 插件模块 */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const module = await import(plugin);
    /** 插件配置集 */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const configs: Record<string, Linter.Config> = module.default.configs;

    for (const [name, config] of Object.entries(configs)) {
      config.extends = config.extends
        ? typeof config.extends === 'string'
          ? [config.extends]
          : config.extends
        : [];

      config.extends = config.extends.map((extendName) => {
        extendName = path.basename(extendName).replace('.js', '');
        return extendName;
      });

      config.rules = config.rules ?? {};
      Object.keys(config.rules).forEach((ruleName) => {
        if (config.rules![ruleName] === 0) {
          config.rules![ruleName] = 'off';
        } else if (config.rules![ruleName] === 1) {
          config.rules![ruleName] = 'warn';
        } else if (config.rules![ruleName] === 2) {
          config.rules![ruleName] = 'error';
        }
      });
      config.settings = config.settings ?? {};
      configs[name] = config;
    }

    /** 继承合并配置 */
    const eslintConfig = mergeEslintConfigs(
      configs as Record<string, EslintConfigWithExtends>,
    );

    /** 配置集文件路径 */
    const configsPath = path.join(configsDir, `${plugin.replace('/', '_')}.js`);
    // 输出配置集
    fsExt.outputFileSync(
      configsPath,
      // prettier-ignore
      `export default ${JSON.stringify(eslintConfig, null, 2)};
`,
      { encoding: 'utf-8' },
    );
  }
  console.log('配置文件集生成完成');
}

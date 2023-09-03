import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

import typescriptPluginConfigs from './configs/@typescript-eslint_eslint-plugin.js';

export default {
  files: [
    '**/*.ts',
    '**/*.cts',
    '**/*.mts',
    '**/*.tsx',
    '**/*.ctsx',
    '**/*.mtsx',
    '**/*.vue',
    '**/*.nvue',
  ],
  plugins: {
    '@typescript-eslint': typescriptPlugin,
  },
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      project: ['**/tsconfig.json', '**/tsconfig.*.json'],
      extraFileExtensions: ['.vue', '.nvue'],
    },
  },
  rules: {
    ...typescriptPluginConfigs.recommended.rules,
    ...typescriptPluginConfigs['recommended-requiring-type-checking'].rules,
    // 覆盖eslint-recommended中的规则
    ...typescriptPlugin.configs['eslint-recommended'].overrides[0].rules,
  },
  settings: {
    ...typescriptPluginConfigs.recommended.settings,
    ...typescriptPluginConfigs['recommended-requiring-type-checking'].settings,
  },
};

import babelParser from '@babel/eslint-parser';
import eslintConfigs from './configs/eslint.js';

export default {
  files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.jsx'],
  plugins: {},
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: babelParser,
    parserOptions: {
      requireConfigFile: false,
      babelOptions: {
        babelrc: false,
        configFile: false,
        presets: ['@babel/preset-env'],
      },
    },
    globals: {},
  },
  rules: {
    ...eslintConfigs.rules,
  },
  settings: {
    ...eslintConfigs.settings,
  },
};

import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactHooksPluginConfigs from './configs/eslint-plugin-react-hooks.js';
import reactPluginConfigs from './configs/eslint-plugin-react.js';

export default {
  files: ['**/*.jsx', '**/*.tsx'],
  plugins: {
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      babelOptions: {
        presets: ['@babel/preset-react'],
      },
    },
  },
  rules: {
    ...reactPluginConfigs.recommended.rules,
    ...reactHooksPluginConfigs.recommended.rules,
    ...reactPluginConfigs['jsx-runtime'].rules,
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    ...reactPluginConfigs.recommended.settings,
    ...reactHooksPluginConfigs.recommended.settings,
    ...reactPluginConfigs['jsx-runtime'].settings,
  },
};

const js = require('@eslint/js');
const jestPlugin = require('eslint-plugin-jest');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

const baseGlobals =
  (js.configs.recommended.languageOptions &&
    js.configs.recommended.languageOptions.globals) ||
  {};
const browserGlobals = {
  document: 'readonly',
  window: 'readonly',
  console: 'readonly',
  fetch: 'readonly',
  setTimeout: 'readonly',
  Image: 'readonly'
};

module.exports = [
  {
    ignores: ['node_modules', 'dist', 'coverage', 'eslint.config.cjs']
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...baseGlobals,
        ...browserGlobals,
        Chart: 'readonly',
        html2canvas: 'readonly',
        FileReader: 'readonly',
        module: 'readonly'
      }
    },
    plugins: {
      jest: jestPlugin,
      prettier: prettierPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      'jest/prefer-hooks-on-top': 'off'
    }
  },
  {
    files: ['**/__tests__/**'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...((jestPlugin.environments && jestPlugin.environments.globals
          ? jestPlugin.environments.globals.globals
          : undefined) || {}),
        global: 'readonly',
        jest: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        DOMParser: 'readonly'
      }
    }
  }
];

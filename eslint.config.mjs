import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['eslint.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
    rules: {},
  },

  {
    files: ['**/*.ts'],
    ignores: ['node_modules/', 'dist/', 'database/prisma'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  pluginJs.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,

  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': ['error'],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-function': [
        'warn',
        { allow: ['constructors'] },
      ],
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
    },
  },
];

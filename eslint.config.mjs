import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'
import lodashImportMethod from 'eslint-plugin-lodash-import-method'
import prettierPlugin from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/.github',
      '**/.husky',
      '**/docs',
      '**/public',
      '**/uploads',
      '**/run',
      '**/watch.js',
      '**/frameworks',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ),
  prettierConfig,
  {
    plugins: {
      'lodash-import-method': lodashImportMethod,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
    },
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'lodash-import-method/submodule': 'error',
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: false,
          trailingComma: 'all',
          endOfLine: 'auto',
        },
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 1,
        },
      ],

      quotes: ['error', 'single'],
      'prefer-template': 'error',
    },
  },
]

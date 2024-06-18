const path = require('node:path')

require('@rushstack/eslint-patch/modern-module-resolution')

const tsconfig = path.join(process.cwd(), 'tsconfig.json')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
    'turbo',
  ],
  plugins: ['@typescript-eslint', 'import', 'react'],
  parserOptions: {
    project: tsconfig,
  },
  rules: {
    'prettier/prettier': 'warn',
    'sort-keys': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', ['sibling', 'index']],
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        project: tsconfig,
      },
    },
  },
}

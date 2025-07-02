import antfu from '@antfu/eslint-config'
import { tanstackConfig } from '@tanstack/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import oxlint from 'eslint-plugin-oxlint'

export default [
  ...(await antfu({
    react: true,
    rules: {
      'node/prefer-global/process': 'off',
      'no-console': 'off',
    },
  })),
  {
    files: ['**/*.{ts,tsx}'],
    ...tanstackConfig[0],
  },
  {
    ignores: ['src/routeTree.gen.ts'],
  },
  eslintConfigPrettier,
  ...oxlint.configs['flat/recommended'],
]

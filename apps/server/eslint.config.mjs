import antfu from '@antfu/eslint-config'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import oxlint from 'eslint-plugin-oxlint'

export default [
  ...(await antfu({
    rules: {
      'node/prefer-global/process': 'off',
      'no-console': 'off',
    },
  })),
  eslintConfigPrettier,
  ...oxlint.configs['flat/recommended'],
]

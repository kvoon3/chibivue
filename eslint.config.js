// @ts-check

import { antfu } from '@antfu/eslint-config'

export default antfu(
  {
    pnpm: true,
    type: 'lib',
  },
  {
    files: ['./playground/**/*.?([cm])ts', './playground**/*.?([cm])tsx'],
    rules: {
      'ts/explicit-function-return-type': 'off',
    },
  },
)

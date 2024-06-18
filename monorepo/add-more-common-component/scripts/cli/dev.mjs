/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

import chalk from 'chalk'
import { execa } from 'execa'

export default async (env, argv) => {
  process.env.APP_ENV = env
  process.env.LOCAL = argv?.local ?? false

  console.log(`${chalk.green(env)} 환경에서 실행합니다.`)

  try {
    await execa('concurrently', ['-n', 'next-app', 'pnpm --filter @monorepo-app/service dev'], {
      stdio: 'inherit',
    })
  } catch (e) {
    console.error('\n' + (e.shortMessage || e.message))
    process.exit(e.exitCode || 1)
  }
}

/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

import start from './start.mjs'

const shortshands = {
  dev: 'development',
  prod: 'production',
};

const setPositionalEnv = yargs =>
  yargs
    .positional('env', {
      coerce: parseEnv,
      default: 'dev',
      describe: '개발 환경(APP_ENV)',
    })
    .option('local', {
      boolean: true,
      description: '로컬 환경인지 체크합니다.',
    })

yargs(hideBin(process.argv))
  .scriptName('cli')
  .command(
    'start [env] [local]',
    '개발 환경을 실행합니다.',
    setPositionalEnv,
    argv => start(argv.env, argv)
  )
  .choices('env', ['dev', 'development', 'prod', 'production'])
  .help().argv;

function parseEnv(input) {
  return shortshands[input] || input;
}

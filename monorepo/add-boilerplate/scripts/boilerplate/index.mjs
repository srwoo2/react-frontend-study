import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'

import createApp from './create-app.mjs'

const setPositional = (yargs) =>
  yargs
    .positional('name', {
      default: 'test',
      describe: '생성할 이름',
    })
    .positional('packageName', {
      default: 'test',
      describe: '생성할 패키지 이름',
    })

yargs(hideBin(process.argv))
  .scriptName('bp')
  .command('create [name] [packageName]', 'app 디렉토리에 템플릿 기반의 product를 생성합니다.', setPositional, (argv) =>
    createApp(argv.name, argv.packageName),
  )
  .help().argv

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

// 복사할 경로
const input = path.join(process.cwd(), 'scripts', 'boilerplate', '__template__', '__template_name__')
// 생성될 경로
const output = path.join(process.cwd(), 'apps')

/**
 * template을 카피 후 복사 붙여넣기 합니다.
 * 그러면서 TEMPLATE_NAME 부분을 치환합니다.
 */
async function templatePasteAfterCopy(name, packageName) {
  const makeFolder = path.join(output, name)

  await fs.mkdirSync(path.join(makeFolder))
  await fs.cpSync(input, makeFolder, { recursive: true })

  const packageJsonPath = path.join(makeFolder, 'package.json')
  const packageJsonFileText = await fs.readFileSync(packageJsonPath, {
    encoding: 'utf-8',
  })
  const result = packageJsonFileText.replace('TEMPLATE_NAME', packageName)
  await fs.writeFileSync(packageJsonPath, result)
}

export default async (name, packageName) => {
  console.log(`${chalk.green(name)} ${chalk.red(packageName)}을 생성합니다.`)

  try {
    await templatePasteAfterCopy(name, packageName)
  } catch (e) {
    console.error('\n' + (e.shortMessage || e.message))
    process.exit(e.exitCode || 1)
  }
}

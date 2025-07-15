/* eslint-disable no-console */
import { renameSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
const distDir = './dist'
const typesDir = './dist/types'
// 创建 types 目录
if (!existsSync(typesDir)) {
  mkdirSync(typesDir, { recursive: true })
  console.log('✅ 创建 types 目录')
}
// 要移动的目录
const dirsToMove = ['core', 'utils', 'components']
dirsToMove.forEach((dir) => {
  const source = join(distDir, dir)
  const target = join(typesDir, dir)
  if (existsSync(source)) {
    renameSync(source, target)
    console.log(`✅ 移动: ${dir}`)
  }
})
console.log('完成！')

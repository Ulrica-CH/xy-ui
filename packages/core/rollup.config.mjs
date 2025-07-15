import vue from 'unplugin-vue/rollup'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

import { readdirSync } from 'fs'
import { map, filter } from 'lodash-es'

/** 处理需要分包的Components */
function getDirectoriesSync(basePath) {
  const entries = readdirSync(basePath, { withFileTypes: true })
  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name,
  )
}

const config = {
  input: './index.ts',
  output: {
    dir: './dist',
    format: 'esm',
    manualChunks(id) {
      if (id.includes('node_modules')) return 'vendor'
      if (id.includes('/packages/utils/')) return 'utils'
      for (const item of getDirectoriesSync('../components')) {
        if (id.includes(`/packages/components/${item}/`) && item !== 'Icon')
          return item
        // if (id.includes(`/packages/components/${item}/`)) return item
      }
    },
  },
  plugins: [
    vue(),
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      extract: true, // 或 extract: 'index.css'
      minimize: true, // 可选，压缩
      extensions: ['.css', '.scss'],
    }),
  ],
  external: [
    'vue',
    '@fontawesome/vue-fontawesome',
    '@fortawesome/fontawesome-svg-core',
    '@fortawesome/free-solid-svg-icons',
    'lodash-es',
  ],
}

export default config

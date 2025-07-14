import vue from 'unplugin-vue/rollup'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

export default {
  input: './index.ts',
  output: {
    dir: './dist',
    format: 'esm',
    manualChunks(id) {
      if (id.includes('node_modules')) {
        return 'vendor'
      }
      if (id.includes('/packages/utils/')) {
        return 'utils'
      }
      // if (id.includes('/packages/components/Button')) {
      //   return 'Button'
      // }
      // ... 你可以继续自定义
    },
  },
  plugins: [
    vue(),
    resolve(),
    commonjs(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declarationDir: 'dist/types',
          declaration: true,
          outDir: 'dist/types',
        },
      },
    }),
    postcss({
      extract: true, // 或 extract: 'index.css'
      minimize: true, // 可选，压缩
      sourceMap: true, // 可选，生成 source map
      // 你可以加上 extensions 以确保 .scss 被处理
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

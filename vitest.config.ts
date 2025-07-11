/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // include: ['packages/**/*.test.{ts,tsx}'],
    // setupFiles: [resolve(__dirname, './vitest.setup.ts')],
  },
  plugins: [vue(), vueJsx()],
  // define: {
  //   PROD: JSON.stringify(false),
  //   DEV: JSON.stringify(false),
  //   TEST: JSON.stringify(true),
  // },
})

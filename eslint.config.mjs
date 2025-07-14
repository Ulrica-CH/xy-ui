// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

import eslint from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
export default tseslint.config(
  {
    ignores: ['node_modules', 'dist', 'public'],
  } /** js推荐配置 */,
  eslint.configs.recommended /** ts推荐配置 */,
  ...tseslint.configs.recommended /** vue推荐配置 */,
  ...eslintPluginVue.configs['flat/recommended'] /** javascript 规则 */,
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    rules: {
      'no-console': 'error',
    },
  } /** 配置全局变量 */,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  } /** vue 规则 */,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        /** typescript项目需要用到这个 */
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        /** 允许在.vue 文件中使用 JSX */
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 在这里追加 vue 规则
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
      'vue/multi-word-component-names': 'off',
    },
  } /** typescript 规则 */,
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      'no-console': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  } /** prettier 配置 */,
  eslintPluginPrettierRecommended,
  storybook.configs['flat/recommended'],
)

// https://juejin.cn/post/7402696141495779363?searchId=20250710165854537AF49EEEAF7F7A34DB#heading-11

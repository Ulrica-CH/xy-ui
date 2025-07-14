<script lang="ts" setup>
import { provide, reactive, toRef } from 'vue'
import { ButtonGroupProps } from './type'
import { BUTTON_GROUP_CTX_KEY } from './constants'

defineOptions({ name: 'XyButtonGroup' })

const props = defineProps<ButtonGroupProps>()

/**
 * 在 provide/inject 中
 * 子组件需要响应父组件 props 的变化
 * 如果传递的是值，子组件无法感知变化 props.size
 * 如果传递的是引用，子组件可以响应变化
 */
provide(
  BUTTON_GROUP_CTX_KEY,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
    disabled: toRef(props, 'disabled'),
  }),
)
</script>

<!-- <template>
  <div
    class="xy-button-group"
    :class="{
      [`xy-button-group--${size}`]: size,
      [`xy-button-group--${type}`]: type,
    }"
    :disabled="disabled"
  >
    <slot></slot>
  </div>
</template> -->

<!-- 透传给 button -->
<template>
  <div class="xy-button-group">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
@use './style.scss';
</style>

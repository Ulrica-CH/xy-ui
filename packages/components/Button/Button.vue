<script lang="ts" setup>
import { ref } from 'vue'
import ButtonProps from './type'
defineOptions({ name: 'XyButton' })
withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
})
const _ref = ref<HTMLButtonElement>()
// const slots = defineSlots()
</script>

<template>
  <component
    :is="tag"
    ref="_ref"
    :type="tag === 'button' ? nativeType : void 0"
    class="xy-button"
    :class="{
      [`xy-button--${type}`]: type,
      [`xy-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :loading="loading"
    :plain="plain"
    :round="round"
    :circle="circle"
  >
    <slot></slot>
  </component>
</template>

<style scoped></style>

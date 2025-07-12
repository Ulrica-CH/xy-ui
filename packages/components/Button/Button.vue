<script lang="ts" setup>
import { computed, ref } from 'vue'
import { throttle } from 'lodash-es'
import ButtonProps, { ButtonEmits, ButtonInstance } from './type'
import XyIcon from '../Icon'
defineOptions({ name: 'XyButton' })
const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  nativeType: 'button',
  useThrottle: false,
  throttleDelay: 2000,
})

const emits = defineEmits<ButtonEmits>()
const _ref = ref<HTMLButtonElement>()
const slots = defineSlots()
const handleClick = (e: MouseEvent) => {
  emits('click', e)
}
const handleThrottleClick = throttle(handleClick, props.throttleDelay)
const iconStyle = computed(() => ({
  marginRight: slots.default ? '6px' : '0px',
}))

defineExpose<ButtonInstance>({
  ref: _ref,
})
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
    :autofocus="autofocus"
    @click="
      (e: MouseEvent) => (useThrottle ? handleThrottleClick(e) : handleClick(e))
    "
  >
    <template v-if="loading">
      <slot name="loading">
        <er-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>
    <xy-icon
      v-if="icon && !loading"
      :icon="icon"
      size="1x"
      :style="iconStyle"
    />
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
@import './style.scss';
</style>

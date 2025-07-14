import type { Component, Ref } from 'vue'

export type ButtonSize = 'large' | 'default' | 'small'
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export default interface ButtonProps {
  tag?: string | Component
  size?: ButtonSize
  type?: ButtonType
  nativeType?: ButtonNativeType
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: string
  loadingIcon?: string
  autofocus?: boolean
  useThrottle?: boolean
  throttleDelay?: number
}

export interface ButtonEmits {
  (e: 'click', value: MouseEvent): void
}
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
}

export interface ButtonGroupProps {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}
export interface ButtonGroupContext {
  size?: ButtonSize
  type?: ButtonType
  disabled?: boolean
}

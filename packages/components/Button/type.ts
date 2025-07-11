import type { Component } from 'vue'

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
}

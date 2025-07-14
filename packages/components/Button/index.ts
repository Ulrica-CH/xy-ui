import Button from './Button.vue'
import ButtonGroup from './ButtonGroup.vue'
import { withInstall } from '@xy-ui/utils'

export * from './type'
export const XyButton = withInstall(Button)
export const XyButtonGroup = withInstall(ButtonGroup)

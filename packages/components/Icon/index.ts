import Icon from './Icon.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { withInstall } from '@xy-ui/utils'
library.add(fas)
export * from './types'
export const XyIcon = withInstall(Icon)

export default XyIcon

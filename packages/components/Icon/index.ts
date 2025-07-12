import Icon from './index.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { withInstall } from '@xy-ui/utils'
library.add(fas)
export const XyIcon = withInstall(Icon)

export default XyIcon

import { makeInstall } from '@xy-ui/utils'

import components from './component'
import '@xy-ui/theme/index.scss'
const installer = makeInstall(components)

export * from './component'
export default installer

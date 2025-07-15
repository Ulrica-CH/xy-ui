import { makeInstall } from '@xy-ui/utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import components from './component'
import '@xy-ui/theme/index.scss'
const installer = makeInstall(components)

library.add(fas)
export * from '../components'
export default installer

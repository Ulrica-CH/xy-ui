import type { App, Plugin } from 'vue'

type SFCWithInstall<T> = T & Plugin

/**
 * 安装组件
 * app.use时就是调用install方法
 * @param component 组件
 * @returns 组件
 */
export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any)?.name || 'UnnamedComponent'
    app.component(name, component as SFCWithInstall<T>)
  }
  return component as SFCWithInstall<T>
}

export const makeInstall = (components: Plugin[]) => (app: App) => {
  components.forEach((component) => {
    app.use(component)
  })
}

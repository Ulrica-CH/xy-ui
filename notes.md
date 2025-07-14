# 边写边记录

## pnpm install @xy-ui/components -w 问题

- 这样回去远程仓库找
- 先在主包 package.json 写 "@xy-ui/components": "workspace:\*",,在 pnpm i

## 命令行创建写入文件

- echo -e 'packages:\n' - "packages/\*" > pnpm-workspace.yaml
- 每个子包可以用 shell 脚本 pnpm init

```shell
for i in core components theme hooks utils; do
    cd $i
    pnpm init
    cd ..
done

chmod 755 init.shell
```

## 创建组件 play 环境

- vite创建项目 pnpm create vite play --template vue-ts
- import @xy-ui/core
- 去掉和主包重复的依赖

## 组件注册流程

- utils
  - 创建 withInstall 函数,给每个 component注册 install 函数,是用 app.component
    去挂载组件
  - 创建 makeInstall 函数,返回一个可以 app.use的函数
  - 在 compnents 每个组件 index.ts去消费withInstall函数来给组件挂载 install 方法
  - 统一在compnents/index 导出组件
  - core 收集所有包并导出一个 installer 函数
  - 外部比如 play 就可以 app.use调用这个 installer 函数来调用每个组件的 install
    方法注册组件
  - app.use(installer) -> 找到core 里的 makeInstall -> 调用
    makeInstall(components) -> app.use(component) -> component.install -> 注册挂
    在组件

## 初始化 vitepress

- npx vitepress init

## 引入包类型问题

- 每个自包要配置出口文件 main:index.ts
- 要告诉 tsconfig type：index.ts
- tsconfig 里面要配置每个子包的路径

## monorepo 优点

- 做着做着突然凌乱了
- 思考了下 为啥要用 monorepo
  - 其实主要是可以按需导入
  - 比如 vue3 你可以单独导入运行时依赖；而不用导入全部
  - 其他的就是流程化 统一化 规范化 统一部署等等了

## 梳理一下目前的流程

- pnpm init -> pnpm.workspace.yaml -> 创建子包目录并且初始化 pnpm init
- 配置 Eslint Prettier husky git-cz commitmsg(自定义提交信息) cspell(后续)
  stylelint(后续)
- 搭建 play 环境 -> 实现 install 方法 -> core,components,util流程导入 -> play 环
  境 use@xy-ui -> play dev 成功
- 完成 vitepress 初始化

## commitlint

- cz-git/commitizen 生成提交信息（体验好）
- @commitlint/cli 用 @commitlint/config-conventional 校验提交信息（保证规范）
  (extends: ['@commitlint/config-conventional'])
- 只要提交信息不合格，@commitlint/cli 就会报错阻止提交

## 测试

- 是用 vitest 配合 @vue/test-utils
- 注意对应版本
- TDD 测试驱动开发
  - 先写测试，再写实现，最后重构，用自动化测试保障组件和逻辑的正确性
- 测使用例可以用 ai 来完编写
- 核心函数
  - it/test 定义一个具体的测试用例
  - describe 提供测试的结构和分组
  - expect 用来验证测试结果是否符合预期
- @vue/test-utils
  - mount挂载组件
  - wrapper 是 mount 返回的对象，它包装了 Vue 组件实例，提供了很多测试方法
    - .props .classes .emitted等等

```TypeScript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
  it('should render with correct props', () => {
    // mount 挂载组件
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        size: 'large',
        disabled: true
      },
      slots: {
        default: 'Click me'
      }
    })

    // 使用 wrapper 进行测试
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.props('type')).toBe('primary')
    expect(wrapper.classes()).toContain('xy-button--primary')
    expect(wrapper.classes()).toContain('xy-button--large')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('should handle click events', async () => {
    const wrapper = mount(Button)

    // 触发点击事件
    await wrapper.trigger('click')

    // 检查事件是否被触发
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('should update when props change', async () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' }
    })

    // 初始状态
    expect(wrapper.classes()).toContain('xy-button--primary')

    // 更新 props
    await wrapper.setProps({ type: 'success' })

    // 检查更新后的状态
    expect(wrapper.classes()).toContain('xy-button--success')
    expect(wrapper.classes()).not.toContain('xy-button--primary')
  })
})
```

## 需求分析 提示词

- 身份定位，前提条件，输出限定
- 采用"三板斧"的方式编写提示词，将生成好的需求文档当做前提条件给AI 辅助生成测试
  用例

## 色彩体系

- theme 下统一配置 css 变量方便主题切换
- 采用 scss 预处理器 增强 css 变量函数循环等

## storybook

- pnpm dlx storybook@latest init
- 导入组件,默认导出 meta
- 在导出示例(Primary Default)
- within 作用域查询
  - 用于在特定的 DOM 元素内查找其他元素
- canvas
  - Storybook 渲染组件的容器元素
  - canvasElement 是 Storybook 渲染组件的根元素
- play
  - 交互测试
- @storybook/test是基于 vitest 的,里面用到的方法断言也就都是 vitest 的
  - https://cn.vitest.dev/api/expect.html#tohavebeencalled

```typescript
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { XyButton } from '@xy-ui/core'
import { fn, within, userEvent, expect } from '@storybook/test'
const meta = {
  component: XyButton,
  title: 'Example/XyButton',
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'default', 'large'],
    },
    plain: {
      control: {
        type: 'boolean',
      },
    },
    icon: {
      control: { type: 'text' },
    },
    loading: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    args: { onClick: fn() },
  },
} satisfies Meta<typeof XyButton>
type Story = StoryObj<typeof meta>
const Template = (args: any) => ({
  components: { XyButton },
  setup() {
    return { args }
  },
  template: `<div style="padding: 20px">
<XyButton v-bind="args">${args.content || 'Button'}</XyButton>
</div>`,
})

export const Primary: Story = Template.bind({})
Primary.args = { content: 'cs', type: 'primary' } as any
// export const Default: Story = Template.bind({})
export const Default: Story & { args: { content: string } } = {
  argTypes: {
    content: {
      control: { type: 'text' },
    },
  },
  args: {
    type: 'default',
    content: 'Button',
    onClick: fn(),
  },
  render: (args) => ({
    components: { XyButton },
    setup() {
      return { args }
    },
    template: `<xy-button @click="handleClick" v-bind="args">{{args.content}}</xy-button>`,
  }),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement)
    await step('click button', async () => {
      await userEvent.tripleClick(canvas.getByRole('button'))
    })

    await expect(args.onClick).toHaveBeenCalled()
  },
}
export default meta
```

-

## Icon

- 使用Font Awesome 图标库
  - pnpm add @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons
    @fortawesome/vue-fontawesome
  - library.add(fas)
    - library是 Font Awesome 的核心库对象
    - 用来管理所有注册的图标
    - fas指的是实体图标库 还有 far 空心 fab 品牌 fal 细线 fad 双色
  - 设置 icon:text
  - https://docs.fontawesome.com/

## inheritAttrs: false

- 不继承父组件属性到跟组件
- 配合 v-bind=$attrs 自定义加到需要的标签上

## ButtonGroup

- size 等属性可以 provide/inject

## BEM 规范

## 项目打包

- vite
- rollup
- Turbopack

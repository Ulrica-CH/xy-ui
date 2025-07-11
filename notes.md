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

- 是用 vitest 配合 @vitejs/plugin-vue
- 注意对应版本
- TDD 测试驱动开发
  - 先写测试，再写实现，最后重构，用自动化测试保障组件和逻辑的正确性
- 测使用例可以用 ai 来完编写

## 需求分析 提示词

- 身份定位，前提条件，输出限定
- 采用"三板斧"的方式编写提示词，将生成好的需求文档当做前提条件给AI 辅助生成测试
  用例

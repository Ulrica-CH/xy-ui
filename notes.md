# 边写边记录

## pnpm install @xy-ui/components -w 问题

- 这样回去远程仓库找
- 现在主包 package.json 写 "@xy-ui/components": "workspace:\*",,在 pnpm i

## 命令行创建写入文件

- echo -e 'packages:\n' - "packages/\*" > pnpm-workspace.yaml
- 每个子包可以用 shell 脚本 pnpm init

## 创建组件 play 环境

- pnpm create vite play --template vue-ts

## 组件注册流程

- utils
  - 创建 withInstall 函数,以便 app.use注册组件

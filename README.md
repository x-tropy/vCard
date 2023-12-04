# 开发笔记

## Blocklet Server

### 安装

文档：https://developer.blocklet.io/docs/install-blocklet-cli

不支持用 `bun` 安装，会导致 sqlite3 相关的报错。

### 新建

`blocklet server init`，本地开发时可以加个选项 `--mode=debug`

### 启动

`blocklet server start`

Blocklet 本地开发环境依赖于 Blocklet server。

### 关闭

`blocklet server stop`

## Blocklet

### 新建

`blocklet create` 选择模版新建一个 Blocklet App。

`pnpm i` 安装初始依赖。

### 开发

`blocklet dev` 启动本地热加载开发环境。

### 打包

`pnpm bundle`

打包后产生两个文件夹：

- `.blocklet/bundle`：用于部署
- `.blocklet/release`：用于发布到应用市场

### 部署

1. 在 Blocklet Server 的控制台新建一个 Blocklet App
2. 记下 Blocklet App 的 DID 地址，填入 `package.json` 的 `app-id` 字段
3. `pnpm deploy` 进行部署

注意：Blocklet 是一个组件，Blocklet Application 才是独立的完整应用，详见[文档](https://developer.blocklet.io/docs/zh/885b49e7-8ea8-4877-997e-c163d1c5d669)。

## 初始配置

1. 增加 `jsconfig.json` 配置文件，方便 `import` 时引用根目录
2. 配置 TailwindCSS，详见[文档](https://tailwindcss.com/docs/guides/nextjs)
3. 更新 Next.js 至最新版 `pnpm add next@latest react@latest react-dom@latest`
4. 删除 `pages` 文件夹，新建 `app` 文件夹，以及 `components` 文件夹

## 其他

### 文件组织

- public/ - static files
  - favicon.ico - favicon
- screenshots/ - Screenshots
- api/ - Api side code
  - hooks/ - blocklet lifecycle hooks
  - libs/ - Api side libraries
  - middlewares/ - Api side middlewares
  - routes/ - Api side routes
  - index.js - Api side entry point
- pages/ - next.js pages folder
- styles/ - next.js styles folder
- .env - Environment variables
- .env.local - Local environment variables
- .eslintrc.js - ESLint configuration
- .gitignore - Git ignore file
- .prettierrc - Prettier configuration
- blocklet.md - Blocklet README
- blocklet.yml - Blocklet configuration
- LICENSE - License file
- logo.png - Blocklet logo file
- Makefile - Makefile
- next.config.js - next.js config file
- package.json - Npm package file
- README.md - A guide for this blocklet
- version - Version file

### 部署

部署到远程 Blocklet Server：

```shell
blocklet deploy .blocklet/bundle --endpoint {your blocklet server url} --access-key {blocklet server access key} --access-secret {blocklet server access secret}
```

### 文档

- Full specification of `blocklet.yml`: [https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md](https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md)
- Full document of Blocklet Server & blocklet development: [https://developer.blocklet.io/docs/en](https://developer.blocklet.io/docs/en)

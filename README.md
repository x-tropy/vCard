![vcard logo](./public/logo_vcard.png)

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

1. 增加 `jsconfig.json` 配置文件，方便 `import` 时引用根目录。详见[文档](https://nextjs.org/docs/app/building-your-application/configuring/absolute-imports-and-module-aliases)
2. 配置 TailwindCSS，详见[文档](https://tailwindcss.com/docs/guides/nextjs)
3. 更新 Next.js 至最新版 `pnpm add next@latest react@latest react-dom@latest`
4. 删除 `pages` 文件夹，新建 `app` 文件夹，以及 `components` 文件夹

## 场景构思（模拟）

### 一句话产品定位

vCard 是一个简洁的在线名片，用户可以维护一个专属于自己的 profile，用它来方便别人了解自己、联系自己。

slogan: Use vCard to enhance your online presence

### 内容设计

根据使用场景，vCard 可能包含以下几部分内容：

- 名字：名字可以是真名或昵称，系统不作限制。需要支持 emoji。
- 头像：为了方便编辑，可以留存历史上传的照片。需要支持随时调整（尺寸、裁切位置）、或更新头像。
- 简介：纯文本框。需要支持 emoji；如时间允许可以考虑支持 markdown。由于简介比较长，可以引入 AI 为用户检查语法错、帮助文案构思、补充内容等。
- 地址：当前所在位置（国家）。
- 生日（待定）
- 工作状态：远程办公 / 现场办公 / 正在看新机会
- 联系方式：手机和邮箱。可以勾选控制是否对大众可见。提交前需要通过验证。手机前缀为国家电话编码，跨国通话、或发送验证短信时会用到。
- 社交帐户链接：支持几个流行社交网络平台，例如：LinkedIn, GitHub, Instagram, Twitter。

### 数据库设计

命名约定：表名用复数，列名用下划线相连。当引用其他表的 ID 时，使用单数的表名，例如：avatar_id，profile_id

表一：countries

- id 主键
- name 国家名 TEXT
- country_calling_code 国家电话编码 TEXT

注意：存在两个国家用同一编码的情况，例如：加拿大和美国，都是 (+1)。

表二：avatars

- id 主键
- profile_id 头像所属 profile INTEGER
- avatar 图片 BLOB

表三：profiles

- id 主键
- name 展示名 TEXT
- user_id 用户唯一 ID TEXT
- about 简介 TEXT
- birth_date 生日 TEXT
- location_country 所在地 TEXT
- working_status 工作状态 TEXT
- phone 手机号 TEXT
- country_calling_code 国家电话编码 TEXT（号码归属地未必与所在地相同）
- phone_is_public 手机号公开与否 INTEGER
- email 邮箱 TEXT
- email_is_public 邮箱公开与否 INTEGER
- linkedin_user_id TEXT
- github_user_id TEXT
- twitter_user_id TEXT
- instagram_user_id TEXT
- avatar_id 头像 ID BLOB（当前在用头像的指针）

思考：头像图片并不大，在前端做了压缩和文件大小检验的情况下，直接用数据库存储不会带来性能问题，反而能和其他数据一并发给前端，减少网络延迟。

注意：user_id 会用于生成可分享的链接，必须是唯一的，但是也允许修改（不可过于频繁）。

### 数据格式细节

手机号由两部分做成，国家电话编码最多 3 位，手机号总共最多 15 位（含国家电话编码）

> The specification divides the digit string into a country code of one to three digits, and the subscriber telephone number of a maximum of twelve digits.

https://en.m.wikipedia.org/wiki/E.164
https://en.m.wikipedia.org/wiki/List_of_country_calling_codes

记录「公开与否」的这类 flag 值本应用 Bool 记录，但是 Cloudflare Worker D1 不支持，改用数字 0 或 1 替代（1 代表公开）。

社交帐户只记录用户 id，在前端拼成完整的 URL。

生日、所在地、工作状态等字段用 TEXT 保存，后端不作强校验，前端校验格式和允许的值范围即可。

## Cloudflare Worker

`pnpm create cloudflare@latest` 新建一个 Cloudflare Worker，用于负责与数据库的交互，亦即提供 data API。

- `/api/profile/:user_id`：取出 profile 所有字段，包括头像。
- `/api/avatar/:user_id`：取出单个头像。
- `/api/avatars/:user_id`：取出最近使用的头像（最多 5 个）
- `/api/countries`：取出所有国家的信息。
- `/api/check/user/:user_id`：检查某个 User ID 是否已经被占用了，占用则不能使用该 ID。

### 数据库 Binding

于 `wrangler.toml` 中增加绑定：

```
[[d1_databases]]
binding = "DB"
database_name = "vcard"
database_id = "d8a159bd-5b28-4171-81d8-8799a069abab"
```

### Schema 文件

```
drop table if exists "profiles";

create table "profiles" (
  "id" integer primary key autoincrement,
  "name" text not null,
  "user_id" text not null,
  "created_at" datetime default current_timestamp,
  "updated_at" datetime default current_timestamp
);

insert into "profiles" ("name", "user_id") values ('Super Pro', 'demo');
```

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

# wutz.dev

wutz.dev 个人主页。纯项目导航单页：把「教程」和「工具」两组项目列出来，各自带一句定位、一段说明和标签。

## 技术栈

与 netpath / storpath / storplan 保持一致：

- **TanStack Start** — 全栈 React 框架
- **TanStack Router** — 类型安全的文件路由
- **Tailwind CSS 4** — 样式（brand 色 token 定义在 `src/styles.css`）
- **TypeScript** — 类型安全

## 快速开始

```bash
bun install
bun run dev        # http://localhost:3005
bun run build
bun run typecheck
```

## 项目结构

```
wutz.dev/
├── public/
│   ├── logo.svg           # 本站 favicon
│   └── logos/             # 各项目 logo，见下方「logo 从哪来」
├── src/
│   ├── lib/
│   │   └── projects.ts    # 站点清单（唯一需要维护的内容文件）
│   ├── routes/
│   │   ├── __root.tsx     # 根布局：head/meta、页面容器、页脚
│   │   └── index.tsx      # 首页：头部 + 教程/工具两组卡片
│   ├── router.tsx
│   └── styles.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── wrangler.toml
```

## 增删项目

只改 `src/lib/projects.ts`：往 `paths`、`builds` 或 `tools` 数组里加一条 `Project`。

- `paths` — 按岗位铺的成长路线（netpath / storpath / kubepath）
- `builds` — 跟着从零造一个系统（storforge / rlforge / agentpath）
- `tools` — 在线小工具和仓库

`tutorials` 是 `paths + builds` 的合集，只给首屏统计用，不用手动维护。

```ts
{
  name: 'Foo',              // 卡片标题
  tagline: '一句话定位',      // 标题下方的小字
  href: 'https://foo.wutz.dev/',
  label: 'foo.wutz.dev',    // 卡片底部的域名/仓库
  logo: '/logos/foo.svg',   // 顺手把该站的 logo.svg 复制到 public/logos/
  summary: '一句话摘要，细节留给站点自己讲。',
  lectures: 42,             // 教程才有；首屏统计按它加总
}
```

## logo 从哪来

`public/logos/*.svg` 是各站点自己 `public/logo.svg`（password 是仓库根目录的
`logo.svg`）的副本，本站自带一份，避免首屏要等 9 个跨站请求。**改了那边记得同步过来**：

```bash
for s in netpath storpath kubepath storforge rlforge agentpath storplan; do
  cp ~/Projects/wutz/$s/public/logo.svg public/logos/$s.svg
done
cp ~/Projects/wutz/password/logo.svg public/logos/password.svg
```

⚠️ `password.svg` 是唯一一个**不能直接覆盖**的：它是纯 ink 墨黑，在本站暗色模式的
`#0a0a0a` 卡片上会糊掉，所以本站这份在 SVG 内部加了一段 `<style>` 做极性翻转
（它当 `<img>` 用，外部 CSS 够不着）。同步时记得把那段 `<style>` 和 `class="shield"` 补回去。

`mmapi` 是纯仓库、没有站点，它的 logo 只存在于本项目。

各站 logo 统一是「品牌色圆角方块 + 白色几何字形」的 32×32 SVG，配色取自各站
`styles.css` 里 `--color-brand-600` 的实际 hex（storplan 没有 brand token，取站内用的
`blue-600`）。password 用的是它自己原有的盾牌图标，是唯一一个透明底、不带色块的。

## 部署

Cloudflare Workers。Worker 名为 `wutz-dev`，自定义域 `wutz.dev` 已在 wrangler.toml 的
`routes` 里声明（`custom_domain = true`），部署时自动绑定。

本地手动部署：

```bash
bun run deploy           # 构建 + wrangler deploy，直接上生产
bun run deploy:preview   # 构建 + wrangler versions upload，只出预览地址，不动生产流量
```

### Workers Builds（Git 连接的自动构建）

面板里 Build command 留空也能通：非生产分支默认的 `npx wrangler versions upload`
在新克隆的仓库里可以直接跑。原理是 wrangler 配置拆成了两份：

- **wrangler.toml（根）** — CI 引导用的部署配置。`main` 指向构建产物
  `dist/server/index.js`，`[build]` 钩子先跑 `bun run build`（wrangler 的执行顺序是
  先跑 custom build、再解析 `main`）。新克隆的仓库里没有重定向文件时，wrangler
  回落到它，恰好就是「构建 + 上传产物」。
- **wrangler.vite.toml** — vite（`@cloudflare/vite-plugin`，由 vite.config.ts 的
  `configPath` 指向）用的入口配置，`main = "@tanstack/react-start/server-entry"`
  是给 vite 用的入口标记。构建会据此产出真正的部署配置
  `dist/server/wrangler.json`，并写 `.wrangler/deploy/config.json` 把后续的
  wrangler 调用重定向过去——所以本地 `bun run deploy` 走的仍是生成配置。

两份配置共享的字段（name / compatibility / routes / preview_urls / observability）
改动时要同步；根配置里 `main` / `no_bundle` / `rules` / assets 目录照抄
`dist/server/wrangler.json`，vite 或 TanStack Start 大版本升级后要对一下有没有漂移。

历史坑（2026-08 已修复）：以前根配置的 `main` 就是 vite 的入口标记，新克隆仓库里
不先构建直接 `wrangler versions upload` 会报
`The entry-point file at "@tanstack/react-start/server-entry" was not found`，
只能靠面板把 Build command 配成 `bun run build` 兜底。

当时「[build] 钩子也不行」的结论只对「`main` 指向不存在的模块说明符」成立——
钩子其实先于 `main` 解析执行，报错原文
`The expected output file at ... was not found after running custom build` 就是证据。
把 `main` 改指构建产物后，钩子方案即成立，这也是现在拆两份配置的由来。

预览地址由两份配置里的 `preview_urls = true` 打开（该开关默认 `false`），
`versions upload` 每上传一个版本会给出一条
`<version>-wutz-dev.<subdomain>.workers.dev`。

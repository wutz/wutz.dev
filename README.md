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

只改 `src/lib/projects.ts`：往 `tutorials` 或 `tools` 数组里加一条 `Project`。

```ts
{
  name: 'Foo',              // 卡片标题
  tagline: '一句话定位',      // 标题下方的小字
  href: 'https://foo.wutz.dev/',
  label: 'foo.wutz.dev',    // 卡片底部的域名/仓库
  logo: '/logos/foo.svg',   // 顺手把该站的 logo.svg 复制到 public/logos/
  summary: '这个项目覆盖什么。',
  tags: ['标签1', '标签2'],
}
```

## logo 从哪来

`public/logos/*.svg` 是各站点自己 `public/logo.svg`（password 是仓库根目录的
`logo.svg`）的副本，本站自带一份，避免首屏要等 7 个跨站请求。**改了那边记得同步过来**：

```bash
for s in netpath storpath kubepath rlforge storplan; do
  cp ~/Projects/wutz/$s/public/logo.svg public/logos/$s.svg
done
cp ~/Projects/wutz/password/logo.svg public/logos/password.svg
```

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

**必须在 Cloudflare 面板 → Workers & Pages → wutz-dev → Settings → Builds 里配置**：

| 字段 | 值 |
|---|---|
| Build command | `bun run build` |
| Deploy command | `npx wrangler versions upload`（或 `bun run deploy:preview`，二者等价） |

**Build command 不能留空。** 本项目的部署入口是 vite 构建产物里生成的
`dist/server/wrangler.json`（`@cloudflare/vite-plugin` 会写一份
`.wrangler/deploy/config.json` 把 wrangler 重定向过去）。仓库根目录 wrangler.toml 里的
`main = "@tanstack/react-start/server-entry"` 只是给 vite 用的入口标记，不是能直接部署的文件。
所以在新克隆的仓库里，不先跑构建就执行 `wrangler versions upload`，wrangler 会回落到根配置并报：

```
✘ [ERROR] The entry-point file at "@tanstack/react-start/server-entry" was not found.
```

顺带记一笔：这个坑没法在仓库里绕开。wrangler.toml 的 `[build]` 钩子也不行——wrangler 先加载
配置、再跑钩子，等钩子里的构建产出重定向文件时，`main` 已经解析失败了。

预览地址由 wrangler.toml 的 `preview_urls = true` 打开（该开关默认 `false`），
`versions upload` 每上传一个版本会给出一条
`<version>-wutz-dev.<subdomain>.workers.dev`。

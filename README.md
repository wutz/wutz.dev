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
  name: 'Foo',              // 卡片标题，首字母会用作左侧色块
  tagline: '一句话定位',      // 标题下方的小字
  href: 'https://foo.wutz.dev/',
  label: 'foo.wutz.dev',    // 卡片底部的域名/仓库
  summary: '这个项目覆盖什么。',
  tags: ['标签1', '标签2'],
}
```

两组的色块颜色不同（教程用 brand 靛色，工具用深灰），由 `index.tsx` 里 `Section` 的 `accent` 决定，无需逐条配置。

## 部署

Cloudflare Workers，通过 `wrangler` CLI 手动部署：

```bash
bun run deploy
```

Worker 名为 `wutz-dev`，域名 `wutz.dev` 需要在 Cloudflare 侧绑定自定义域（wrangler.toml 里未写 routes）。

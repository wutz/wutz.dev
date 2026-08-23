import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'

const DESCRIPTION =
  'wutz 的个人主页：系统基础设施方向的教程与小工具，涵盖网络、存储运维与研发、Kubernetes 与 LLM 强化学习。'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: 'wutz.dev — 教程与工具' },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: 'wutz.dev — 教程与工具' },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://wutz.dev/' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' },
      { rel: 'canonical', href: 'https://wutz.dev/' },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <html lang="zh-CN">
      <head>
        <HeadContent />
        {/*
         * 地址栏/状态栏跟着页面底色走，暗色下才不会在页面顶上留一条白边。
         * 这两条不能走 route 的 meta 数组：那边按 name 去重，同名的会被丢掉一条。
         */}
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen bg-canvas-soft font-sans text-ink antialiased">
        {/* 大屏放宽到 6xl 并让卡片走双列,窄屏仍是 3xl 单列的阅读宽度 */}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:max-w-6xl lg:px-8 lg:py-20">
          <main>
            <Outlet />
          </main>

          <footer className="mt-14 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-hairline pt-6 text-xs text-mute sm:mt-20">
            <p>
              © {new Date().getFullYear()} wutz.dev · 站点与工具的源码都在{' '}
              <a
                href="https://github.com/wutz"
                target="_blank"
                rel="noreferrer"
                className="text-body underline underline-offset-2 transition hover:text-link"
              >
                GitHub
              </a>
              。
            </p>
            {/* 教程站的共性说明放页脚，卡片里就不用每张重复一遍 */}
            <p className="font-mono text-[11px]">学习进度保存在浏览器本地</p>
          </footer>
        </div>

        <Scripts />
      </body>
    </html>
  )
}

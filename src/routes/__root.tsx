import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import appCss from '../styles.css?url'

const DESCRIPTION =
  'wutz 的个人主页：系统基础设施方向的教程与小工具，涵盖网络、存储、Kubernetes 与 LLM 强化学习。'

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
      </head>
      <body className="min-h-screen bg-canvas-soft font-sans text-ink antialiased">
        {/* 大屏放宽到 6xl 并让卡片走双列,窄屏仍是 3xl 单列的阅读宽度 */}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 lg:max-w-6xl lg:px-8 lg:py-20">
          <Outlet />

          <footer className="mt-14 border-t border-hairline pt-6 text-xs text-mute sm:mt-20">
            <p>
              wutz.dev · 站点与工具的源码都在{' '}
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
          </footer>
        </div>

        <Scripts />
      </body>
    </html>
  )
}

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
      { name: 'theme-color', content: '#ffffff' },
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
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased">
        {/* 首屏(页头 + 教程)走单列阅读宽度,大屏放宽到 6xl 让卡片走双列 */}
        <Outlet />

        {/* 页脚与工具区同为米白,只靠一条发丝线分界(DESIGN.md footer 规格) */}
        <footer className="border-t border-black/10 bg-parchment">
          <div className="mx-auto max-w-3xl px-5 py-8 text-xs leading-relaxed text-ink-mute sm:px-8 lg:max-w-6xl lg:px-10">
            <p>
              wutz.dev · 站点与工具的源码都在{' '}
              <a
                href="https://github.com/wutz"
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 underline-offset-2 transition hover:underline"
              >
                GitHub
              </a>
              。
            </p>
          </div>
        </footer>

        <Scripts />
      </body>
    </html>
  )
}

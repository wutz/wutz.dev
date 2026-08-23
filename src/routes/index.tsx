import { createFileRoute } from '@tanstack/react-router'

import { sections, stats } from '#/lib/projects'
import type { Project } from '#/lib/projects'

export const Route = createFileRoute('/')({ component: Home })

function GitHubMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.07-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A7.995 7.995 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <li>
      {/*
       * h-full + flex-col：大屏双列下同一行的两张卡摘要行数不同，
       * 底部那行域名靠 mt-auto 压到卡片底部，横向才对得齐。
       * 卡片 chrome 按 DESIGN.md：白卡 + hairline 描边 + 小偏移堆叠阴影，
       * hover 升到 Level 4，绝不加单个大投影。
       */}
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full gap-4 rounded-lg border border-hairline bg-canvas p-5 shadow-card transition duration-200 hover:border-hairline-strong hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link sm:p-6"
      >
        <img
          src={project.logo}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0"
          decoding="async"
        />

        <div className="flex min-w-0 flex-1 flex-col">
          {/* 展示字重的上限是 600，再粗就脱离这套设计的语气 */}
          <h3 className="text-base font-semibold tracking-tight transition group-hover:text-link">
            {project.name}
          </h3>
          <p className="mt-1 text-xs text-mute">{project.tagline}</p>

          {/* 卡片内部是紧的、卡片之间是松的——DESIGN.md 的节奏就是这个方向 */}
          <p className="mt-2 text-sm leading-relaxed text-body">{project.summary}</p>

          {/* 域名走 mono —— 技术层的东西都用等宽字体说话；讲数放同一行右侧 */}
          <div className="mt-auto flex items-baseline justify-between gap-3 pt-4 font-mono text-xs text-mute">
            <p className="truncate transition group-hover:text-link">{project.label}</p>
            {project.lectures ? <span className="shrink-0">{project.lectures} 讲</span> : null}
          </div>
        </div>
      </a>
    </li>
  )
}

function Section({ eyebrow, projects }: { eyebrow: string; projects: Project[] }) {
  return (
    <section className="mt-14 sm:mt-16">
      {/* section eyebrow 用 mono 大写——这套设计里唯一允许全大写的地方 */}
      <h2 className="font-mono text-xs uppercase text-mute">{eyebrow}</h2>

      <ul className="mt-4 grid gap-3 lg:grid-cols-2 lg:gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.href} project={project} />
        ))}
      </ul>
    </section>
  )
}

function Home() {
  return (
    <>
      <header className="relative">
        {/* 装饰见 styles.css 的 .hero-glow：渐变整体当一个对象用，只在 hero 尺度出现 */}
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute -top-28 left-1/2 h-80 w-[52rem] max-w-[120vw] -translate-x-1/2 rounded-full blur-3xl"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-4xl sm:tracking-[-0.04em] lg:text-5xl lg:tracking-[-0.05em]">
              wutz<span className="text-link">.dev</span>
            </h1>
            <p className="mt-3 text-sm text-body sm:text-base lg:text-lg">
              写一些系统基础设施方向的教程和小工具。
            </p>

            {/* 统计行走 mono，数字全部由 lib/projects 算出来，不手写 */}
            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-mute">
              <span>{stats.tracks} 条路线</span>
              <span aria-hidden="true" className="text-hairline-strong">
                ·
              </span>
              <span>{stats.lectures} 讲</span>
              <span aria-hidden="true" className="text-hairline-strong">
                ·
              </span>
              <span>{stats.tools} 个工具</span>
            </p>
          </div>

          <a
            href="https://github.com/wutz"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="shrink-0 rounded-full border border-hairline bg-canvas p-2 text-mute transition hover:border-hairline-strong hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link"
          >
            <GitHubMark />
          </a>
        </div>
      </header>

      {sections.map((section) => (
        <Section key={section.eyebrow} {...section} />
      ))}
    </>
  )
}

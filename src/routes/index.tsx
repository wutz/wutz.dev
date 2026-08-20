import { createFileRoute } from '@tanstack/react-router'

import { tools, tutorials } from '#/lib/projects'
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
       * h-full + flex-col：大屏双列下同一行的两张卡摘要长度不同，
       * 标签和域名靠 mt-auto 压到卡片底部，横向才对得齐。
       * 卡片本体不加阴影——全站唯一的投影只给 logo(见 styles.css)。
       */}
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group flex h-full gap-4 rounded-[18px] border border-hairline bg-canvas p-5 transition hover:border-brand-500/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:scale-[0.98] sm:p-6"
      >
        {/* 各站点 logo 按 DESIGN.md 的 product render 处理:搁在表面上的产物才有投影 */}
        <img
          src={project.logo}
          alt=""
          width={44}
          height={44}
          className="mt-0.5 h-11 w-11 shrink-0 rounded-[10px] shadow-render"
          decoding="async"
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-[17px] font-semibold tracking-[-0.4px] transition group-hover:text-brand-600">
                {project.name}
              </h3>
              <p className="mt-0.5 text-sm text-ink-mute">{project.tagline}</p>
            </div>
            <span
              aria-hidden="true"
              className="inline-block shrink-0 text-sm text-ink-mute/60 transition group-hover:translate-x-0.5 group-hover:text-brand-600"
            >
              ↗
            </span>
          </div>

          <p className="mt-3 text-[15px] leading-[1.65] text-ink-soft">{project.summary}</p>

          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-parchment px-2.5 py-[3px] text-xs leading-none text-ink-mute"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-3 font-mono text-xs text-ink-mute">{project.label}</p>
        </div>
      </a>
    </li>
  )
}

function Section({
  title,
  projects,
  className = 'mt-14 sm:mt-16 lg:mt-20',
}: {
  title: string
  projects: Project[]
  className?: string
}) {
  return (
    <section className={className}>
      <div className="flex items-baseline gap-2.5">
        <h2 className="text-[21px] font-semibold tracking-[0.2px]">{title}</h2>
        <span className="text-sm text-ink-mute">{projects.length}</span>
      </div>

      <ul className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-6">
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
      <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:max-w-6xl lg:px-10">
        <header className="flex items-start justify-between gap-4 pt-14 sm:pt-16 lg:pt-24">
          <div className="min-w-0">
            {/* 大标题走 DESIGN.md 的 display 规格:600 字重 + 负字距 */}
            <h1 className="text-[36px] font-semibold leading-[1.1] tracking-[-0.4px] sm:text-[44px] lg:text-[52px]">
              wutz<span className="text-brand-600">.dev</span>
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-mute sm:text-xl">
              写一些系统基础设施方向的教程和小工具。
            </p>
          </div>

          <a
            href="https://github.com/wutz"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-mute transition hover:bg-parchment hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 active:scale-95"
          >
            <GitHubMark />
          </a>
        </header>

        <Section title="教程" projects={tutorials} />
      </div>

      {/*
       * 工具区整体换到米白底:DESIGN.md 的节奏做法——用表面色变化代替分隔线,
       * 与页脚的米白连成一片,页面收尾在同一个浅色区域里。
       */}
      <div className="mt-14 bg-parchment sm:mt-20">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16 lg:max-w-6xl lg:px-10 lg:py-20">
          <Section title="工具" projects={tools} className="" />
        </div>
      </div>
    </>
  )
}

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

function ProjectCard({ project, accent }: { project: Project; accent: 'brand' | 'neutral' }) {
  return (
    <li>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group block rounded-xl border border-gray-200 bg-white p-4 transition hover:border-brand-200 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:p-5"
      >
        <div className="flex items-start gap-3.5">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${
              accent === 'brand' ? 'bg-brand-600' : 'bg-gray-800'
            }`}
            aria-hidden="true"
          >
            {project.name.charAt(0).toUpperCase()}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-base font-bold tracking-tight transition group-hover:text-brand-700">
                  {project.name}
                </h3>
                <p className="mt-0.5 text-xs text-gray-400">{project.tagline}</p>
              </div>
              <span
                aria-hidden="true"
                className="inline-block shrink-0 text-sm text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500"
              >
                ↗
              </span>
            </div>

            <p className="mt-2.5 text-sm leading-relaxed text-gray-600">{project.summary}</p>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[11px] text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-3 font-mono text-[11px] text-gray-400">{project.label}</p>
          </div>
        </div>
      </a>
    </li>
  )
}

function Section({
  title,
  projects,
  accent,
}: {
  title: string
  projects: Project[]
  accent: 'brand' | 'neutral'
}) {
  return (
    <section className="mt-10 sm:mt-14">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xs font-semibold tracking-[0.18em] text-gray-400 uppercase">{title}</h2>
        <span className="text-xs text-gray-300">{projects.length}</span>
      </div>

      <ul className="mt-3.5 space-y-3">
        {projects.map((project) => (
          <ProjectCard key={project.href} project={project} accent={accent} />
        ))}
      </ul>
    </section>
  )
}

function Home() {
  return (
    <>
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            wutz<span className="text-brand-600">.dev</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            写一些系统基础设施方向的教程和小工具。
          </p>
        </div>

        <a
          href="https://github.com/wutz"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-white hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          <GitHubMark />
        </a>
      </header>

      <Section title="教程" projects={tutorials} accent="brand" />
      <Section title="工具" projects={tools} accent="neutral" />
    </>
  )
}

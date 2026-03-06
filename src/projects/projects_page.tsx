'use client'

import { useData } from '@/contexts/DataContext'

export default function Projects() {
  const { projects } = useData()

  return (
    <main className="bg-[#0a0e1a] min-h-screen">
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center px-6 py-24 bg-gradient-to-b from-[#0f1e35] to-[#0a0e1a]"
      >
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-16">

          {/* HEADER */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9]">
              Projects
            </p>
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">
              What I've Built
            </h2>
            <div className="w-16 h-0.5 bg-[#fbbf24] opacity-50" />
          </div>

          {/* GRID — empty state until data.json is populated */}
          {projects.length === 0 ? (
            <p className="font-mono text-sm text-[#4f9cf9]/40 uppercase tracking-widest">
              Coming soon...
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="flex flex-col gap-4 p-6 rounded-xl border border-[#1f2d45] bg-[#0a0e1a]/60 hover:border-[#4f9cf9]/40 transition-all duration-300"
                >
                  <h3 className="font-sans text-xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="font-mono text-sm text-[#94a3b8] leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded border text-[#4f9cf9] border-[#4f9cf9]/30 hover:border-[#4f9cf9] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  )
}

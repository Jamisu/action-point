'use client'

import { useData } from '@/contexts/DataContext'
import { Project } from '@/types/types'

export default function ProjectsPage() {
  const { projects } = useData()

  return (
    <main className="bg-[#0a0e1a] min-h-screen">
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-start px-6 pb-24 bg-gradient-to-b from-[#0f1e35] to-[#0a0e1a]"
        style={{ paddingTop: 'clamp(120px, 15vw, 220px)' }}
      >
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-16">

          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9]">Projects</p>
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">What I've Built</h2>
            <div className="w-16 h-0.5 bg-[#fbbf24] opacity-50" />
          </div>
          {
            projects.map((project, index) => (
              <div key={index}>
                <h3>{project.title}</h3>
                <p>{project.shortDesc}</p>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  )
}
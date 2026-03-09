'use client'

import { useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { Project } from '@/types/types'
import ProjectTile from '@/components/ui/ProjectTile'
import ProjectModal from '@/components/ui/ProjectModal'

export default function ProjectsPage() {
  const { projects } = useData()
  const [selected, setSelected] = useState<Project | null>(null)

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectTile
                key={project.title}
                project={project}
                index={i}
                onClick={() => setSelected(project)}
              />
            ))}
          </div>
          {selected && (
            <ProjectModal
              project={selected}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </section>
    </main>
  )
}
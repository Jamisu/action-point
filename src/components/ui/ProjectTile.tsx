import { Project } from '@/types/types'
import { useState } from 'react'
import { useIntersectionObserver } from '@/lib/useIntersectionObserver'

export default function ProjectTile({ project, index, onClick }: {
  project: Project
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>( { delay: index * 80 } )

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl border-2 border-[var(--c-surf)] bg-[var(--c-bg)]/60 overflow-hidden cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(24px) scale(0.97)',
        transition: isVisible
          ? 'opacity 0.5s ease, transform 0.25s ease, border-color 0.25s ease'
          : `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
        borderColor: hovered ? 'var(--c-blue)' : undefined,
        boxShadow: hovered ? '0 8px 32px rgba(79,156,249,0.15)' : undefined,
      }}
    >
      <div className="relative w-full bg-[var(--c-bg2)] overflow-hidden" style={{ height: '200px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${project.image})`,
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease, filter 0.4s ease',
            filter: hovered ? 'brightness(0.65)' : 'brightness(0.55) grayscale(1)'
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--c-blue)] bg-[var(--c-bg)]/70 px-2 py-1 rounded">
            {project.date}
          </span>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s ease' }}
        >
          <span className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-[var(--c-blue)] text-[var(--c-blue)] rounded bg-[var(--c-bg)]/80">
            Details
          </span>
        </div>
      </div>

      <div className="p-5 pl-8 flex flex-col gap-3">
        <h3 className="font-sans text-lg font-bold var(--c-heading) leading-tight">{project.title}</h3>
        <p className="font-mono text-sm text-[var(--c-muted)] leading-relaxed border-l-2 border-[var(--c-blue)]/30 pl-3">
          {project.shortDesc}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.stack.map(tag => (
            <span key={tag} className="font-mono text-xs uppercase tracking-widest px-2 py-0.5 rounded border border-[var(--c-blue)]/30 text-[var(--c-blue)]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
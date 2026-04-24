'use client'

import { useEffect } from 'react'
import { Project } from '@/types/types'

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-start justify-center p-6 overflow-y-auto"
      style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(10,14,26,0.85)', paddingTop: 'max(5px, env(safe-area-inset-top))' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl border-2 border-[var(--c-surf)] bg-[var(--c-bg)] overflow-hidden my-auto"
        style={{
          animation: 'modalIn 0.3s ease both',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative w-full bg-[var(--c-bg2)]">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full block"
            />
          ) : (
            <div className="h-48 bg-gradient-to-br from-[var(--c-bg2)] via-[#1a2d4a] to-[var(--c-bg)]" />
          )}
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 font-mono text-xs uppercase tracking-widest px-3 py-1.5 border border-[var(--c-yellow)]/60 text-[var(--c-yellow)] rounded hover:border-[var(--c-yellow)] hover:var(--c-heading) transition-colors bg-[var(--c-bg)]/70"
          >
            ✕ Close
          </button>

          <div className="absolute top-4 left-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--c-blue)] bg-[var(--c-bg)]/70 px-2 py-1 rounded">
              {project.date}
            </span>
          </div>

          <div className="absolute bottom-4 left-8">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-[var(--c-blue)] text-[var(--c-blue)] rounded bg-[var(--c-bg)]/80 hover:bg-[var(--c-blue)] hover:text-[var(--c-bg)] transition-colors duration-200"
              >
                Preview
              </a>
            ) : (
              <span className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-[var(--c-surf)] text-[var(--c-muted2)] rounded bg-[var(--c-bg)]/80 cursor-not-allowed">
                Preview not available
              </span>
            )}
          </div>
        </div>

        <div className="p-6 pl-10 flex flex-col gap-4">
          <h2 className="font-sans text-2xl font-bold var(--c-heading)">
            {project.title}
          </h2>

          <p className="font-mono text-sm text-[var(--c-muted)] leading-relaxed border-l-2 border-[var(--c-blue)]/30 pl-4">
            {project.fullDesc}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {project.stack.map(tag => (
              <span
                key={tag}
                className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded border border-[var(--c-blue)]/30 text-[var(--c-blue)] hover:border-[var(--c-blue)] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  )
}
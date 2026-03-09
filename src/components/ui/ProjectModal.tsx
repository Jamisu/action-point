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
      className="fixed inset-0 z-[9998] flex items-center justify-center p-6"
      style={{ backdropFilter: 'blur(4px)', backgroundColor: 'rgba(10,14,26,0.85)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl border-2 border-[#1f2d45] bg-[#0a0e1a] overflow-hidden"
        style={{
          animation: 'modalIn 0.3s ease both',
        }}
        onClick={e => e.stopPropagation()}
      >
        
        <div className="relative w-full bg-[#0f1e35]" style={{ height: '480px' }}>
          {project.image ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${project.image})`,
                filter: 'brightness(0.65)',
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f1e35] via-[#1a2d4a] to-[#0a0e1a]" />
          )}

          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 font-mono text-xs uppercase tracking-widest px-3 py-1.5 border border-[#94a3b8]/40 text-[#94a3b8] rounded hover:border-[#94a3b8] hover:text-white transition-colors bg-[#0a0e1a]/70"
          >
            ✕ Close
          </button>

          <div className="absolute top-4 left-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9] bg-[#0a0e1a]/70 px-2 py-1 rounded">
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
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-[#4f9cf9] text-[#4f9cf9] rounded bg-[#0a0e1a]/80 hover:bg-[#4f9cf9] hover:text-[#0a0e1a] transition-colors duration-200"
              >
                Preview
              </a>
            ) : (
              <span className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-[#1f2d45] text-[#64748b] rounded bg-[#0a0e1a]/80 cursor-not-allowed">
                Preview not available
              </span>
            )}
          </div>
        </div>

        <div className="p-6 pl-10 flex flex-col gap-4">
          <h2 className="font-sans text-2xl font-bold text-white">
            {project.title}
          </h2>

          <p className="font-mono text-sm text-[#94a3b8] leading-relaxed border-l-2 border-[#4f9cf9]/30 pl-4">
            {project.fullDesc}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {project.stack.map(tag => (
              <span
                key={tag}
                className="font-mono text-xs uppercase tracking-widest px-3 py-1 rounded border border-[#4f9cf9]/30 text-[#4f9cf9] hover:border-[#4f9cf9] transition-colors"
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
import { Project } from '@/types/types'
import { useEffect, useRef, useState } from 'react'

export default function ProjectTile({ project, index, onClick }: {
  project: Project
  index: number
  onClick: () => void
}) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), index * 80)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl border-2 border-[#1f2d45] bg-[#0a0e1a]/60 overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(24px) scale(0.97)',
        transition: visible
          ? 'opacity 0.5s ease, transform 0.25s ease, border-color 0.25s ease'
          : `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`,
        borderColor: hovered ? '#4f9cf9' : undefined,
        boxShadow: hovered ? '0 8px 32px rgba(79,156,249,0.15)' : undefined,
      }}
    >
      <div className="relative w-full bg-[#0f1e35] overflow-hidden" style={{ height: '200px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${project.image})`,
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease',
            filter: 'brightness(0.65)',
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9] bg-[#0a0e1a]/70 px-2 py-1 rounded">
            {project.date}
          </span>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.2s ease' }}
        >
          <span className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-[#4f9cf9] text-[#4f9cf9] rounded bg-[#0a0e1a]/80">
            Details
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-sans text-lg font-bold text-white leading-tight">{project.title}</h3>
        <p className="font-mono text-sm text-[#94a3b8] leading-relaxed border-l-2 border-[#4f9cf9]/30 pl-3">
          {project.shortDesc}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.stack.map(tag => (
            <span key={tag} className="font-mono text-xs uppercase tracking-widest px-2 py-0.5 rounded border border-[#1f2d45] text-[#64748b]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
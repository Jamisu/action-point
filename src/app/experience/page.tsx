'use client'

import { useEffect, useRef, useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { Job } from '@/types/types'

function JobEntry({
  job,
  index,
  isLegacyFirst,
}: {
  job: Job
  index: number
  isLegacyFirst?: boolean
}) {
  const [visible, setVisible] = useState(false)
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
    <>
      {isLegacyFirst && (
        <div className="flex items-center gap-4 my-10">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--c-muted)]"> Flash era</span>
          <div className="flex-1 h-px bg-[var(--c-surf)]" />
        </div>
      )}

      <div
        ref={ref}
        style={{
          opacity: visible ? (job.legacy ? 0.75 : 1) : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-16px)',
          transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s`,
        }}
        className="relative pl-10 pb-14 group"
      >
        <div
          className={`
          absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300
          ${job.legacy
            ? 'bg-[var(--c-bg)] border-[var(--c-muted)] group-hover:border-[var(--c-text)]'
            : 'bg-[var(--c-blue)] border-[var(--c-blue)] shadow-[0_0_10px_var(--c-blue)66] group-hover:shadow-[0_0_16px_var(--c-blue)aa]'
          }
        `}
        />

        <p
          className={`font-mono text-sm uppercase tracking-widest mb-2 ${
            job.legacy ? 'text-[var(--c-muted)]' : 'text-[var(--c-blue)]'
          }`}
        >
          {job.date}
        </p>

        <p className="font-sans text-2xl font-bold text-white mb-1">{job.company}</p>

        <p
          className={`font-mono text-sm uppercase tracking-widest mb-5 ${
            job.legacy ? 'text-[var(--c-muted)]' : 'text-[var(--c-yellow)]'
          }`}
        >
          {job.role}
        </p>

        <p
          className={`font-mono text-base leading-relaxed mb-5 max-w-2xl border-l-2 pl-4 ${
            job.legacy
              ? 'text-[var(--c-muted)] border-[var(--c-muted)]/30'
              : 'text-[var(--c-text)] border-[var(--c-blue)]/30'
          }`}
        >
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className={`font-mono text-xs uppercase tracking-widest px-3 py-1 rounded border ${
                job.legacy
                  ? 'text-[var(--c-muted)] border-[var(--c-muted)]/30 hover:border-[var(--c-muted)] transition-colors'
                  : 'text-[var(--c-blue)] border-[var(--c-blue)]/30 hover:border-[var(--c-blue)] transition-colors'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default function ExperiencePage() {
  const { jobs } = useData()
  const firstLegacyIndex = jobs.findIndex((j) => j.legacy)

  return (

      <div
        id="experience"
        className="min-h-screen flex flex-col justify-center px-6 py-24"
      >
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-4 mb-20">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--c-blue)]">Experience</p>
            <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">Where I've Been</h2>
            <div className="w-16 h-0.5 bg-[var(--c-blue)] opacity-50" />
          </div>

          <div className="relative">
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-[var(--c-blue)] via-[var(--c-blue)]/40 to-[var(--c-bg2)]" />

            {jobs.map((job, i) => (
              <JobEntry key={i} job={job} index={i} isLegacyFirst={i === firstLegacyIndex} />
            ))}
          </div>
        </div>
      </div>

  )
}
'use client'

import { useEffect, useRef, useState } from 'react'
import { jobs, type Job } from '@/data/experience.data'

function JobEntry({ job, index, isLegacyFirst }: { job: Job; index: number; isLegacyFirst?: boolean }) {
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
          <span className="font-mono text-xs uppercase tracking-widest text-[#94a3b8]">⚰ Flash era</span>
          <div className="flex-1 h-px bg-[#1f2d45]" />
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
        {/* DOT */}
        <div className={`
          absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300
          ${job.legacy
            ? 'bg-[#0a0e1a] border-[#94a3b8] group-hover:border-[#cbd5e1]'
            : 'bg-[#4f9cf9] border-[#4f9cf9] shadow-[0_0_10px_#4f9cf966] group-hover:shadow-[0_0_16px_#4f9cf9aa]'
          }
        `} />

        {/* DATE */}
        <p className={`font-mono text-sm uppercase tracking-widest mb-2 ${
          job.legacy ? 'text-[#94a3b8]' : 'text-[#4f9cf9]'
        }`}>
          {job.date}
        </p>

        {/* COMPANY */}
        <p className="font-sans text-2xl font-bold text-white mb-1">
          {job.company}
        </p>

        {/* ROLE */}
        <p className={`font-mono text-sm uppercase tracking-widest mb-5 ${
          job.legacy ? 'text-[#94a3b8]' : 'text-[#fbbf24]'
        }`}>
          {job.role}
        </p>

        {/* DESCRIPTION */}
        <p className={`font-mono text-base leading-relaxed mb-5 max-w-2xl border-l-2 pl-4 ${
          job.legacy
            ? 'text-[#94a3b8] border-[#94a3b8]/30'
            : 'text-[#cbd5e1] border-[#4f9cf9]/30'
        }`}>
          {job.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2">
          {job.tags.map(tag => (
            <span
              key={tag}
              className={`font-mono text-xs uppercase tracking-widest px-3 py-1 rounded border ${
                job.legacy
                  ? 'text-[#94a3b8] border-[#94a3b8]/30 hover:border-[#94a3b8] transition-colors'
                  : 'text-[#4f9cf9] border-[#4f9cf9]/30 hover:border-[#4f9cf9] transition-colors'
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

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function Experience() {
  const firstLegacyIndex = jobs.findIndex(j => j.legacy)

  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-center px-6 py-24 bg-gradient-to-b from-[#0a0e1a] to-[#0f1e35]"
    >
      <div className="max-w-4xl mx-auto w-full">

        {/* HEADER */}
        <div className="flex flex-col gap-4 mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9]">
            Experience
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">
            Where I've Been
          </h2>
          <div className="w-16 h-0.5 bg-[#4f9cf9] opacity-50" />
        </div>

        {/* TIMELINE */}
        <div className="relative">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-[#4f9cf9] via-[#4f9cf9]/40 to-[#1f2d45]" />

          {jobs.map((job, i) => (
            <JobEntry
              key={i}
              job={job}
              index={i}
              isLegacyFirst={i === firstLegacyIndex}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

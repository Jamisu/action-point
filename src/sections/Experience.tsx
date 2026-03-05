'use client'

import { useEffect, useRef, useState } from 'react'

// ─── DATA ────────────────────────────────────────────────────────────────────

interface Job {
  date: string
  company: string
  role: string
  description: string
  tags: string[]
  legacy?: boolean
}

const jobs: Job[] = [
  {
    date: 'XI.2022 — XII.2023',
    company: 'Confidential · B2B Contract',
    role: 'Front-End Engineer',
    description: 'Developing Front-End microservices, refactoring code across multiple projects.',
    tags: ['React', 'TypeScript', 'MaterialUI', 'Docker'],
  },
  {
    date: 'III.2021 — VII.2022',
    company: 'Studio tańca NF',
    role: 'Front-End Developer',
    description: 'Client service, evidence management, web research, website maintenance, advertisement campaigns via Google Ads.',
    tags: ['React', 'Google Ads'],
  },
  {
    date: 'I.2020 — II.2021',
    company: 'Confidential',
    role: 'Software Engineer',
    description: 'Development of Consent (RODO) panel in Preact.js and TypeScript. Maintenance of Python backend microservices. Continuous integration of middleware advertisement service in Vanilla JS.',
    tags: ['Preact', 'TypeScript', 'Python', 'CI/CD', 'Vanilla JS'],
  },
  {
    date: 'X.2018 — XII.2019',
    company: 'Self-directed',
    role: 'Development & Study',
    description: 'Self-education and practice: Java and Python fundamentals. Support for a family business — site design, maintenance, advertisement campaigns.',
    tags: ['Java', 'Python'],
  },
  {
    date: 'IV.2016 — X.2018',
    company: 'Confidential',
    role: 'Developer',
    description: 'Video Player front-end, WebCKM Video CMS (React + Python), LivePanel live video service (Angular + Python). REST API development, VPAID JS interactive ad templates, HIVE data analysis, unit tests + CI.',
    tags: ['React', 'Angular', 'Python', 'REST', 'VPAID', 'HIVE'],
  },
  {
    date: 'I.2016 — IV.2016',
    company: 'Confidential · Contract',
    role: 'Senior Flash Developer',
    description: 'Integration of IMA SDK with company player. Refactoring and debugging the player. Integrating Flash layer with JavaScript. Attending Scrum meetings.',
    tags: ['Flash', 'ActionScript 3', 'JavaScript', 'Scrum'],
  },
  {
    date: 'VI.2014 — X.2015',
    company: 'Confidential',
    role: 'Senior Flash Developer',
    description: 'Game deployment and testing on iPad, Android, and Web. Contributing bug fixes in root client SDK. Managing and taking part in everyday groomings.',
    tags: ['Flash', 'ActionScript 3', 'Mobile'],
    legacy: true,
  },
  {
    date: 'III.2013 — IX.2013',
    company: 'Confidential',
    role: 'Senior Flash Developer',
    description: 'Development of online pre-paid games. Creating video trailers for the games.',
    tags: ['Flash', 'ActionScript 3', 'Video'],
    legacy: true,
  },
  {
    date: 'II.2012 — XI.2012',
    company: 'Confidential',
    role: 'TeamLeader · Senior Flash Developer',
    description: 'Social network games development. Managing company satellite office and projects.',
    tags: ['Flash', 'ActionScript 3', 'Team Lead'],
    legacy: true,
  },
  {
    date: 'XI.2009 — XII.2011',
    company: 'Confidential',
    role: 'Senior Flash Developer',
    description: 'Creation of 12 standing info-spot multimedia presentations for the History Museum of Kraków. Development of web pages, games and presentations.',
    tags: ['Flash', 'ActionScript 3', 'Multimedia'],
    legacy: true,
  },
  {
    date: 'VIII.2008 — VI.2014',
    company: 'Self Employed',
    role: 'Freelance · Micro-company B2B',
    description: 'Managing own micro-company. Creating multimedia applications and developing web pages for various clients.',
    tags: ['Flash', 'ActionScript 3', 'AmfPHP', 'Web'],
    legacy: true,
  },
  {
    date: 'XII.2007 — V.2008',
    company: 'Confidential',
    role: 'Multimedia Specialist',
    description: 'Creating multimedia presentations. Programming educational games.',
    tags: ['Flash', 'ActionScript 3', 'Multimedia'],
    legacy: true,
  },
]

// ─── JOB ENTRY ───────────────────────────────────────────────────────────────

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

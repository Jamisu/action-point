'use client'

import { useEffect, useRef, useState } from 'react'
import SkillCard, { SkillGroup } from '@/components/SkillCard'
import { Groups } from '@/data/skills.data'

// ─── GROUP BLOCK ─────────────────────────────────────────────────────────────

function GroupBlock({ group }: { group: SkillGroup }) {
  const pairA = group.skills.slice(0, 2)
  const pairB = group.skills.slice(2, 4)

  return (
    <div className="flex flex-col gap-3 flex-1">
      <p className={`font-mono text-xs uppercase tracking-widest ${
        group.legacy
          ? 'text-[#64748b]/60'
          : group.emerging
          ? 'text-[#fbbf24]/70'
          : 'text-[#fbbf24]/50'
      }`}>
        {group.legacy ? `⚰ ${group.label}` : group.label}
      </p>

      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          {pairA.map(s => (
            <SkillCard key={s.name} skill={s} legacy={group.legacy} emerging={group.emerging} tooltipPosition="top" />
          ))}
        </div>
        <div className="w-6" />
        <div className="flex gap-2">
          {pairB.map(s => (
            <SkillCard key={s.name} skill={s} legacy={group.legacy} emerging={group.emerging} tooltipPosition="top" />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── ANIMATED ROW ────────────────────────────────────────────────────────────

const rowOpacity = [1, 0.8, 0.6]

function AnimatedRow({ left, right, rowIndex }: { left: SkillGroup; right: SkillGroup; rowIndex: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), rowIndex * 200)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rowIndex])

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row gap-10 md:gap-12"
      style={{
        opacity: visible ? rowOpacity[rowIndex] : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${rowIndex * 0.15}s, transform 0.5s ease ${rowIndex * 0.15}s`,
      }}
    >
      <GroupBlock group={left} />
      <div className="hidden md:block w-px bg-[#1f2d45] self-stretch" />
      <GroupBlock group={right} />
    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

const rows: [SkillGroup, SkillGroup][] = [
  [Groups[0], Groups[1]],
  [Groups[2], Groups[3]],
  [Groups[4], Groups[5]],
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center px-6 py-24 bg-gradient-to-b from-[#0f1e35] to-[#0a0e1a]"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-16">

        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9]">
            Skills
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">
            What I Work With
          </h2>
          <div className="w-16 h-0.5 bg-[#fbbf24] opacity-50" />
        </div>

        <div className="flex flex-col gap-16">
          {rows.map(([left, right], i) => (
            <AnimatedRow key={left.label} left={left} right={right} rowIndex={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

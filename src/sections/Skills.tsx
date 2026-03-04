'use client'

import { useState, useEffect, useRef } from 'react'
import { Skill, SkillGroup, Groups as groups } from '@/components/SkillCard'

// ─── SKILL CARD ──────────────────────────────────────────────────────────────

function SkillCard({ skill, legacy, emerging }: { skill: Skill; legacy?: boolean; emerging?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const label = skill.tooltip ?? skill.name

  return (
    <div
      className={`
        relative flex items-center justify-center
        w-24 h-24 rounded-xl border transition-all duration-300 cursor-default
        ${legacy
          ? 'border-[#1f2d45]/50 bg-[#0a0e1a]/40'
          : emerging
          ? 'border-[#fbbf24]/20 bg-[#0f1e35]/60 hover:border-[#fbbf24]/60 hover:bg-[#0f1e35]'
          : 'border-[#1f2d45] bg-[#0a0e1a]/60 hover:border-[#fbbf24]/40 hover:bg-[#0f1e35]/80'
        }
        ${hovered ? 'scale-105 shadow-lg shadow-[#fbbf24]/10' : ''}
      `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ICON */}
      {skill.type === 'devicon' && (
        <i
          className={`devicon-${skill.icon}-plain text-4xl`}
          style={{ color: legacy ? '#64748b' : '#fbbf24' }}
        />
      )}
      {skill.type === 'simple' && skill.SimpleIcon && (
        <skill.SimpleIcon size={34} color={legacy ? '#64748b' : '#fbbf24'} />
      )}
      {skill.type === 'text' && (
        <span
          className="font-mono text-center leading-tight px-2 py-1 rounded border border-[#fbbf24]/30 text-[#fbbf24]"
          style={{ fontSize: '9px' }}
        >
          {skill.name}
        </span>
      )}

      {/* TOOLTIP */}
      <div className={`
        absolute -top-9 left-1/2 -translate-x-1/2
        px-2 py-1 rounded bg-[#0f1e35] border border-[#1f2d45]
        font-mono text-[10px] uppercase tracking-widest text-[#94a3b8]
        whitespace-nowrap pointer-events-none transition-all duration-200
        ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
      `}>
        {label}
      </div>

      {/* LEGACY diagonal */}
      {legacy && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-[#64748b]/20 rotate-12" />
        </div>
      )}
    </div>
  )
}

// ─── SKILL GROUP BLOCK ───────────────────────────────────────────────────────
// One group: label + [A B] gap [C D]

function GroupBlock({ group }: { group: SkillGroup }) {
  const pairA = group.skills.slice(0, 2)
  const pairB = group.skills.slice(2, 4)

  return (
    <div className="flex flex-col gap-3 flex-1">
      {/* LABEL */}
      <p className={`font-mono text-xs uppercase tracking-widest ${
        group.legacy
          ? 'text-[#64748b]/60'
          : group.emerging
          ? 'text-[#fbbf24]/70'
          : 'text-[#fbbf24]/50'
      }`}>
        {group.legacy ? `⚰ ${group.label}` : group.label}
      </p>

      {/* [A B] gap [C D] */}
      <div className="flex items-center gap-2">
        <div className="flex gap-2">
          {pairA.map(s => <SkillCard key={s.name} skill={s} legacy={group.legacy} emerging={group.emerging} />)}
        </div>
        <div className="w-6" />
        <div className="flex gap-2">
          {pairB.map(s => <SkillCard key={s.name} skill={s} legacy={group.legacy} emerging={group.emerging} />)}
        </div>
      </div>
    </div>
  )
}

// ─── ANIMATED ROW ────────────────────────────────────────────────────────────
// Two groups side by side, fade in when scrolled into view

function AnimatedRow({ left, right, rowIndex }: { left: SkillGroup; right: SkillGroup; rowIndex: number }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), rowIndex * 200)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [rowIndex])

  // row 0 = full, row 1 = 75%, row 2 = 55%
  const brightness = rowIndex === 0 ? 'brightness-100' : rowIndex === 1 ? 'brightness-75' : 'brightness-50'

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row gap-10 md:gap-16 ${brightness}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${rowIndex * 0.15}s, transform 0.5s ease ${rowIndex * 0.15}s`,
      }}
    >
      <GroupBlock group={left} />
      {/* vertical divider — desktop only */}
      <div className="hidden md:block w-px bg-[#1f2d45] self-stretch" />
      <GroupBlock group={right} />
    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

// Pair groups into rows: [0,1] [2,3] [4,5]
const rows = [
  [groups[0], groups[1]],
  [groups[2], groups[3]],
  [groups[4], groups[5]],
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center px-6 py-24 bg-gradient-to-b from-[#0f1e35] to-[#0a0e1a]"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-16">

        {/* SECTION HEADER */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9]">
            Skills
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">
            What I Work With
          </h2>
          <div className="w-16 h-0.5 bg-[#fbbf24] opacity-50" />
        </div>

        {/* 3 ROWS × 2 GROUPS */}
        <div className="flex flex-col gap-16">
          {rows.map(([left, right], i) => (
            <AnimatedRow key={left.label} left={left} right={right} rowIndex={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

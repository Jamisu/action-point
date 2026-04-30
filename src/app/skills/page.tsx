'use client'

import { useEffect, useRef, useState } from 'react'
import { useData } from '@/contexts/DataContext'
import { SkillGroup } from '@/types/types'
import SkillCard from '@/components/ui/SkillCard'
import { useIntersectionObserver } from '@/lib/useIntersectionObserver'

function GroupBlock({ group }: { group: SkillGroup }) {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <p
        className={`font-mono text-sm uppercase tracking-widest font-bold ${
          group.legacy ? 'text-[var(--c-muted)]' : 'text-[var(--c-yellow)]'
        }`}
      >
        {group.legacy ? `🕯️${group.label}` : group.label}
      </p>

      <div className="flex items-center justify-between">
        {group.skills.map((s) => (
          <SkillCard
            key={s.name}
            skill={s}
            legacy={group.legacy}
            emerging={group.emerging}
            tooltipPosition="bottom"
          />
        ))}
      </div>
    </div>
  )
}

const rowOpacity = [1, 0.8, 0.6]

function AnimatedRow({
  left,
  right,
  rowIndex,
}: {
  left: SkillGroup
  right: SkillGroup
  rowIndex: number
}) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ delay: rowIndex * 200 })

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row gap-10 md:gap-16"
      style={{
        opacity: isVisible ? rowOpacity[rowIndex] : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${rowIndex * 0.15}s, transform 0.5s ease ${rowIndex * 0.15}s`,
      }}
    >
      <GroupBlock group={left} />
      <div className="hidden md:block w-px self-stretch" />
      <GroupBlock group={right} />
    </div>
  )
}

export default function SkillsPage() {
  const { skillGroups } = useData()

  const rows = skillGroups.reduce<[SkillGroup, SkillGroup][]>((acc, _, i) => {
    if (i % 2 === 0 && skillGroups[i + 1]) acc.push([skillGroups[i], skillGroups[i + 1]])
    return acc
  }, [])

  return (

      <div
        id="skills"
        className="min-h-screen flex flex-col justify-center px-6 py-24"
      >
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--c-blue)]">Skills</p>
            <h2 className="font-sans text-4xl md:text-5xl font-bold var(--c-heading)">What I Work With</h2>
            <div className="w-16 h-0.5 bg-[var(--c-yellow)] opacity-50" />
          </div>

          <div className="flex flex-col gap-16">
            {rows.map(([left, right], i) => (
              <AnimatedRow key={left.label} left={left} right={right} rowIndex={i} />
            ))}
          </div>
        </div>
      </div>

  )
}
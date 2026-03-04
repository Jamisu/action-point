'use client'

import { useRef } from 'react'
import { useTooltip } from '@/components/ui/TooltipContext'

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface Skill {
  name: string
  tooltip?: string
  type: 'devicon' | 'simple' | 'text'
  icon?: string
  SimpleIcon?: React.ComponentType<{ size?: number; color?: string }>
  color?: string
}

export interface SkillGroup {
  label: string
  skills: Skill[]
  legacy?: boolean
  emerging?: boolean
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

interface SkillCardProps {
  skill: Skill
  legacy?: boolean
  emerging?: boolean
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
}

export default function SkillCard({
  skill,
  legacy,
  emerging,
  tooltipPosition = 'bottom',
}: SkillCardProps) {
  const { show, hide } = useTooltip()
  const ref = useRef<HTMLDivElement>(null)
  const label = skill.tooltip ?? skill.name
  const iconColor = legacy ? '#64748b' : '#fbbf24'

  function handleMouseEnter() {
    if (!ref.current) return
    show(label, ref.current.getBoundingClientRect(), { position: tooltipPosition })
  }

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={hide}
      className={`
        relative flex items-center justify-center
        w-24 h-24 rounded-xl border transition-all duration-300 cursor-default
        hover:scale-112
        ${legacy
          ? 'border-[#1f2d45]/80 bg-[#0a0e1a]/60 hover:shadow-[#64748b]/10'
          : emerging
          ? 'border-[#fbbf24]/80 bg-[#0f1e35]/60 hover:border-[#fbbf24]/60 hover:bg-[#0f1e35] hover:shadow-lg hover:shadow-[#fbbf24]/10'
          : 'border-[#1f2d45] bg-[#0a0e1a]/80 hover:border-[#fbbf24]/40 hover:bg-[#0f1e35]/80 hover:shadow-lg hover:shadow-[#fbbf24]/10'
        }
      `}
    >
      {skill.type === 'devicon' && (
        <i
          className={`devicon-${skill.icon}-plain text-5xl`}
          style={{ color: iconColor }}
        />
      )}

      {skill.type === 'simple' && skill.SimpleIcon && (
        <skill.SimpleIcon size={48} color={iconColor} />
      )}

      {skill.type === 'text' && (
        <span
          className="font-mono text-center leading-tight px-2 py-1 rounded border border-[#fbbf24]/30 text-[#fbbf24]"
          style={{ fontSize: '14px' }}
        >
          {skill.name}
        </span>
      )}

      {legacy && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-[#64748b]/20 rotate-12" />
        </div>
      )}
    </div>
  )
}

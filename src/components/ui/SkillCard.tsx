'use client'

import { useRef } from 'react'
import { useTooltip } from '@/contexts/TooltipContext'
import {
  SiTailwindcss,
  SiPostman,
  SiThreedotjs,
} from '@icons-pack/react-simple-icons'

const iconMap = {
  SiTailwindcss,
  SiPostman, 
  SiThreedotjs,
} as const

type IconKey = keyof typeof iconMap

export interface Skill {
  name: string
  tooltip?: string
  type: 'devicon' | 'simple' | 'text'
  icon?: string
  SimpleIcon?: React.ComponentType<{ size?: number; color?: string }>
  simpleIcon?: string
  color?: string
}

export interface SkillGroup {
  label: string
  skills: Skill[]
  legacy?: boolean
  emerging?: boolean
}

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
  const iconColor = legacy ? 'var(--c-muted)' : 'var(--c-yellow)'
  const ResolvedIcon = skill.simpleIcon 
    ? iconMap[skill.simpleIcon as IconKey] 
    : null

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
        w-24 h-24 rounded-xl border-2 transition-all duration-300 cursor-default
        hover:scale-105
        ${legacy
          ? 'border-[var(--c-muted)]/40 bg-[var(--c-bg)]/60 hover:border-[var(--c-muted)]/70 hover:shadow-lg hover:shadow-[var(--c-muted)]/10'
          : emerging
          ? 'border-[var(--c-yellow)]/50 bg-[var(--c-bg2)]/60 hover:border-[var(--c-yellow)]/80 hover:bg-[var(--c-bg2)] hover:shadow-lg hover:shadow-[var(--c-yellow)]/10'
          : 'border-[var(--c-surf)] bg-[var(--c-bg)]/80 hover:border-[var(--c-yellow)]/60 hover:bg-[var(--c-bg2)]/80 hover:shadow-lg hover:shadow-[var(--c-yellow)]/10'
        }
      `}
    >
      {skill.type === 'devicon' && (
        <i
          className={`devicon-${skill.icon}-plain text-5xl`}
          style={{ color: iconColor }}
        />
      )}

      {skill.type === 'simple' && ResolvedIcon && (
        <ResolvedIcon size={48} color={iconColor} />
      )}

      {skill.type === 'text' && (
        <span
          className="font-mono text-center leading-tight px-1 py-1 rounded border border-[var(--c-yellow)]/30 text-[var(--c-yellow)]"
          style={{ fontSize: '14px' }}
        >
          {skill.name}
        </span>
      )}

      {legacy && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-[var(--c-muted)]/15 rotate-12" />
        </div>
      )}
    </div>
  )
}

'use client'

import { useRef } from 'react'
import { useTooltip } from '@/components/ui/TooltipContext'
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
  const iconColor = legacy ? '#94a3b8' : '#fbbf24'
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
          ? 'border-[#94a3b8]/40 bg-[#0a0e1a]/60 hover:border-[#94a3b8]/70 hover:shadow-lg hover:shadow-[#94a3b8]/10'
          : emerging
          ? 'border-[#fbbf24]/50 bg-[#0f1e35]/60 hover:border-[#fbbf24]/80 hover:bg-[#0f1e35] hover:shadow-lg hover:shadow-[#fbbf24]/10'
          : 'border-[#1f2d45] bg-[#0a0e1a]/80 hover:border-[#fbbf24]/60 hover:bg-[#0f1e35]/80 hover:shadow-lg hover:shadow-[#fbbf24]/10'
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
          className="font-mono text-center leading-tight px-1 py-1 rounded border border-[#fbbf24]/30 text-[#fbbf24]"
          style={{ fontSize: '14px' }}
        >
          {skill.name}
        </span>
      )}

      {legacy && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-[#94a3b8]/15 rotate-12" />
        </div>
      )}
    </div>
  )
}

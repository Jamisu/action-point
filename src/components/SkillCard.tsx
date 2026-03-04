'use client'

import { useState } from 'react'
import Tooltip from '@/components/ui/Tooltip'

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

// ─── SKILL CARD COMPONENT ────────────────────────────────────────────────────

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
  tooltipPosition = 'top',
}: SkillCardProps) {
  const [hovered, setHovered] = useState(false)
  const label = skill.tooltip ?? skill.name
  const iconColor = legacy ? '#64748b' : '#fbbf24'

  return (
    <Tooltip text={label} position={tooltipPosition}>
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
        {skill.type === 'devicon' && (
          <i
            className={`devicon-${skill.icon}-plain text-4xl`}
            style={{ color: iconColor }}
          />
        )}

        {skill.type === 'simple' && skill.SimpleIcon && (
          <skill.SimpleIcon size={34} color={iconColor} />
        )}

        {skill.type === 'text' && (
          <span
            className="font-mono text-center leading-tight px-2 py-1 rounded border border-[#fbbf24]/30 text-[#fbbf24]"
            style={{ fontSize: '9px' }}
          >
            {skill.name}
          </span>
        )}

        {/* LEGACY diagonal scratch */}
        {legacy && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-px bg-[#64748b]/20 rotate-12" />
          </div>
        )}
      </div>
    </Tooltip>
  )
}

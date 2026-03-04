'use client'

import { useState } from 'react'
import {
  SiTailwindcss,
  SiPostman,
  SiOpenid,
  SiThreedotjs,
} from '@icons-pack/react-simple-icons'
import {Skill, SkillGroup, Groups} from '@/components/SkillCard'

// ─── DATA ────────────────────────────────────────────────────────────────────

const groups: SkillGroup[] = [
  {
    label: 'Core Stack',
    skills: [
      { name: 'React',      type: 'devicon', icon: 'react',      color: '#61DAFB' },
      { name: 'JavaScript', type: 'devicon', icon: 'javascript', color: '#F7DF1E' },
      { name: 'Next.js',    type: 'devicon', icon: 'nextjs',     color: '#ffffff' },
      { name: 'TypeScript', type: 'devicon', icon: 'typescript', color: '#3178C6' },
    ],
  },
  {
    label: 'Styling',
    skills: [
      { name: 'HTML5',     type: 'devicon', icon: 'html5',     color: '#E34F26' },
      { name: 'CSS3',      type: 'devicon', icon: 'css3',      color: '#1572B6' },
      { name: 'Tailwind',  type: 'simple',  SimpleIcon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Sass',      type: 'devicon', icon: 'sass',      color: '#CC6699' },
    ],
  },
  {
    label: 'Tooling & Workflow',
    skills: [
      { name: 'Redux',    type: 'devicon', icon: 'redux',   color: '#764ABC' },
      { name: 'Jest',     type: 'devicon', icon: 'jest',    color: '#C21325' },
      { name: 'Webpack',  type: 'devicon', icon: 'webpack', color: '#8DD6F9' },
      { name: 'CI/CD',    type: 'simple',  SimpleIcon: SiPostman, tooltip: 'CI/CD Pipelines', color: '#FF6C37' },
    ],
  },
  {
    label: 'Backend & Data',
    skills: [
      { name: 'Python',  type: 'devicon', icon: 'python', color: '#3776AB' },
      { name: 'Java',    type: 'devicon', icon: 'java',   color: '#ED8B00' },
      { name: 'Docker',  type: 'devicon', icon: 'docker', color: '#2496ED' },
      { name: 'REST API', tooltip: 'REST API', type: 'simple', SimpleIcon: SiPostman, color: '#FF6C37' },
    ],
  },
  {
    emerging: true,
    label: 'Emerging',
    skills: [
      { name: 'OpenAI',   type: 'simple', SimpleIcon: SiOpenid,    color: '#ffffff' },
      { name: 'Pixi.js',  type: 'text' },
      { name: 'WebGL',    type: 'text' },
      { name: 'Three.js', type: 'simple', SimpleIcon: SiThreedotjs, color: '#ffffff' },
    ],
  },
  {
    legacy: true,
    label: 'Legacy',
    skills: [
      { name: 'Flash',         type: 'devicon', icon: 'flash',        color: '#FF0000' },
      { name: 'ActionScript',  type: 'devicon', icon: 'actionscript', color: '#ED1C24' },
      { name: 'AmfPHP',        type: 'text' },
      { name: 'Sound Design',  type: 'text' },
    ],
  },
]

// ─── SKILL CARD ──────────────────────────────────────────────────────────────

function SkillCard({ skill, legacy, emerging }: { skill: Skill; legacy?: boolean; emerging?: boolean }) {
  const [hovered, setHovered] = useState(false)
  const label = skill.tooltip ?? skill.name

  const baseCard = `
    relative flex flex-col items-center justify-center gap-2
    w-20 h-20 rounded-xl border transition-all duration-300 cursor-default
    ${legacy
      ? 'border-[#1f2d45]/50 bg-[#0a0e1a]/40 opacity-50 hover:opacity-80'
      : emerging
      ? 'border-[#4f9cf9]/20 bg-[#0f1e35]/60 hover:border-[#4f9cf9]/60 hover:bg-[#0f1e35]'
      : 'border-[#1f2d45] bg-[#0a0e1a]/60 hover:border-[#4f9cf9]/40 hover:bg-[#0f1e35]/80'
    }
    ${hovered ? 'scale-105 shadow-lg shadow-[#4f9cf9]/10' : ''}
  `

  return (
    <div
      className={baseCard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ICON */}
      <div className="flex items-center justify-center w-8 h-8">
        {skill.type === 'devicon' && (
          <i
            className={`devicon-${skill.icon}-plain text-3xl`}
            style={{ color: legacy ? '#64748b' : skill.color }}
          />
        )}
        {skill.type === 'simple' && skill.SimpleIcon && (
          <skill.SimpleIcon
            size={28}
            color={legacy ? '#64748b' : skill.color}
          />
        )}
        {skill.type === 'text' && (
          <span
            className="font-mono text-[10px] uppercase tracking-widest text-center leading-tight px-2 py-1 rounded border border-[#1f2d45] text-[#64748b]"
            style={{ fontSize: '9px' }}
          >
            {skill.name}
          </span>
        )}
      </div>

      {/* TOOLTIP */}
      <div
        className={`
          absolute -top-9 left-1/2 -translate-x-1/2
          px-2 py-1 rounded bg-[#0f1e35] border border-[#1f2d45]
          font-mono text-[10px] uppercase tracking-widest text-[#94a3b8]
          whitespace-nowrap pointer-events-none
          transition-all duration-200
          ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
        `}
      >
        {label}
      </div>

      {/* LEGACY STRIKETHROUGH VIBE — subtle line */}
      {legacy && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-[#64748b]/20 rotate-12" />
        </div>
      )}
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center px-6 py-24 bg-gradient-to-b from-[#0a0e1a] to-[#0f1e35]"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-16">

        {/* SECTION LABEL */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9]">
            Skills
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">
            What I Work With
          </h2>
          <div className="w-16 h-0.5 bg-[#4f9cf9] opacity-50" />
        </div>

        {/* GROUPS */}
        <div className="flex flex-col gap-12">
          {groups.map((group) => (
            <div key={group.label} className="flex flex-col gap-4">

              {/* GROUP LABEL */}
              <p className={`font-mono text-xs uppercase tracking-widest ${
                group.legacy
                  ? 'text-[#64748b]/60'
                  : group.emerging
                  ? 'text-[#a78bfa]'
                  : 'text-[#4f9cf9]/70'
              }`}>
                {group.legacy ? `⚰ ${group.label}` : group.label}
              </p>

              {/* SKILL CARDS */}
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    legacy={group.legacy}
                    emerging={group.emerging}
                  />
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

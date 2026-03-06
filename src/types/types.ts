// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

export interface Job {
  date: string
  company: string
  role: string
  description: string
  tags: string[]
  legacy?: boolean
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

export interface Skill {
  name: string
  tooltip?: string
  type: 'devicon' | 'simple' | 'text'
  icon?: string        // devicon identifier e.g. 'react'
  simpleIcon?: string  // iconMap key e.g. 'SiTailwindcss'
  color?: string
}

export interface SkillGroup {
  label: string
  skills: Skill[]
  legacy?: boolean
  emerging?: boolean
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

export interface ContactLink {
  icon: string   // lucide icon name e.g. 'Mail', 'Phone'
  label: string
  value: string
  href: string
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

export interface Project {
  title: string
  description: string
  tags: string[]
  url?: string
  repo?: string
  image?: string
  featured?: boolean
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export interface AppData {
  jobs: Job[]
  skillGroups: SkillGroup[]
  contact: ContactLink[]
  projects: Project[]
}

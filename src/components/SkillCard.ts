import {
  SiTailwindcss,
  SiPostman,
  SiOpenid,
  SiThreedotjs,
} from '@icons-pack/react-simple-icons'

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

export const Groups: SkillGroup[] = [
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
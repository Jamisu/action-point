import {
  SiTailwindcss,
  SiPostman,
  SiThreedotjs,
} from '@icons-pack/react-simple-icons'
import { SkillGroup } from '@/components/SkillCard'

export const Groups: SkillGroup[] = [
  {
    label: 'Core Stack',
    skills: [
      { name: 'React',      type: 'devicon', icon: 'react',      color: '#fbbf24' },
      { name: 'JavaScript', type: 'devicon', icon: 'javascript', color: '#fbbf24' },
      { name: 'Next.js',    type: 'devicon', icon: 'nextjs',     color: '#fbbf24' },
      { name: 'TypeScript', type: 'devicon', icon: 'typescript', color: '#fbbf24' },
    ],
  },
  {
    label: 'Styling',
    skills: [
      { name: 'HTML5',    type: 'devicon', icon: 'html5',     color: '#fbbf24' },
      { name: 'CSS3',     type: 'devicon', icon: 'css3',      color: '#fbbf24' },
      { name: 'Tailwind', type: 'simple',  SimpleIcon: SiTailwindcss, color: '#fbbf24' },
      { name: 'Sass',     type: 'devicon', icon: 'sass',      color: '#fbbf24' },
    ],
  },
  {
    label: 'Tooling & Workflow',
    skills: [
      { name: 'Redux',   type: 'devicon', icon: 'redux',   color: '#fbbf24' },
      { name: 'Jest',    type: 'devicon', icon: 'jest',    color: '#fbbf24' },
      { name: 'Webpack', type: 'devicon', icon: 'webpack', color: '#fbbf24' },
      { name: 'CI/CD',   tooltip: 'CI/CD Pipelines', type: 'simple', SimpleIcon: SiPostman, color: '#fbbf24' },
    ],
  },
  {
    label: 'Backend & Data',
    skills: [
      { name: 'Python', type: 'devicon', icon: 'python', color: '#fbbf24' },
      { name: 'Java',   type: 'devicon', icon: 'java',   color: '#fbbf24' },
      { name: 'Docker', type: 'devicon', icon: 'docker', color: '#fbbf24' },
      { name: 'REST API', tooltip: 'REST API', type: 'simple', SimpleIcon: SiPostman, color: '#fbbf24' },
    ],
  },
  {
    label: 'Emerging',
    emerging: true,
    skills: [
      { name: 'OpenAI',   type: 'text' },
      { name: 'Pixi.js',  type: 'text' },
      { name: 'WebGL',    type: 'text' },
      { name: 'Three.js', type: 'simple', SimpleIcon: SiThreedotjs, color: '#fbbf24' },
    ],
  },
  {
    label: 'Legacy',
    legacy: true,
    skills: [
      { name: 'Flash',        type: 'text' },
      { name: 'Action\nScript', type: 'text' },
      { name: 'AmfPHP',       type: 'text' },
      { name: 'Flare3D',      type: 'text' },
    ],
  },
]

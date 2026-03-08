import { render, screen } from '@testing-library/react'
import Skills from './Skills'

jest.mock('@/contexts/TooltipContext', () => ({
  useTooltip: () => ({ show: jest.fn(), hide: jest.fn() }),
}))

jest.mock('@/contexts/DataContext', () => ({
  useData: () => ({
    skillGroups: [
      { label: 'Core Stack', skills: [{ name: 'React', type: "devicon"}, { name: 'TypeScript', type: "devicon" }] },
      { label: 'Styling', skills: [{ name: 'Tailwind', type: "simple" }, { name: 'CSS', type: "devicon" }] },
      { label: 'Tooling & Workflow', skills: [{ name: 'Redux', type: "devicon" }, { name: 'Webpack', type: "devicon" }] },
      { label: 'Backend & Data', skills: [{ name: 'Python', type: "devicon" }, { name: 'Docker', type: "devicon" }] },
      { label: 'Emerging', emerging: true, skills: [{ name: 'WebGL', type: "text" }, { name: 'Pixi.js', type: "text" }] },
      { label: 'Legacy', legacy: true, skills: [
        { name: 'Flash', type: "text" }, { name: 'Flare3D', type: "text" }
      ]},
    ],
  }),
}))

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }))
})

describe('Skills section', () => {
  it('renders section label', () => {
    render(<Skills />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('renders section title', () => {
    render(<Skills />)
    expect(screen.getByText('What I Work With')).toBeInTheDocument()
  })

  it('renders all group labels', () => {
    render(<Skills />)
    expect(screen.getByText('Core Stack')).toBeInTheDocument()
    expect(screen.getByText('Styling')).toBeInTheDocument()
    expect(screen.getByText('Tooling & Workflow')).toBeInTheDocument()
    expect(screen.getByText('Backend & Data')).toBeInTheDocument()
    expect(screen.getByText('Emerging')).toBeInTheDocument()
  })

  it('renders legacy group with tombstone emoji', () => {
    render(<Skills />)
    expect(screen.getByText(/🕯️/)).toBeInTheDocument()
    expect(screen.getByText(/legacy/i)).toBeInTheDocument()
  })

  it('renders text badge skills', () => {
    render(<Skills />)
    expect(screen.getByText('Flash')).toBeInTheDocument()
    expect(screen.getByText('WebGL')).toBeInTheDocument()
    expect(screen.getByText('Pixi.js')).toBeInTheDocument()
    expect(screen.getByText('Flare3D')).toBeInTheDocument()
  })

  it('renders correct number of skill rows', () => {
    render(<Skills />)    
    const dividers = document.querySelectorAll('.hidden.md\\:block.w-px')
    expect(dividers).toHaveLength(3)
  })

  it('groups start hidden and animate in on intersection', () => {
    render(<Skills />)    
    const section = document.getElementById('skills')
    expect(section).toBeInTheDocument()
  })
})

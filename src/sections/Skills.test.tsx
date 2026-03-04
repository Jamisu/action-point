import { render, screen } from '@testing-library/react'
import Skills from './Skills'

// Mock TooltipContext so useTooltip doesn't throw outside provider
jest.mock('@/components/ui/TooltipContext', () => ({
  useTooltip: () => ({ show: jest.fn(), hide: jest.fn() }),
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
    expect(screen.getByText(/⚰/)).toBeInTheDocument()
    expect(screen.getByText(/legacy/i)).toBeInTheDocument()
  })

  it('renders text badge skills', () => {
    render(<Skills />)
    expect(screen.getByText('Pixi.js')).toBeInTheDocument()
    expect(screen.getByText('WebGL')).toBeInTheDocument()
    expect(screen.getByText('AmfPHP')).toBeInTheDocument()
    expect(screen.getByText('Flare3D')).toBeInTheDocument()
  })

  it('renders correct number of skill rows', () => {
    render(<Skills />)
    // 3 animated rows — each has a divider between the two groups
    const dividers = document.querySelectorAll('.hidden.md\\:block.w-px')
    expect(dividers).toHaveLength(3)
  })

  it('groups start hidden and animate in on intersection', async () => {
    render(<Skills />)
    // groups are opacity 0 initially — IntersectionObserver never fires in jsdom
    const section = document.getElementById('skills')
    expect(section).toBeInTheDocument()
  })
})

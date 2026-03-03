import { render, screen } from '@testing-library/react'
import About from './About'

// Mock IntersectionObserver — jsdom doesn't have it
beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }))
})

describe('About section', () => {
  it('renders section label', () => {
    render(<About />)
    expect(screen.getByText('About Me')).toBeInTheDocument()
  })

  it('does not render typewriter text before intersection', () => {
    render(<About />)
    expect(screen.queryByText(/front-end engineer/i)).not.toBeInTheDocument()
  })
})
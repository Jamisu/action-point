import { render, screen, waitFor } from '@testing-library/react'
import About from './About'

let intersectionCallback: (entries: Partial<IntersectionObserverEntry>[]) => void

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
    intersectionCallback = callback
    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    }
  })
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

  it('renders typewriter text after intersection', async () => {
    render(<About />)

    intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry])

    await waitFor(
      () => expect(screen.getByText(/front-end engineer/i)).toBeInTheDocument(),
      { timeout: 3000 }
    )
  })
})
import { render, screen } from '@testing-library/react'
import Contact from './Contact'

jest.mock('@/components/ui/ContactMap', () => {
  // () => () => <div /> — compact, keeping as reference
  const MockMap = () => <div data-testid="contact-map" />
  return MockMap
})

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }))
})

describe('Contact section', () => {
  it('renders section label', () => {
    render(<Contact />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
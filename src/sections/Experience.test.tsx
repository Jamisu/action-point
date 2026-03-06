import { render, screen } from '@testing-library/react'
import Experience from './Experience'

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

describe('Experience section', () => {
  it('renders section label', () => {
    render(<Experience />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })
})
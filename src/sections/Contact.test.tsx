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
  
  it('renders map', () => {
    render(<Contact />)
    expect(screen.getByTestId('contact-map')).toBeInTheDocument()
  })
  
  it('renders contact links with correct hrefs', () => {
    render(<Contact />)
    expect(screen.getByText('Email').closest('a')).toHaveAttribute('href', 'mailto:info@actionpoint.com')
    expect(screen.getByText('Phone').closest('a')).toHaveAttribute('href', 'tel:+1234567890')
    expect(screen.getByText('Location').closest('a')).toHaveAttribute('href', 'https://maps.google.com')
  })
  
  it('renders contact links with correct text', () => {
    render(<Contact />)
    expect(screen.getByText('Email')).toHaveTextContent('Email')
    expect(screen.getByText('Phone')).toHaveTextContent('Phone')
    expect(screen.getByText('Location')).toHaveTextContent('Location')
  })
})
import { render, screen } from '@testing-library/react'
import Contact from '@/app/contact/page'

jest.mock('next/dynamic', () => {
  return () => {
    return function DynamicComponent(props: any) {
      const mod = require('@/components/ui/ContactMap')
      const Comp = mod.default ?? mod
      return <Comp {...props} />
    }
  }
})

jest.mock('@/components/ui/ContactMap', () => {
  const MockMap = () => <div data-testid="contact-map" />
  return MockMap
})

jest.mock('@/contexts/DataContext', () => ({
  useData: () => ({
    "contact": [
      {
        "icon": "Mail",
        "label": "Email",
        "value": "any@email.com",
        "href": "mailto:any@email.com"
      },
      {
        "icon": "Phone",
        "label": "Phone",
        "value": "+48 666 666 666",
        "href": "tel:+48 666 666 666"
      },
      {
        "icon": "Linkedin",
        "label": "LinkedIn",
        "value": "linkedin.com/in/yourprofile",
        "href": "https://linkedin.com/in/yourprofile"
      },
      {
        "icon": "Github",
        "label": "GitHub",
        "value": "github.com/Jamisu",
        "href": "https://github.com/Jamisu"
      }
    ],
  }),
}))

let intersectionCallback: Function

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation((callback) => {
    intersectionCallback = callback
    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn()
    }
  })
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
    expect(screen.getByText('Email').closest('a')).toHaveAttribute('href', 'mailto:any@email.com')
    expect(screen.getByText('Phone').closest('a')).toHaveAttribute('href', 'tel:+48 666 666 666')
  })
  
  it('renders contact links with correct text', () => {
    render(<Contact />)
    expect(screen.getByText('Email')).toHaveTextContent('Email')
    expect(screen.getByText('Phone')).toHaveTextContent('Phone')
  })
})
import { render, screen } from '@testing-library/react'
import Experience from '@/app/experience/page'

jest.mock('@/contexts/DataContext', () => ({
  useData: () => ({
    jobs: [
      {
        date: 'XI.2022 — XII.2023',
        company: 'Confidential · B2B Contract',
        role: 'Front-End Engineer',
        description: 'Developing Front-End microservices.',
        tags: ['React', 'TypeScript'],
        legacy: false,
      },
      {
        date: 'VI.2014 — X.2015',
        company: 'Legacy Co',
        role: 'Senior Flash Developer',
        description: 'Legacy era work.',
        tags: ['Flash', 'ActionScript 3'],
        legacy: true,
      },
    ]
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

describe('Experience section', () => {
  it('renders section label', () => {
    render(<Experience />)
    intersectionCallback([{ isIntersecting: true }])
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders section heading', () => {
    render(<Experience />)
    intersectionCallback([{ isIntersecting: true }])
    expect(screen.getByText("Where I've Been")).toBeInTheDocument()
  })

  it('renders a job company name', () => {
    render(<Experience />)
    intersectionCallback([{ isIntersecting: true }])
    expect(screen.getByText('Confidential · B2B Contract')).toBeInTheDocument()
  })

  it('renders a job role', () => {
    render(<Experience />)
    intersectionCallback([{ isIntersecting: true }])
    expect(screen.getByText('Front-End Engineer')).toBeInTheDocument()
  })

  it('renders Flash era divider for legacy jobs', () => {
    render(<Experience />)
    intersectionCallback([{ isIntersecting: true }])
    expect(screen.getByText(/Flash era/i)).toBeInTheDocument()
  })

  it('renders job tags', () => {
    render(<Experience />)
    intersectionCallback([{ isIntersecting: true }])
    expect(screen.getByText('React')).toBeInTheDocument()
  })
})

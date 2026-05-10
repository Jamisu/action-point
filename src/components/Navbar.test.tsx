import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

jest.mock('next/navigation', () => ({
  usePathname: () => '/home',
}))

jest.mock('@/contexts/TooltipContext', () => ({
  useTooltip: () => ({ show: jest.fn(), hide: jest.fn() }),
}))

const mockNavigate = jest.fn()
jest.mock('@/contexts/TransitionContext', () => ({
  useTransition: () => ({ navigate: mockNavigate }),
}))

jest.mock('@/lib/navLinks', () => ({
  navLinks: [
    { label: 'Home',       href: '/home' },
    { label: 'About',      href: '/about' },
    { label: 'Skills',     href: '/skills' },
    { label: 'Experience', href: '/experience' },
    { label: 'Projects',   href: '/projects' },
    { label: 'Contact',    href: '/contact' },
  ],
}))

describe('Navbar component', () => {

  it('renders logo correctly', () => {
    render(<Navbar />)
    const logo = screen.getByRole('link', { name: /ap logo/i })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders all nav buttons as buttons', () => {
    render(<Navbar />)
    const labels = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']
    labels.forEach(label => {
      // desktop + mobile = 2 each
      const buttons = screen.getAllByRole('button', { name: new RegExp(label, 'i') })
      expect(buttons).toHaveLength(2)
    })
  })

  it('renders hamburger button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })

  it('does not call navigate when clicking the current page', () => {
    mockNavigate.mockClear()
    render(<Navbar />)
    const [desktopHome] = screen.getAllByRole('button', { name: /home/i })
    fireEvent.click(desktopHome)
    expect(mockNavigate).not.toHaveBeenCalled()
  })

  it('calls navigate when a nav button is clicked', () => {
    mockNavigate.mockClear()
    
    render(<Navbar />)
    const [desktopAbout] = screen.getAllByRole('button', { name: /about/i })
    fireEvent.click(desktopAbout)
    expect(mockNavigate).toHaveBeenCalledWith('/about', '/home')
  })

  it('toggles mobile menu open and closed on hamburger click', () => {
    render(<Navbar />)
    const button = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.click(button)
    fireEvent.click(button)
    expect(button).toBeInTheDocument()
  })

  it('closes mobile menu when clicking outside', () => {
    render(<Navbar />)
    const button = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.click(button)
    fireEvent.mouseDown(document.body)
    expect(button).toBeInTheDocument()
  })
})
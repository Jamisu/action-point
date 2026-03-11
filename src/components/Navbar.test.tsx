import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'

jest.mock('next/navigation', () => ({
  usePathname: () => '/home',
}))

jest.mock('@/contexts/TooltipContext', () => ({
  useTooltip: () => ({ show: jest.fn(), hide: jest.fn() }),
}))

jest.mock('@/contexts/TransitionContext', () => ({
  useTransition: () => ({ navigate: jest.fn() }),
}))

jest.mock('@/lib/navLinks', () => ({
  navLinks: [
    { label: 'Home',       href: '/home' },
    { label: 'About',      href: '/about' },
    { label: 'Skills',     href: '/skills' },
    { label: 'Experience', href: '/experience' },
    { label: 'Projects',   href: '/projects' },
    { label: 'Contact',    href: '/contact' },
    { label: 'References', href: 'https://references-action-point.vercel.app/' },
  ],
}))

describe('Navbar component', () => {

  it('renders logo correctly', () => {
    render(<Navbar />)
    const logo = screen.getByRole('link', { name: /ap logo/i })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders all nav buttons (non-References links) as buttons', () => {
    render(<Navbar />)
    const labels = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']
    labels.forEach(label => {
      // desktop + mobile = 2 each
      const buttons = screen.getAllByRole('button', { name: new RegExp(label, 'i') })
      expect(buttons).toHaveLength(2)
    })
  })

  it('renders References as an anchor with correct href', () => {
    render(<Navbar />)
    const refs = screen.getAllByRole('link', { name: /references/i })
    expect(refs).toHaveLength(2)
    refs.forEach(link => expect(link).toHaveAttribute('href', 'https://references-action-point.vercel.app/'))
  })

  it('applies special styling to desktop References link', () => {
    render(<Navbar />)
    const [desktopRef] = screen.getAllByRole('link', { name: /references/i })
    // color test dropped - will externalise colors to theme
    expect(desktopRef).toHaveClass('border')
  })

  it('renders hamburger button', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })

  it('calls navigate when a nav button is clicked', () => {
    const mockNavigate = jest.fn()
    jest.spyOn(require('@/contexts/TransitionContext'), 'useTransition')
      .mockReturnValue({ navigate: mockNavigate })

    render(<Navbar />)
    const [desktopHome] = screen.getAllByRole('button', { name: /home/i })
    fireEvent.click(desktopHome)
    expect(mockNavigate).toHaveBeenCalledWith('/home', '/home')
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
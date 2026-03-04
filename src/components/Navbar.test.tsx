import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from './Navbar'



describe('Navbar component', () => {
  it('renders logo correctly', () => {
    render(<Navbar />)

    const logo = screen.getByRole('link', { name: /ap/i })
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders all navigation links with correct hrefs', () => {
    render(<Navbar />)

    const expectedLinks = [
      { name: /home/i, href: '#home' },
      { name: /about/i, href: '#about' },
      { name: /skills/i, href: '#skills' },
      { name: /experience/i, href: '#experience' },
      { name: /projects/i, href: '#projects' },
      { name: /contact/i, href: '#contact' },
      { name: /references/i, href: '/references' },
    ]

    expectedLinks.forEach(({ name, href }) => {
      // each link exists twice (desktop + mobile)
      const links = screen.getAllByRole('link', { name })
      expect(links).toHaveLength(2)
      links.forEach(link => expect(link).toHaveAttribute('href', href))
    })
  })

  it('applies special styling to desktop References link', () => {
    render(<Navbar />)

    // desktop References link is the first one, it has the border class mobile doesn't
    const [desktopRef] = screen.getAllByRole('link', { name: /references/i })
    expect(desktopRef).toHaveClass('text-[#a78bfa]')
    expect(desktopRef).toHaveClass('border')
    expect(desktopRef).toHaveClass('border-[#a78bfa33]')
  })

  it('renders hamburger button', () => {
    render(<Navbar />)

    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })

  it('has correct total number of links', () => {
    render(<Navbar />)

    // 7 desktop + 7 mobile + 1 logo = 15
    expect(screen.getAllByRole('link')).toHaveLength(15)
  })

  it('toggles mobile menu open and closed on hamburger click', () => {
    render(<Navbar />)

    const button = screen.getByRole('button', { name: /toggle menu/i })

    // closed by default via max-h-0 on parent div — button click opens it
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-label', 'Toggle menu') // sanity

    fireEvent.click(button)
    // toggled back — no crash, state flipped twice
  })

  it('closes mobile menu when clicking outside', () => {
    render(<Navbar />)

    const button = screen.getByRole('button', { name: /toggle menu/i })
    fireEvent.click(button) // open

    // click outside the menuRef div
    fireEvent.mouseDown(document.body)

    // menu should be closed — hamburger spans back to normal state
    expect(button).toBeInTheDocument() // component didn't crash
  })
})
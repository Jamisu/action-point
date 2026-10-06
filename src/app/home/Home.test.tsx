import { render, screen } from '@testing-library/react'
import Home from '@/app/home/page'

describe('Home section', () => {
  it('renders Home text content', () => {
    render(<Home />)

    expect(screen.getByText('Senior Architect & UI Engineer')).toBeInTheDocument()
    expect(screen.getByText('15 years from Flash to Next.js')).toBeInTheDocument()
  })

  it('renders multi-line tagline', () => {
    render(<Home />)

    expect(screen.getByText(/I bridge the gap between complex logic and human UX/)).toBeInTheDocument()
  })

  it('renders CTA buttons with correct links', () => {
    render(<Home />)

    const projectsLink = screen.getByRole('link', { name: /view projects/i })
    const contactLink = screen.getByRole('link', { name: /contact me/i })

    expect(projectsLink).toHaveAttribute('href', '/projects')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('has correct section anchor', () => {
    const { container } = render(<Home />)

    const homeAnchor = container.querySelector('#home')
    expect(homeAnchor).toBeInTheDocument()
  })
})

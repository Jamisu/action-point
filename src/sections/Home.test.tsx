import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home section', () => {
  it('renders Home text content', () => {
    render(<Home />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Front-End Engineer')).toBeInTheDocument()
    expect(screen.getByText('13 years. Flash to Next.js.')).toBeInTheDocument()
  })

  it('renders multi-line tagline', () => {
    render(<Home />)

    expect(screen.getByText(/I build things that work/)).toBeInTheDocument()
  })

  it('renders CTA buttons with correct links', () => {
    render(<Home />)

    const projectsLink = screen.getByRole('link', { name: /view projects/i })
    const contactLink = screen.getByRole('link', { name: /contact me/i })

    expect(projectsLink).toHaveAttribute('href', '#projects')
    expect(contactLink).toHaveAttribute('href', '#contact')
  })

  it('has correct section anchor', () => {
    const { container } = render(<Home />)

    const section = container.querySelector('section#home')
    expect(section).toBeInTheDocument()
  })
})

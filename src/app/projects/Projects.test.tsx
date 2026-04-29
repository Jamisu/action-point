import { render, screen, fireEvent } from '@testing-library/react'
import ProjectsPage from '@/app/projects/page'

const mockProjects = [
  {
    title: 'Project Alpha',
    date: '2024',
    shortDesc: 'A short description of Alpha.',
    fullDesc: 'A full description of Alpha.',
    stack: ['React', 'TypeScript'],
    image: '/alpha.png',
    url: 'https://alpha.example.com',
  },
  {
    title: 'Project Beta',
    date: '2023',
    shortDesc: 'A short description of Beta.',
    fullDesc: 'A full description of Beta.',
    stack: ['Next.js'],
    image: '',
    url: '',
  },
]

jest.mock('@/contexts/DataContext', () => ({
  useData: () => ({
    projects: mockProjects,
    jobs: [],
    skillGroups: [],
    contact: [],
    isLoading: false,
    error: null,
  }),
}))

jest.mock('@/components/ui/ProjectTile', () => ({
  __esModule: true,
  default: ({ project, onClick }: { project: { title: string }; onClick: () => void }) => (
    <div data-testid="project-tile" onClick={onClick}>
      {project.title}
    </div>
  ),
}))

jest.mock('@/components/ui/ProjectModal', () => ({
  __esModule: true,
  default: ({ project, onClose }: { project: { title: string }; onClose: () => void }) => (
    <div data-testid="project-modal">
      <span>{project.title}</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}))

describe('ProjectsPage', () => {
  it('renders the section heading', () => {
    render(<ProjectsPage />)
    expect(screen.getByText("What I've Built")).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders a tile for each project', () => {
    render(<ProjectsPage />)
    const tiles = screen.getAllByTestId('project-tile')
    expect(tiles).toHaveLength(mockProjects.length)
    expect(screen.getByText('Project Alpha')).toBeInTheDocument()
    expect(screen.getByText('Project Beta')).toBeInTheDocument()
  })

  it('does not render the modal initially', () => {
    render(<ProjectsPage />)
    expect(screen.queryByTestId('project-modal')).not.toBeInTheDocument()
  })

  it('opens the modal when a tile is clicked', () => {
    render(<ProjectsPage />)
    fireEvent.click(screen.getByText('Project Alpha'))
    expect(screen.getByTestId('project-modal')).toBeInTheDocument()
    expect(screen.getByText('Project Alpha', { selector: 'span' })).toBeInTheDocument()
  })

  it('closes the modal when onClose is called', () => {
    render(<ProjectsPage />)
    fireEvent.click(screen.getByText('Project Alpha'))
    expect(screen.getByTestId('project-modal')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Close'))
    expect(screen.queryByTestId('project-modal')).not.toBeInTheDocument()
  })

  it('shows the correct project in the modal', () => {
    render(<ProjectsPage />)
    fireEvent.click(screen.getByText('Project Beta'))
    expect(screen.getByText('Project Beta', { selector: 'span' })).toBeInTheDocument()
  })

  it('replaces the modal when a different tile is clicked', () => {
    render(<ProjectsPage />)
    fireEvent.click(screen.getByText('Project Alpha'))
    fireEvent.click(screen.getByText('Project Beta'))
    expect(screen.getByText('Project Beta', { selector: 'span' })).toBeInTheDocument()
    expect(screen.queryByText('Project Alpha', { selector: 'span' })).not.toBeInTheDocument()
  })
})

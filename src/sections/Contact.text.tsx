import { render, screen } from '@testing-library/react'
import Skills from './Skills'

jest.mock('@/components/ui/TooltipContext', () => ({
  useTooltip: () => ({ show: jest.fn(), hide: jest.fn() }),
}))

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
  }))
})

describe('Skills section', () => {
  // tests coming...
})
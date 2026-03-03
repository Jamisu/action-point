import '@testing-library/jest-dom'

// Make Jest globals available to TypeScript
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
    }
  }
}
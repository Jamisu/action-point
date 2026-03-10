'use client'

import { createContext, useContext, useRef } from 'react'
import { navLinks } from '@/lib/navLinks'

interface TransitionContextType {
  getDirection: () => number
  setDirection: (from: string, to: string) => void
}

const TransitionContext = createContext<TransitionContextType>({
  getDirection: () => 1,
  setDirection: () => {},
})

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const directionRef = useRef(1)

  const setDirection = (from: string, to: string) => {
    const order = navLinks.map(l => l.href)
    const fromIndex = order.indexOf(from)
    const toIndex = order.indexOf(to)
    directionRef.current = toIndex > fromIndex ? 1 : -1
  }

  const getDirection = () => directionRef.current

  return (
    <TransitionContext.Provider value={{ getDirection, setDirection }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => useContext(TransitionContext)

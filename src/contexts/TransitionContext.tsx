'use client'

import { createContext, useContext, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { navLinks } from '@/lib/navLinks'

interface TransitionContextType {
  direction: number
  isExiting: boolean
  isFirstLoad: boolean
  navigate: (href: string, currentPath: string) => void
}

const TransitionContext = createContext<TransitionContextType>({
  direction: 1,
  isExiting: false,
  isFirstLoad: true,
  navigate: () => {},
})

export const DURATION_EXIT = 100
export const DURATION_ENTER = 500

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirection] = useState(1)
  const [isExiting, setIsExiting] = useState(false)
  const router = useRouter()
  const isFirstLoad = useRef(true)

  function navigate(href: string, currentPath: string) {
    isFirstLoad.current = false
    const order = navLinks.map(l => l.href)
    const dir = order.indexOf(href) > order.indexOf(currentPath) ? 1 : -1
    setDirection(dir)
    setIsExiting(true)
    setTimeout(() => {
      setIsExiting(false)
      router.push(href)
    }, isExiting ? DURATION_EXIT : DURATION_ENTER)
  }

  return (
    <TransitionContext.Provider value={{ direction, isExiting, isFirstLoad: isFirstLoad.current, navigate }}>
      {children}
    </TransitionContext.Provider>
  )
}

export const useTransition = () => useContext(TransitionContext)

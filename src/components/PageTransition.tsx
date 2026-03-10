'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/lib/navLinks'
import { useRef } from 'react'

function getDirection(from: string, to: string) {
  const order = navLinks.map(l => l.href)
  const fromIndex = order.indexOf(from)
  const toIndex = order.indexOf(to)
  return toIndex > fromIndex ? 1 : -1
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prevPath = useRef(pathname)
  const direction = getDirection(prevPath.current, pathname)
  prevPath.current = pathname

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useTransition } from '@/contexts/TransitionContext'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { getDirection } = useTransition()
  const direction = getDirection()

  return (
    <motion.div
      key={pathname}
      initial={{ x: direction > 0 ? '100%' : '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}

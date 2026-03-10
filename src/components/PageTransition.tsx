'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useTransition } from '@/contexts/TransitionContext'
import { DURATION_EXIT, DURATION_ENTER } from '@/contexts/TransitionContext'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { direction, isExiting, isFirstLoad } = useTransition()

  return (
    <motion.div
      key={pathname}
      initial={{ x: isFirstLoad ? 0 : (direction > 0 ? '100%' : '-100%') }}
      animate={{ x: isExiting ? (direction > 0 ? '-100%' : '100%') : 0 }}
      transition={{ duration: isExiting ? DURATION_EXIT/1000 : DURATION_ENTER/1000, ease: 'easeInOut' }}
      style={{ width: '100%', minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  )
}

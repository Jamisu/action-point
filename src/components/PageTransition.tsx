'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useTransition } from '@/contexts/TransitionContext'
import { DURATION_ENTER } from '@/contexts/TransitionContext'

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { isFirstLoad } = useTransition()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: isFirstLoad ? 1 : 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION_ENTER / 1000, ease: 'easeOut' }}
      // style={{ width: '100%', minHeight: '100vh', transformOrigin: 'center' }}
    >
      {children}
    </motion.div>
  )
}

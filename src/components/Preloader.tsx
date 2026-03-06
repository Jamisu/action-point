'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useData } from '@/contexts/DataContext'

export default function Preloader() {
  const { isLoading } = useData()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      // slight delay so the spin completes gracefully before exit
      const timer = setTimeout(() => setVisible(false), 400)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0e1a]"
      style={{
        opacity: isLoading ? 1 : 0,
        transform: isLoading ? 'scale(1)' : 'scale(0.95)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* GLOW */}
      <div className="absolute w-40 h-40 rounded-full bg-[#4f9cf9]/10 blur-2xl" />

      {/* SPINNING LOGO */}
      <div
        style={{
          animation: isLoading ? 'spin 1.2s linear infinite' : undefined,
          transition: 'opacity 0.4s ease',
        }}
      >
        <Image
          src="/AP_logo.png"
          alt="Loading..."
          width={80}
          height={80}
          priority
        />
      </div>

      {/* LOADING TEXT */}
      <p
        className="absolute bottom-[calc(50%-80px)] font-mono text-xs uppercase tracking-widest text-[#4f9cf9]/60"
        style={{
          opacity: isLoading ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        Loading
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

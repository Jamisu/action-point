'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useData } from '@/contexts/DataContext'

export default function Preloader() {
  const { isLoading } = useData()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!isLoading) {
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

      <div className="absolute w-40 h-40 rounded-full bg-[#4f9cf9]/10 blur-2xl" />
      
      <div style={{ animation: isLoading ? 'flip 1.4s ease-in-out infinite' : undefined }}>
        <Image
          src="/AP_logo.png"
          alt="Loading..."
          width={80}
          height={80}
          priority
        />
      </div>

      <style>{`
        @keyframes flip {
          0%   { transform: scaleX(1); }
          45%  { transform: scaleX(0); }
          50%  { transform: scaleX(0); }
          95%  { transform: scaleX(1); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  )
}

'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
  text?: string
  color?: string
  opacity?: number
  position?: 'top' | 'bottom' | 'left' | 'right'
  children: React.ReactNode
}

export default function Tooltip({
  text = '',
  color = '#94a3b8',
  opacity = 1,
  position = 'bottom',
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState({ top: 0, left: 0 })
  const anchorRef = useRef<HTMLDivElement>(null)

  const updateCoords = useCallback(() => {
    if (!anchorRef.current) return
    const rect = anchorRef.current.getBoundingClientRect()
    const GAP = 8

    switch (position) {
      case 'top':
        setCoords({ top: rect.top + window.scrollY - GAP, left: rect.left + rect.width / 2 })
        break
      case 'bottom':
        setCoords({ top: rect.bottom + window.scrollY + GAP, left: rect.left + rect.width / 2 })
        break
      case 'left':
        setCoords({ top: rect.top + window.scrollY + rect.height / 2, left: rect.left - GAP })
        break
      case 'right':
        setCoords({ top: rect.top + window.scrollY + rect.height / 2, left: rect.right + GAP })
        break
    }
  }, [position])

  useEffect(() => {
    if (visible) updateCoords()
  }, [visible, updateCoords])

  if (!text) return <>{children}</>

  const transformMap: Record<string, string> = {
    top:    'translate(-50%, -100%)',
    bottom: 'translate(-50%, 0)',
    left:   'translate(-100%, -50%)',
    right:  'translate(0, -50%)',
  }

  return (
    <>
      <div
        ref={anchorRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="contents"
      >
        {children}
      </div>

      {visible && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'absolute',
            top: coords.top,
            left: coords.left,
            transform: transformMap[position],
            opacity,
            color,
            zIndex: 9999,
            pointerEvents: 'none',
          }}
          className="px-2 py-1 rounded bg-[#0f1e35] border border-[#1f2d45] font-mono text-[10px] uppercase tracking-widest whitespace-nowrap"
        >
          {text}
        </div>,
        document.body
      )}
    </>
  )
}

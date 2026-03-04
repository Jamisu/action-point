'use client'

import { createContext, useContext, useState, useCallback } from 'react'

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface TooltipState {
  text: string
  x: number
  y: number
  visible: boolean
  position: 'top' | 'bottom' | 'left' | 'right'
  color: string
}

interface TooltipContextValue {
  show: (text: string, anchor: DOMRect, options?: Partial<Pick<TooltipState, 'position' | 'color'>>) => void
  hide: () => void
}

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const TooltipContext = createContext<TooltipContextValue | null>(null)

// ─── PROVIDER ────────────────────────────────────────────────────────────────

const GAP = 8
const DEFAULT_COLOR = '#94a3b8'

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TooltipState>({
    text: '',
    x: 0,
    y: 0,
    visible: false,
    position: 'top',
    color: DEFAULT_COLOR,
  })

  const show = useCallback((
    text: string,
    anchor: DOMRect,
    options?: Partial<Pick<TooltipState, 'position' | 'color'>>
  ) => {
    const position = options?.position ?? 'bottom'
    const color = options?.color ?? DEFAULT_COLOR

    let x = 0
    let y = 0

    switch (position) {
      case 'top':
        x = anchor.left + anchor.width / 2
        y = anchor.top - GAP
        break
      case 'bottom':
        x = anchor.left + anchor.width / 2
        y = anchor.bottom + GAP
        break
      case 'left':
        x = anchor.left - GAP
        y = anchor.top + anchor.height / 2
        break
      case 'right':
        x = anchor.right + GAP
        y = anchor.top + anchor.height / 2
        break
    }

    setState({ text, x, y, visible: true, position, color })
  }, [])

  const hide = useCallback(() => {
    setState(prev => ({ ...prev, visible: false }))
  }, [])

  const transformMap: Record<string, string> = {
    top:    'translate(-50%, -100%)',
    bottom: 'translate(-50%, 0)',
    left:   'translate(-100%, -50%)',
    right:  'translate(0, -50%)',
  }

  return (
    <TooltipContext.Provider value={{ show, hide }}>
      {children}

      {/* SINGLE ALWAYS-MOUNTED TOOLTIP — top of DOM, never re-mounts */}
      <div
        role="tooltip"
        style={{
          position: 'fixed',
          top: state.y,
          left: state.x,
          transform: transformMap[state.position],
          color: state.color,
          opacity: state.visible ? 1 : 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.15s ease',
        }}
        className="px-2 py-1 rounded bg-[#0f1e35] border border-[#1f2d45] font-mono text-[10px] uppercase tracking-widest whitespace-nowrap"
      >
        {state.text}
      </div>
    </TooltipContext.Provider>
  )
}

// ─── HOOK ─────────────────────────────────────────────────────────────────────

export function useTooltip() {
  const ctx = useContext(TooltipContext)
  if (!ctx) throw new Error('useTooltip must be used inside <TooltipProvider>')
  return ctx
}

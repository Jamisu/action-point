'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTooltip } from '@/contexts/TooltipContext'
import { useTransition } from '@/contexts/TransitionContext'
import { navLinks } from '@/lib/navLinks'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { show, hide } = useTooltip()
  const { navigate } = useTransition()
  const refTooltipRef = useRef<HTMLLIElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleNavClick(href: string) {
    if (href === pathname) return
    navigate(href, pathname)
  }

  return (
    <div ref={menuRef}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0a0e1a]/90 to-transparent backdrop-blur-sm border-b-2 border-[#1f2d45]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image src="/AP_logo.png" alt="AP Logo" width={40} height={40} priority />
          </Link>
          
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li
                key={link.label}
                ref={link.label === 'References' ? refTooltipRef : undefined}
                onMouseEnter={() => {
                  if (link.label === 'References' && refTooltipRef.current) {
                    show('Live CheatSheets', refTooltipRef.current.getBoundingClientRect(), { position: 'bottom' })
                  }
                }}
                onMouseLeave={hide}
              >
                {link.label === 'References' ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm uppercase tracking-widest transition-colors text-[#a78bfa] hover:text-[#a78bfa] border border-[#a78bfa33] px-3 py-1 rounded hover:border-[#a78bfa]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`font-mono text-sm uppercase tracking-widest transition-colors bg-transparent border-none cursor-pointer
                    ${pathname === link.href
                      ? 'text-[#fbbf24]'
                      : 'text-[#64748b] hover:text-[#4f9cf9]'
                    }`}>
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#4f9cf9] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#4f9cf9] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#4f9cf9] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <ul className="flex flex-col px-6 pb-6 gap-4 border-t border-[#1f2d45]">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.label === 'References' ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-sm uppercase tracking-widest transition-colors text-[#a78bfa] hover:text-[#a78bfa] border border-[#a78bfa33] px-3 py-1 rounded hover:border-[#a78bfa]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    onClick={() => { setIsOpen(false); handleNavClick(link.href) }}
                    className="font-mono text-sm uppercase tracking-widest transition-colors hover:text-[#4f9cf9] text-[#64748b] bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

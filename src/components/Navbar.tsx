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
  const [theme, setTheme] = useState<'day' | 'night'>('night')
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

  function changeTheme() {
    const newTheme = theme === 'night' ? 'day' : 'night'
    document.documentElement.setAttribute('data-theme', newTheme)
    setTheme(newTheme)
  }

  return (
    <div ref={menuRef}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[var(--c-bg)]/90 to-transparent backdrop-blur-sm border-b-2 border-[var(--c-surf)]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image src="/AP_logo.png" alt="AP Logo" width={40} height={40} priority />
          </Link>
          
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li
                key={link.label}
                ref={link.label === 'Code Refs' ? refTooltipRef : undefined}
                onMouseEnter={() => {
                  if (link.label === 'Code Refs' && refTooltipRef.current) {
                    show('Live CheatSheets', refTooltipRef.current.getBoundingClientRect(), { position: 'bottom' })
                  }
                }}
                onMouseLeave={hide}
              >
                {link.label === 'Code Refs' ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm uppercase tracking-widest transition-colors text-[var(--c-purple)] hover:text-[var(--c-purple)] border border-[var(--c-purple)33] px-3 py-1 rounded hover:border-[var(--c-purple)]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`font-mono text-sm uppercase tracking-widest transition-colors bg-transparent border-none cursor-pointer
                    ${pathname === link.href
                      ? 'text-[var(--c-yellow)]'
                      : 'text-[var(--c-muted2)] hover:text-[var(--c-blue)]'
                    }`}>
                    {link.label}
                  </button>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={changeTheme}
                className="relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-300 border border-[var(--c-surf)] bg-[var(--c-bg2)]"
                aria-label="Toggle theme"
              >
                <span className={`absolute left-1 w-4 h-4 rounded-full transition-all duration-300 
                  ${theme === 'day' 
                    ? 'translate-x-6 bg-[var(--c-yellow)]' 
                    : 'translate-x-0 bg-[var(--c-blue)]'
                  }`} 
                />
              </button>
            </li>
          </ul>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[var(--c-blue)] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[var(--c-blue)] transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[var(--c-blue)] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <ul className="flex flex-col px-6 pb-6 gap-4 border-t border-[var(--c-surf)]">
            {navLinks.map((link) => (
              <li key={link.label}>
                {link.label === 'Code Refs' ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="font-mono text-sm uppercase tracking-widest transition-colors text-[var(--c-purple)] hover:text-[var(--c-purple)] border border-[var(--c-purple)33] px-3 py-1 rounded hover:border-[var(--c-purple)]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    onClick={() => { setIsOpen(false); handleNavClick(link.href) }}
                    className="font-mono text-sm uppercase tracking-widest text-slate-400 drop-shadow-sm bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}

            <li>
              <button
                onClick={changeTheme}
                className="relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-300 border border-[var(--c-surf)] bg-[var(--c-bg2)]"
                aria-label="Toggle theme"
              >
                <span className={`absolute left-1 w-4 h-4 rounded-full transition-all duration-300 
                  ${theme === 'day' 
                    ? 'translate-x-6 bg-[var(--c-yellow)]' 
                    : 'translate-x-0 bg-[var(--c-blue)]'
                  }`} 
                />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

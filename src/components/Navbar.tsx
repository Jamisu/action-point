'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
  { label: 'References', href: '/references' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={menuRef}>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0a0e1a]/90 to-transparent backdrop-blur-sm border-b-2 border-[#1f2d45]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">

          {/* LOGO */}
          <Link
            href="/"
            className="font-mono font-bold text-xl text-[#4f9cf9] tracking-widest hover:text-white transition-colors"
          >
            AP
          </Link>

          {/* DESKTOP NAV */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`font-mono text-sm uppercase tracking-widest transition-colors hover:text-[#4f9cf9]
                    ${link.label === 'References'
                      ? 'text-[#a78bfa] hover:text-[#a78bfa] border border-[#a78bfa33] px-3 py-1 rounded hover:border-[#a78bfa]'
                      : 'text-[#64748b]'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* HAMBURGER */}
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

        {/* MOBILE MENU */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
          <ul className="flex flex-col px-6 pb-6 gap-4 border-t border-[#1f2d45]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-mono text-sm uppercase tracking-widest transition-colors hover:text-[#4f9cf9]
                    ${link.label === 'References'
                      ? 'text-[#a78bfa]'
                      : 'text-[#64748b]'
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}

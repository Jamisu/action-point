'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const lines = [
  { text: 'John Doe', delay: 0, className: 'text-5xl md:text-7xl font-bold font-sans text-white tracking-tight' },
  { text: 'Front-End Engineer', delay: 150, className: 'text-xl md:text-2xl font-mono text-[#4f9cf9] tracking-widest uppercase' },
  { text: '13 years. Flash to Next.js.', delay: 300, className: 'text-base md:text-lg text-[#64748b] font-mono' },
  { text: 'I build things that work, look right,\nand make sense to humans.', delay: 450, className: 'text-base md:text-lg text-[#94a3b8]' },
]

interface HomeLine {
  text: string
  delay: number
  className: string
}

function AnimatedLine({ text, delay, className }: HomeLine) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-all duration-700 ${
        visible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 translate-y-2'
      }`}
    >
      <p className={className}>
        {text.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < text.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  )
}

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center px-6 pt-16 bg-gradient-to-b from-[#0a0e1a] to-[#0f1e35]"//261F34 150D26
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 text-center">

        {/* ANIMATED LINES */}
        {lines.map((line) => (
          <AnimatedLine key={line.text} {...line} />
        ))}

        {/* DIVIDER */}
        <div className="w-16 h-0.5 bg-[#4f9cf9] opacity-50 mx-auto" />

        {/* CTA BUTTONS */}
        <div
          className="flex gap-4 flex-wrap justify-center opacity-0"
          style={{ animation: 'fadeIn 0.7s ease 0.6s both' }}
        >
          <Link
            href="#projects"
            className="font-mono text-sm uppercase tracking-widest px-6 py-3 bg-[#4f9cf9] text-[#0a0e1a] font-bold rounded hover:bg-white transition-colors focus:outline-none"
          >
            View Projects
          </Link>
          <Link
            href="#contact"
            className="font-mono text-sm uppercase tracking-widest px-6 py-3 border border-[#4f9cf9] text-[#4f9cf9] rounded hover:bg-[#4f9cf9] hover:text-[#0a0e1a] transition-colors"
          >
            Contact Me
          </Link>
        </div>

      </div>
    </section>
  )
}

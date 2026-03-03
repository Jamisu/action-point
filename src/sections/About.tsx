'use client'

import { useEffect, useState } from 'react'

// Lines to display in the about section header
const aboutText = "Front-end engineer, 13+ years. Flash to React to Next.js — I've survived every paradigm shift and came out sharper. I build fast, think in systems, and actually understand users — psychology degree, not just a buzzword. If you need someone who codes with precision and thinks beyond the ticket, we should talk."

interface TypeWriterProps {
  text: string
  speed?: number
  className?: string
}

// Typewriter effect — renders text char by char
function TypeWriter({ text, speed = 30, className }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index >= text.length) return

    const timer = setTimeout(() => {
      setDisplayed(prev => prev + text[index])
      setIndex(prev => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [index])

  return (
    <p className={className}>
      {displayed}
      {/* Blinking cursor — disappears when done */}
      {index < text.length && (
        <span className="animate-pulse text-[#4f9cf9]">|</span>
      )}
    </p>
  )
}

export default function About() {
  // Trigger typewriter only when section is visible
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('about')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center px-6 py-24"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">

        {/* SECTION LABEL */}
        <p className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9]">
          About Me
        </p>

        {/* SECTION TITLE */}
        <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">
          Who I Am
        </h2>

        {/* DIVIDER */}
        <div className="w-16 h-0.5 bg-[#4f9cf9] opacity-50" />

        {/* TYPEWRITER TEXT — starts when section scrolls into view */}
        {isVisible && (
          <TypeWriter
            text={aboutText}
            speed={25}
            className="font-mono text-base md:text-lg text-[#94a3b8] leading-relaxed max-w-2xl"
          />
        )}

      </div>
    </section>
  )
}
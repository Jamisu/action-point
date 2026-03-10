'use client'

import { useEffect, useState } from 'react'

const aboutText = "Front-end engineer, 13+ years. Flash to React to Next.js — I've survived every paradigm shift and came out sharper. I was reading about backpropagation and Turing at 16, long before AI became a LinkedIn keyword. I hold a Master's in Psychology — which means I actually understand the humans using what I build. I don't panic at legacy codebases; I bring a shovel and a flashlight. If you need someone who codes with precision, thinks in systems, and operates well beyond the ticket — we should talk."

interface TypeWriterProps {
  text: string
  speed?: number
  className?: string
}

function TypeWriter({ text, speed = 20, className }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setDisplayed('')
    setIndex(0)
  }, [text])

  useEffect(() => {
    if (index >= text.length) return

    const timer = setTimeout(() => {
      setDisplayed((prev) => prev + text[index])
      setIndex((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timer)
  }, [index, speed, text])

  return (
    <p className={className}>
      {displayed}
      {index < text.length && <span className="animate-pulse text-[#4f9cf9]">|</span>}
    </p>
  )
}

export default function AboutPage({ speed = 20 }: { speed?: number }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    const section = document.getElementById('about')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      id="about"
      className="min-h-screen flex flex-col justify-start px-6 pb-24 bg-gradient-to-b from-[#0f1e35] to-[#0a0e1a]"
      style={{ paddingTop: 'clamp(120px, 15vw, 220px)' }}
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
        <p className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9]">About Me</p>

        <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">Who I Am</h2>

        <div className="w-16 h-0.5 bg-[#4f9cf9] opacity-50" />

        <div className="min-h-[320px] md:min-h-[240px]">
          {isVisible && (
            <TypeWriter
              text={aboutText}
              speed={speed}
              className="font-mono text-base md:text-lg text-[#94a3b8] leading-relaxed max-w-2xl"
            />
          )}
        </div>
      </div>
    </div>
  )
}
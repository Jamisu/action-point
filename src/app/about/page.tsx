'use client'

import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/lib/useIntersectionObserver'

// const aboutText = "Front-end engineer, 15+ years. Flash to React to Next.js — I've survived every paradigm shift and came out sharper. In recent years I worked independently on AI integration projects involving LLM APIs and model cost analysis. I hold a Master's in Psychology, which informs how I approach UX and team communication. I don't panic at legacy codebases; I bring a shovel and a flashlight. If you need someone who codes with precision, thinks in systems, and operates well beyond the ticket — we should talk."
const aboutText = "Senior Front-end Architect with 15+ years of experience. From the high-fidelity days of Flash to modern React and Next.js, I’ve mastered the evolution of the web. Recently, I’ve been building at the intersection of AI and efficiency, specializing in LLM integrations and model cost optimization. With a Master’s in Psychology, I bridge the gap between complex systems and human-centric UX. I don’t just clear tickets—I stabilize legacy codebases with a shovel and a flashlight. If you need precision, systems thinking, and a developer who truly owns the product—let’s talk.";

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
      {index < text.length && <span className="animate-pulse text-[var(--c-blue)]">|</span>}
    </p>
  )
}

export default function AboutPage({ speed = 20 }: { speed?: number }) {
  const { ref, isVisible } = useIntersectionObserver()

  return (
    
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="min-h-screen flex flex-col justify-start px-6 pb-24"
        style={{ paddingTop: 'clamp(120px, 15vw, 220px)' }}
      >
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--c-blue)]">About Me</p>

          <h2 className="font-sans text-4xl md:text-5xl font-bold var(--c-heading)">Who I Am</h2>

          <div className="w-16 h-0.5 bg-[var(--c-blue)] opacity-50" />

          <div className="min-h-[320px] md:min-h-[240px]">
            {isVisible && (
              <TypeWriter
                text={aboutText}
                speed={speed}
                className="font-mono text-base md:text-lg text-[var(--c-muted)] leading-relaxed max-w-2xl"
              />
            )}
          </div>
        </div>
      </div>

  )
}
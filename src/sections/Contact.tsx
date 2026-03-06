'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { MapPin, Mail, Phone, Linkedin, Github, LucideProps } from 'lucide-react'
import { useData } from '@/contexts/DataContext'

const Map = dynamic(() => import('@/components/ui/ContactMap'), { ssr: false })

// ─── ICON MAP ────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Mail,
  Phone,
  Linkedin,
  Github,
}

// ─── ANIMATED MAP ────────────────────────────────────────────────────────────

function AnimatedMap() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="flex-1 min-h-[400px] rounded-2xl overflow-hidden border border-[#1f2d45] opacity-70"
      style={{
        opacity: visible ? 0.7 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      <Map />
    </div>
  )
}

// ─── ANIMATED CARD ───────────────────────────────────────────────────────────

function AnimatedCard({
  icon, label, value, href, index, visible
}: {
  icon: string
  label: string
  value: string
  href: string
  index: number
  visible: boolean
}) {
  const Icon = iconMap[icon]

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 p-4 rounded-xl border border-[#1f2d45] bg-[#0a0e1a]/60 hover:border-[#4f9cf9]/40 hover:bg-[#0f1e35] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(32px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      {Icon && (
        <Icon
          size={20}
          className="text-[#4f9cf9] shrink-0 group-hover:scale-110 transition-transform duration-300"
        />
      )}
      <div className="flex flex-col min-w-0">
        <span className="font-mono text-xs uppercase tracking-widest text-[#64748b] mb-0.5">
          {label}
        </span>
        <span className="font-mono text-sm text-[#cbd5e1] truncate group-hover:text-white transition-colors duration-300">
          {value}
        </span>
      </div>
    </a>
  )
}

// ─── ANIMATED INFO PANEL ─────────────────────────────────────────────────────

function AnimatedInfo() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { contact } = useData()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="flex flex-col justify-center gap-6 lg:w-80">

      {/* LOCATION */}
      <div
        className="flex items-center gap-3"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(32px)',
          transition: 'opacity 0.5s ease 0s, transform 0.5s ease 0s',
        }}
      >
        <MapPin size={16} className="text-[#4f9cf9] shrink-0" />
        <span className="font-mono text-sm text-[#94a3b8] uppercase tracking-widest">
          Kraków, Poland
        </span>
      </div>

      <div
        className="w-full h-px bg-[#1f2d45]"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease 0.05s',
        }}
      />

      {/* CONTACT CARDS */}
      {contact.map((link, i) => (
        <AnimatedCard
          key={link.label}
          {...link}
          index={i + 1}
          visible={visible}
        />
      ))}

    </div>
  )
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center px-6 py-24 bg-gradient-to-b from-[#0f1e35] to-[#0a0e1a]"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col gap-16">

        {/* HEADER */}
        <div className="flex flex-col gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-[#4f9cf9]">
            Contact
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-bold text-white">
            Get In Touch
          </h2>
          <div className="w-16 h-0.5 bg-[#4f9cf9] opacity-50" />
        </div>

        {/* MAP + INFO */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          <AnimatedMap />
          <AnimatedInfo />
        </div>

      </div>
    </section>
  )
}

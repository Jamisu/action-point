'use client'

import dynamic from 'next/dynamic'
import { Mail, Phone, Github, Linkedin, MapPin } from 'lucide-react'

// ─── LEAFLET MAP — no SSR (window undefined on server) ───────────────────────

const Map = dynamic(() => import('@/components/ui/ContactMap'), { ssr: false })

// ─── CONTACT LINKS ───────────────────────────────────────────────────────────

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'any@email.com',
    href: 'mailto:any@email.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+48 666 666 666',
    href: 'tel:+48666666666',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/yourprofile',
    href: 'https://linkedin.com/in/yourprofile',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Jamisu',
    href: 'https://github.com/Jamisu',
  },
]

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

        {/* CONTENT — map + info side by side */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* MAP */}
          <div className="flex-1 min-h-[400px] rounded-2xl overflow-hidden border border-[#1f2d45]">
            <Map />
          </div>

          {/* INFO CARD */}
          <div className="flex flex-col justify-center gap-6 lg:w-80">

            {/* LOCATION */}
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[#4f9cf9] shrink-0" />
              <span className="font-mono text-sm text-[#94a3b8] uppercase tracking-widest">
                Kraków, Poland
              </span>
            </div>

            <div className="w-full h-px bg-[#1f2d45]" />

            {/* LINKS */}
            {links.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 p-4 rounded-xl border border-[#1f2d45] bg-[#0a0e1a]/60 hover:border-[#4f9cf9]/40 hover:bg-[#0f1e35] transition-all duration-300"
              >
                <Icon
                  size={20}
                  className="text-[#4f9cf9] shrink-0 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#64748b] mb-0.5">
                    {label}
                  </span>
                  <span className="font-mono text-sm text-[#cbd5e1] truncate group-hover:text-white transition-colors duration-300">
                    {value}
                  </span>
                </div>
              </a>
            ))}

          </div>
        </div>

      </div>
    </section>
  )
}

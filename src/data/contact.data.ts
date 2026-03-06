import { Mail, Phone, Github, Linkedin } from 'lucide-react'

export interface ContactLink {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  value: string
  href: string
}

export const links: ContactLink[] = [
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

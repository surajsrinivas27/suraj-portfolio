import type { SocialLink, NavItem } from './types'

/** Edit these — the only personal links in the whole site. */
export const PERSONAL = {
  name: 'Suraj S',
  title: 'AI/ML Engineer | Full-Stack Developer',
  tagline: 'I build intelligent systems that connect AI, engineering, and real-world problem solving.',
  email: 'surajprafulla27@gmail.com',
  github: 'https://github.com/surajsrinivas27',
  linkedin: 'https://www.linkedin.com/', // Existing configured URL — do not invent a profile URL
  resumeUrl: '/assets/Suraj_S_Resume.pdf',
} as const

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: PERSONAL.github, icon: 'github' },
  { label: 'LinkedIn', href: PERSONAL.linkedin, icon: 'linkedin' },
  { label: 'Email', href: `mailto:${PERSONAL.email}`, icon: 'mail' },
]

export const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export const RESUME_LABEL = 'Download Resume'
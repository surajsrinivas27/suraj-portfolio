export type TechCategory =
  | 'Programming'
  | 'AI / ML'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Tools'
  | 'Design'

export interface Skill {
  name: string
  category: TechCategory
  /** Editable proficiency label — kept as text, not a fake percentage. */
  proficiency: string
}

export interface Project {
  id: string
  title: string
  category: string
  shortDescription: string
  problemSolved: string
  technicalApproach: string
  stack: string[]
  contribution: string
  accent: string
  accentSoft: string
  github?: string
  live?: string
  context?: string
  featured?: boolean
}

export interface Experience {
  year: string
  title: string
  org: string
  description: string
  tags: string[]
}

export interface Certification {
  name: string
  issuer: string
  year: string
  link?: string
  /** ISO date string (YYYY-MM-DD) used for chronological ordering. */
  date?: string
  /** Free-form category label used for filtering. */
  category?: string
  /** e.g. "Elite", "Foundations Associate", "Certificate of Completion". */
  level?: string
  /** Optional verification URL (OpenAI, NxtWave, etc.). */
  verifyUrl?: string
  /** Optional detail block (NPTEL scores, Oracle ID, etc.). */
  details?: string[]
  /** Optional technologies covered (NxtWave, etc.). */
  technologies?: string[]
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface NavItem {
  label: string
  href: string
}
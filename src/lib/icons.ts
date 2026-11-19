import { Github, Linkedin, Mail, ArrowRight, Download, MousePointer2, Sparkles, Zap, Brain, Code, Globe, Shield, Database, Wrench, Laptop, Terminal, Award, Building2, GraduationCap, Users, HeartPulse, Server, BrainCircuit, Send, ExternalLink, Menu, X } from 'lucide-react'

export const ICONS = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  arrowRight: ArrowRight,
  download: Download,
  mousePointer2: MousePointer2,
  sparkles: Sparkles,
  zap: Zap,
  brain: Brain,
  code: Code,
  globe: Globe,
  shield: Shield,
  database: Database,
  wrench: Wrench,
  laptop: Laptop,
  terminal: Terminal,
  award: Award,
  building2: Building2,
  graduationCap: GraduationCap,
  users: Users,
  heartPulse: HeartPulse,
  server: Server,
  brainCircuit: BrainCircuit,
  send: Send,
  externalLink: ExternalLink,
  menu: Menu,
  x: X,
} as const

export type IconKey = keyof typeof ICONS

export function getIcon(key: IconKey) {
  return ICONS[key]
}
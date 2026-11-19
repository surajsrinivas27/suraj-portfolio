'use client'

import {
  Github, Linkedin, Mail, ArrowRight, Download, MousePointer2,
  Sparkles, Zap, Brain, Code, Globe, Shield, Database, Wrench,
  Laptop, Terminal, Award, Building2, GraduationCap, Users,
  HeartPulse, Server, BrainCircuit, Send, ExternalLink, Menu, X
} from 'lucide-react'
import { forwardRef, type SVGAttributes } from 'react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<SVGAttributes<SVGSVGElement>>> = {
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
}

export interface IconProps extends SVGAttributes<SVGSVGElement> {
  name: keyof typeof iconMap
  size?: number | string
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, className, size = 24, ...props }, ref) => {
    const Component = iconMap[name]
    if (!Component) {
      console.warn(`Icon "${name}" not found`)
      return null
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ref = ref
    return (
      <Component
        className={cn(className)}
        width={size}
        height={size}
        {...props}
      />
    )
  }
)

Icon.displayName = 'Icon'
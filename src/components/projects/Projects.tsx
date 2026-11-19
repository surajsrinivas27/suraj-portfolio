'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { PROJECTS } from '@/lib/projects'
import { Section, SectionHeader, Reveal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

const projectIcons: Record<string, string> = {
  'AI Security | Agent Authorization': 'shield',
  'AI/ML | Financial Fraud Detection': 'zap',
  'AI | Interview & Exam Preparation': 'brainCircuit',
  'Backend Engineering | Healthcare': 'server',
  'AI | Social Impact | Marketplace': 'users',
}

export function Projects() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const featuredProjects = PROJECTS.filter((p) => p.featured)
  const otherProjects = PROJECTS.filter((p) => !p.featured)

  return (
    <Section id="projects" padding="xl">
      <SectionHeader
        label="Featured Work"
        title="Featured Projects."
        description="Selected projects demonstrating technical depth across AI security, financial intelligence, interview preparation, and social impact."
        align="left"
      />

      <Reveal direction="up" delay={0.1}>
        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isFeatured
              hoveredId={hoveredId}
              onHover={(id) => setHoveredId(id)}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.3}>
        <div className="pt-12">
          <h3 className="font-semibold text-text-primary mb-6">Additional Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                hoveredId={hoveredId}
                onHover={(id) => setHoveredId(id)}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

interface ProjectCardProps {
  project: typeof PROJECTS[0]
  index: number
  isFeatured?: boolean
  hoveredId: string | null
  onHover: (id: string | null) => void
  prefersReducedMotion: boolean
}

function ProjectCard({
  project,
  index,
  isFeatured = false,
  hoveredId,
  onHover,
  prefersReducedMotion,
}: ProjectCardProps) {
  const isHovered = hoveredId === project.id
  const iconName = projectIcons[project.category] || 'brainCircuit'
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseEnter = () => onHover(project.id)
    const handleMouseLeave = () => onHover(null)
    const el = cardRef.current
    if (el) {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    }
    return () => {
      if (el) {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [project.id, onHover])

  const glowStyle = isHovered && !prefersReducedMotion
    ? { boxShadow: `0 0 60px ${project.accent}40`, borderColor: project.accent }
    : {}

  if (isFeatured) {
    return (
      <motion.div
        ref={cardRef}
        className="relative group"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * (index + 1), duration: 0.6 }}
      >
        <Card
          variant="gradient"
          padding="lg"
          className="relative overflow-hidden"
          style={glowStyle as React.CSSProperties}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ opacity: isHovered ? 1 : 0 }} />

          <div className="relative z-10 grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: project.accentSoft }}>
                  <Icon name={iconName} className="w-6 h-6" style={{ color: project.accent }} />
                </div>
                <div>
                  <Badge variant="accent" size="sm" className="mb-2" style={{ backgroundColor: project.accent }}>
                    {project.category}
                  </Badge>
                  {project.context && (
                    <Badge variant="soft" size="sm" className="max-w-full truncate">{project.context}</Badge>
                  )}
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary">
                {project.title}
              </h3>

              <p className="text-text-secondary leading-relaxed text-lg">
                {project.shortDescription}
              </p>

              <div className="space-y-3 pt-4 border-t border-border/50">
                <DetailRow label="Problem" value={project.problemSolved} />
                <DetailRow label="Approach" value={project.technicalApproach} />
                <DetailRow label="Contribution" value={project.contribution} />
              </div>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, i) => (
                  <Badge key={i} variant="outline" size="sm" style={{ borderColor: project.accent + '40' }}>
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {project.github && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Icon name="github" size={16} />
                      Repository
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <Icon name="externalLink" size={16} />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <VisualPreview
                project={project}
                isHovered={isHovered}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          </div>
        </Card>

        {isHovered && !prefersReducedMotion && (
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-[2.5rem] blur-3xl -z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
    >
      <Card
        variant="glass"
        padding="lg"
        hover
        className="relative overflow-hidden h-full"
        style={glowStyle as React.CSSProperties}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ opacity: isHovered ? 1 : 0 }} />

        <div className="relative z-10 space-y-5 h-full flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: project.accentSoft }}>
                <Icon name={iconName} className="w-5 h-5" style={{ color: project.accent }} />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <Badge variant="accent" size="sm" style={{ backgroundColor: project.accent }}>
                  {project.category.split('|')[0].trim()}
                </Badge>
              </div>
            </div>
          </div>

          <p className="text-text-secondary leading-relaxed text-sm flex-1">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech, i) => (
              <Badge key={i} variant="outline" size="sm" style={{ borderColor: project.accent + '30' }}>
                {tech}
              </Badge>
            ))}
            {project.stack.length > 5 && (
              <Badge variant="soft" size="sm">+{project.stack.length - 5} more</Badge>
            )}
          </div>

          <div className="pt-4 border-t border-border/50 flex flex-wrap gap-2">
            {project.github && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm">
                  <Icon name="github" size={14} />
                  Code
                </a>
              </Button>
            )}
            {project.live && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm">
                  <Icon name="externalLink" size={14} />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-text-secondary/70 uppercase tracking-wider">{label}</span>
      <span className="text-text-secondary text-sm leading-relaxed">{value}</span>
    </div>
  )
}

function VisualPreview({
  project,
  isHovered,
  prefersReducedMotion,
}: {
  project: typeof PROJECTS[0]
  isHovered: boolean
  prefersReducedMotion: boolean
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }

  return (
    <div
      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface border border-border/50"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !prefersReducedMotion && setMousePos({ x: 0, y: 0 })}
      style={{
        transform: prefersReducedMotion || !isHovered ? 'none' : `perspective(1000px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`,
        transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent" style={{ background: `radial-gradient(ellipse at ${50 + mousePos.x * 30}% ${50 + mousePos.y * 30}%, ${project.accent}20 0%, transparent 70%)` }} />

      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="text-center opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: prefersReducedMotion ? 'none' : `translateZ(40px) ${isHovered ? 'scale(1.05)' : ''}` }}>
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: project.accentSoft }}>
            <Icon name="brainCircuit" className="w-10 h-10" style={{ color: project.accent }} />
          </div>
          <p className="text-text-secondary text-sm max-w-xs mx-auto">{project.shortDescription}</p>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex gap-2">
          {project.stack.slice(0, 4).map((tech, i) => (
            <motion.span
              key={i}
              className="px-2 py-1 text-xs rounded bg-background/80 backdrop-blur text-text-secondary border border-border/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  )
}
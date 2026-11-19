'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { SKILLS, SKILL_CATEGORIES } from '@/lib/skills'
import { Section, SectionHeader, Reveal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'

const categoryIcons: Record<string, string> = {
  'Programming': 'code',
  'AI / ML': 'brain',
  'Frontend': 'laptop',
  'Backend': 'globe',
  'Database': 'database',
  'Tools': 'wrench',
}

const categoryColors: Record<string, { primary: string; soft: string }> = {
  'Programming': { primary: '#F97316', soft: 'rgba(249, 115, 22, 0.15)' },
  'AI / ML': { primary: '#FB923C', soft: 'rgba(251, 146, 60, 0.15)' },
  'Frontend': { primary: '#FDBA74', soft: 'rgba(253, 186, 116, 0.15)' },
  'Backend': { primary: '#EA580C', soft: 'rgba(234, 88, 12, 0.15)' },
  'Database': { primary: '#FF8C00', soft: 'rgba(255, 140, 0, 0.15)' },
  'Tools': { primary: '#F97316', soft: 'rgba(249, 115, 22, 0.15)' },
}

function MarqueeItem({ skill, color }: { skill: string; color: string }) {
  return (
    <motion.span
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border text-text-secondary hover:text-primary hover:border-primary/50 transition-all whitespace-nowrap"
      whileHover={{ scale: 1.05, y: -2 }}
      style={{ borderColor: color + '80' }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      {skill}
    </motion.span>
  )
}

function Marquee({ skills, color, paused }: { skills: string[]; color: string; paused: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.scrollWidth)
    }
  }, [skills])

  return (
    <div className="overflow-hidden relative" style={{ width: '100%' }}>
      <motion.div
        ref={ref}
        className="flex gap-3 will-change-transform"
        animate={paused ? {} : { x: [-width, 0] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        style={{ width: 'max-content' }}
      >
        {skills.map((skill, i) => (
          <MarqueeItem key={i} skill={skill} color={color} />
        ))}
        {skills.map((skill, i) => (
          <MarqueeItem key={`${i}-clone`} skill={skill} color={color} />
        ))}
      </motion.div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  )
}

export function Skills() {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Escape') {
        setPaused(!paused)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [paused])

  return (
    <Section id="skills" padding="xl">
      <SectionHeader
        label="Technical Arsenal"
        title="Technologies I Work With."
        description="Organized by domain. Proficiency labels are self-assessed and editable — no fabricated percentages."
        align="left"
      />

      <Reveal direction="up" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SKILL_CATEGORIES.map((category) => {
            const categorySkills = SKILLS.filter((s) => s.category === category)
            const iconName = categoryIcons[category] || 'code'
            const colors = categoryColors[category] || categoryColors['Programming']

            return (
              <Card key={category} variant="glass" padding="lg" hover className="group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.soft }}>
                      <Icon name={iconName} className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <h3 className="font-semibold text-text-primary">{category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge
                        key={skill.name}
                        variant="outline"
                        size="sm"
                        className="group-hover:border-primary/50 group-hover:text-primary transition-colors cursor-default"
                        style={{ borderColor: colors.primary + '40' }}
                      >
                        {skill.name}
                        <span className="ml-1.5 text-xs opacity-60">({skill.proficiency})</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.3}>
        <div className="space-y-8">
          {SKILL_CATEGORIES.map((category) => {
            const categorySkills = SKILLS.filter((s) => s.category === category)
            const colors = categoryColors[category] || categoryColors['Programming']
            const iconName = categoryIcons[category] || 'code'

            return (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.soft }}>
                    <Icon name={iconName} className="w-4 h-4" style={{ color: colors.primary }} />
                  </div>
                  <h4 className="font-medium text-text-primary">{category}</h4>
                  <span className="text-sm text-text-secondary">({categorySkills.length} skills)</span>
                </div>
                <Marquee
                  skills={categorySkills.map((s) => s.name)}
                  color={colors.primary}
                  paused={paused}
                />
              </div>
            )
          })}
        </div>
      </Reveal>

      {!paused && (
        <motion.div
          className="fixed bottom-6 right-6 text-text-secondary/50 text-xs px-3 py-1.5 rounded-full bg-surface border border-border"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          Press Space to pause marquees
        </motion.div>
      )}
    </Section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { EXPERIENCES, CERTIFICATIONS } from '@/lib/experience'
import { Section, SectionHeader, Reveal, StaggeredReveal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'

const experienceIcons: Record<string, string> = {
  'IBM Z Datathon Participant': 'zap',
  'Sarvam AI Hackathon Participant': 'shield',
  'Smart India Hackathon Participant': 'users',
  'B.E. Artificial Intelligence & Machine Learning': 'graduationCap',
}

export function Experience() {
  return (
    <Section id="experience" padding="xl">
      <SectionHeader
        label="Experience & Hackathons"
        title="Experience & Hackathons."
        description="Competitive engineering, collaborative development, and academic foundation — building under constraints and shipping results."
        align="left"
      />

      <Reveal direction="up" delay={0.1}>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <StaggeredReveal stagger={0.12} delay={0.1} direction="right">
            {EXPERIENCES.map((exp, index) => (
              <ExperienceItem key={index} exp={exp} />
            ))}
          </StaggeredReveal>
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.4}>
        <div className="mt-20 pt-12 border-t border-border">
          <h3 className="font-semibold text-text-primary mb-8">Certifications & Learning</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              >
                <Card variant="glass" padding="lg" hover className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <Icon name="award" className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary mb-1">{cert.name}</h4>
                      <p className="text-text-secondary text-sm">{cert.issuer}</p>
                      <p className="text-text-secondary/60 text-sm mt-1">{cert.year}</p>
                    </div>
                  </div>
                  {cert.link && (
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:text-secondary transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      Verify <span className="text-xs">&rarr;</span>
                    </motion.a>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function ExperienceItem({ exp }: { exp: typeof EXPERIENCES[0] }) {
  const iconName = experienceIcons[exp.title] || 'code'

  return (
    <motion.div className="relative pl-16 pb-12 last:pb-0">
      <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-primary bg-background z-10" style={{ boxShadow: '0 0 0 4px #090909' }} />
      <div className="absolute left-[6px] top-[6px] w-8 h-8 rounded-full bg-primary/20 blur-md" />

      <Card variant="glass" padding="lg" hover className="relative">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
            <Icon name={iconName} className="w-6 h-6 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className="font-medium text-text-primary">{exp.title}</span>
              <span className="text-text-secondary/60">·</span>
              <span className="text-text-secondary">{exp.org}</span>
              <span className="text-text-secondary/60">·</span>
              <Badge variant="soft" size="sm">{exp.year}</Badge>
            </div>

            <p className="text-text-secondary leading-relaxed mb-4">{exp.description}</p>

            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag, i) => (
                <Badge key={i} variant="outline" size="sm" style={{ borderColor: 'rgba(249, 115, 22, 0.3)' }}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CERTIFICATIONS, BADGES, CERT_CATEGORIES } from '@/lib/certifications'
import { Section, SectionHeader, Reveal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

export function Certifications() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredCerts = activeCategory === 'all'
    ? CERTIFICATIONS
    : activeCategory === 'professional-badges'
      ? []
      : CERTIFICATIONS.filter((c) => {
          const catId = c.category?.toLowerCase().replace(/\s+/g, '-')
          return catId === activeCategory
        })

  const displayBadges = activeCategory === 'all' || activeCategory === 'professional-badges'

  return (
    <Section id="certifications" padding="xl">
      <SectionHeader
        label="Credentials"
        title="Certifications & Badges."
        description="Formal certifications and digital badges showcasing continuous learning in AI/ML, cybersecurity, and full-stack development."
        align="center"
      />

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CERT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all border',
              activeCategory === cat.id
                ? 'bg-primary text-background border-primary'
                : 'bg-surface/50 text-text-secondary border-border hover:border-primary/50'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCerts.map((cert) => (
            <motion.div
              key={cert.name}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="glass" padding="lg" className="h-full flex flex-col group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <Badge variant="soft" size="sm" className="text-primary border-primary/20">{cert.issuer}</Badge>
                    {cert.date && <span className="text-[10px] text-text-secondary/60 font-mono uppercase">{cert.year}</span>}
                  </div>
                  <h4 className="font-display text-xl font-semibold text-text-primary group-hover:text-primary transition-colors leading-tight">
                    {cert.name}
                  </h4>
                  {cert.details && (
                    <ul className="space-y-1">
                      {cert.details.map((detail, i) => (
                        <li key={i} className="text-xs text-text-secondary flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary/40" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                  {cert.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cert.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-surface border border-border text-text-secondary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative z-10 mt-6 pt-4 border-t border-border/50 flex justify-between items-center">
                  <span className="text-[10px] font-medium text-text-secondary/80 uppercase tracking-widest">{cert.level}</span>
                  <div className="flex items-center gap-3">
                    {cert.verifyUrl && (
                      <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors" title="Verify Credential">
                        <Icon name="shield" size={16} />
                      </a>
                    )}
                    {cert.link && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-background transition-all" title="View Certificate">
                        <Icon name="externalLink" size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {displayBadges && BADGES.length > 0 && (
        <div className="mt-24">
          <Reveal direction="up">
            <h3 className="text-2xl font-display font-semibold text-text-primary mb-10 text-center">Professional Learning Badges</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {BADGES.map((badge) => (
                <Card key={badge.name} variant="glass" padding="lg" hover className="group">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-surface flex items-center justify-center border border-border group-hover:border-primary transition-all duration-500 shadow-inner overflow-hidden">
                      <Icon name="award" className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="space-y-1">
                      <Badge variant="soft" size="sm" className="bg-blue-500/10 text-blue-400 border-blue-500/20">IBM SkillsBuild</Badge>
                      <h5 className="font-display text-lg font-semibold text-text-primary group-hover:text-primary transition-colors leading-snug">
                        {badge.name}
                      </h5>
                      <p className="text-xs text-text-secondary">Issued {badge.issued}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      )}
    </Section>
  )
}

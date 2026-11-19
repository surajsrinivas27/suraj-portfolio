'use client'

import { motion } from 'framer-motion'
import { PERSONAL, SOCIAL_LINKS, RESUME_LABEL } from '@/lib/social'
import { Section, Reveal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function Contact() {
  return (
    <Section id="contact" padding="lg" variant="narrow">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-4xl blur-3xl" />

        <Reveal direction="up" delay={0.1}>
          <div className="text-center mb-10">
            <p className="text-sm font-medium tracking-widest uppercase text-primary mb-3">Get In Touch</p>
            <h2 className="font-display text-display-md sm:text-display-lg font-semibold text-text-primary mb-4">
              Have an interesting idea? Let's build it.
            </h2>
            <div className="space-y-1">
              <p className="font-display text-xl font-medium text-text-primary">Suraj S</p>
              <p className="text-text-secondary">AI/ML Engineer | Full-Stack Developer</p>
              <a href={`mailto:${PERSONAL.email}`} className="block text-sm text-primary hover:text-highlight transition-colors">
                {PERSONAL.email}
              </a>
              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-text-secondary">
                <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  GitHub: surajsrinivas27
                </a>
                <span className="text-text-secondary/40">|</span>
                <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {SOCIAL_LINKS.map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              >
                <Card variant="glass" padding="lg" hover className="text-center h-full group">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                    <Icon name={social.icon} className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{social.label}</h3>
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary text-sm hover:text-primary transition-colors inline-flex items-center gap-1"
                    whileHover={{ x: 4 }}
                  >
                    {social.label === 'Email' ? PERSONAL.email : 'Connect'}
                    <Icon name="externalLink" size={12} />
                  </motion.a>
                </Card>
              </motion.div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <Card variant="gradient" padding="xl" className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />

            <div className="relative z-10 text-center space-y-6">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-text-primary">
                Prefer a direct conversation?
              </h3>
              <p className="text-text-secondary max-w-lg mx-auto">
                I'm always open to discussing new projects, research collaborations, or engineering challenges.
                Send me an email and let's explore what we can build together.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="primary" asChild>
                  <a href={`mailto:${PERSONAL.email}?subject=Collaboration Inquiry&body=Hi Suraj,%0A%0AI came across your portfolio and...`} className="flex items-center gap-2">
                    <Icon name="send" size={20} />
                    Start a Conversation
                  </a>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <a href={PERSONAL.resumeUrl} download="Suraj_S_Resume.pdf" className="flex items-center gap-2">
                    <Icon name="download" size={20} />
                    {RESUME_LABEL}
                  </a>
                </Button>
                <Button size="lg" variant="ghost" asChild>
                  <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Icon name="github" size={20} />
                    GitHub Profile
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-4 border-t border-border/50">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-text-secondary/60 hover:text-primary hover:bg-surface transition-all"
                    whileHover={{ scale: 1.15, y: -2 }}
                    aria-label={social.label}
                  >
                    <Icon name={social.icon} size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
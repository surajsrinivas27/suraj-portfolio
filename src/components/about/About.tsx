'use client'

import { PERSONAL } from '@/lib/social'
import { Section, SectionHeader, Reveal, StaggeredReveal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'

const highlights = [
  { icon: 'brain', label: 'Artificial Intelligence & ML', desc: 'Building intelligent systems, ML models, and AI-powered applications' },
  { icon: 'code', label: 'Full-Stack Development', desc: 'End-to-end product engineering from API design to polished interfaces' },
  { icon: 'zap', label: 'AI-Powered Products', desc: 'Integrating LLMs, RAG pipelines, and generative AI into real workflows' },
  { icon: 'globe', label: 'API & Backend Engineering', desc: 'Scalable REST APIs, microservices, and cloud-native architectures' },
  { icon: 'shield', label: 'AI Security & Automation', desc: 'Authorization gateways, prompt injection defense, intelligent automation' },
  { icon: 'sparkles', label: 'Hackathon & Collaboration', desc: 'Rapid prototyping, cross-functional teams, competitive engineering' },
]

export function About() {
  return (
    <Section id="about" padding="xl">
      <SectionHeader
        label="About Me"
        title="Beyond the Code."
        description="A concise professional introduction highlighting the intersection of AI research, engineering rigor, and product thinking."
        align="left"
      />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="space-y-8">
          <Reveal direction="up" delay={0.1}>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed">
              {PERSONAL.tagline}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-text-secondary leading-relaxed">
              Currently a third-year AI/ML Engineering student at Global Academy of Technology, Bengaluru.
              My work sits at the intersection of machine learning research, full-stack product engineering,
              and AI safety — building systems that are not just intelligent, but trustworthy and deployable.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="text-text-secondary leading-relaxed">
              I've engineered authorization infrastructure for autonomous AI agents (AgentShield),
              real-time graph intelligence for financial fraud detection (SafePay Sentinel),
              and an AI-powered interview and exam preparation platform (Prep-Pilot AI),
              alongside artisan empowerment (ShilpDwaar).
              Each project reflects a commitment to solving real problems with technical depth.
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.4}>
            <div className="flex flex-wrap gap-2">
              <Badge variant="soft">AI/ML Engineering</Badge>
              <Badge variant="soft">Full-Stack Development</Badge>
              <Badge variant="soft">AI Security</Badge>
              <Badge variant="soft">Generative AI</Badge>
              <Badge variant="soft">System Design</Badge>
              <Badge variant="soft">Research-Oriented</Badge>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          <StaggeredReveal stagger={0.08} delay={0.2} direction="up">
            {highlights.map(({ icon, label, desc }) => (
              <Card
                key={label}
                variant="glass"
                padding="md"
                hover
                className="group"
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:border-primary/60 group-hover:bg-primary/20 transition-all duration-300">
                    <Icon name={icon} className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">{label}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Card>
            ))}
          </StaggeredReveal>
        </div>
      </div>
    </Section>
  )
}
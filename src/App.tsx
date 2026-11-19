'use client'

import { motion } from 'framer-motion'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/about/About'
import { Skills } from '@/components/skills/Skills'
import { Projects } from '@/components/projects/Projects'
import { Experience } from '@/components/experience/Experience'
import { Certifications } from '@/components/certifications/Certifications'
import { Contact } from '@/components/contact/Contact'

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-text-primary"
    >
      <Navigation />
      <main id="main-content" className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )
}
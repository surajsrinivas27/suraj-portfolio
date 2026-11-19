'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, PERSONAL, SOCIAL_LINKS, RESUME_LABEL } from '@/lib/social'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 100], [0, 1])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <motion.nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border py-3'
          : 'bg-transparent py-6'
      )}
      style={{ opacity: scrolled ? 1 : 1 }}
    >
      <div className="container-custom flex items-center justify-between">
        <motion.a
          href="#"
          className="font-display text-xl font-semibold text-text-primary hover:text-primary transition-colors"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          SURAJ S
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="text-text-secondary hover:text-primary transition-colors text-sm font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              whileHover={{ y: -2 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {SOCIAL_LINKS.slice(0, 2).map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-text-secondary hover:text-primary hover:bg-surface transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              aria-label={social.label}
            >
              <Icon name={social.icon} size={18} />
            </motion.a>
          ))}
          <Button variant="primary" size="sm" asChild>
            <a href={PERSONAL.resumeUrl} download="Suraj_S_Resume.pdf">
              {RESUME_LABEL}
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-xl text-text-primary hover:bg-surface transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <Icon name="x" size={24} /> : <Icon name="menu" size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border"
        >
          <div className="py-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-lg font-medium text-text-secondary hover:text-primary hover:bg-surface rounded-xl transition-all"
                whileHover={{ x: 8 }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
            <div className="flex flex-wrap gap-2 px-4 pt-4">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-text-secondary hover:text-primary hover:bg-surface transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon name={social.icon} size={18} />
                  <span>{social.label}</span>
                </motion.a>
              ))}
            </div>
            <div className="px-4 pt-2">
              <Button variant="primary" size="sm" className="w-full" asChild>
                <a href={PERSONAL.resumeUrl} download="Suraj_S_Resume.pdf">
                  {RESUME_LABEL}
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{
          opacity: scrolled ? 1 : 0,
          scaleX: prefersReducedMotion ? 1 : y,
          transformOrigin: 'left center',
        }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.nav>
  )
}
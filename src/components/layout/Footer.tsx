'use client'

import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '@/lib/social'
import { Icon } from '@/components/ui/Icon'

export function Footer() {
  return (
    <footer className="relative border-t border-border pt-16 pb-8">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="container-custom relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <motion.span
              className="font-display text-xl font-semibold text-text-primary"
              whileHover={{ scale: 1.02 }}
            >
              SURAJ S
            </motion.span>
            <motion.div
              className="w-px h-6 bg-gradient-to-b from-primary to-secondary"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <p className="text-text-secondary text-sm">
              Designed & Built by Suraj S
            </p>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl text-text-secondary/60 hover:text-primary hover:bg-surface transition-all"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label={social.label}
              >
                <Icon name={social.icon} size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t border-border/50 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-text-secondary/60 text-sm">
            &copy; {new Date().getFullYear()} Suraj S. All rights reserved.
          </p>
          <p className="text-text-secondary/40 text-xs mt-1">
            Built with React, Three.js, Framer Motion & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
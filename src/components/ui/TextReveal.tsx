'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

export interface TextRevealProps extends Omit<HTMLMotionProps<'p'>, 'children'> {
  children: ReactNode
  split?: 'words' | 'chars' | 'lines'
  delay?: number
  className?: string
}

const splitVariants = {
  words: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
  },
  chars: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.02 } },
  },
  lines: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  },
}

export function TextReveal({
  children,
  split = 'words',
  delay = 0,
  className,
  ...props
}: TextRevealProps) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    return <motion.p className={cn(className)} {...props}>{children}</motion.p>
  }

  const text = typeof children === 'string' ? children : String(children)
  const splitText = (() => {
    switch (split) {
      case 'words':
        return text.split(' ').map((w, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={splitVariants.words}
          >
            {w}
            {' '}
          </motion.span>
        ))
      case 'chars':
        return text.split('').map((c, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={splitVariants.chars}
          >
            {c === ' ' ? ' ' : c}
          </motion.span>
        ))
      case 'lines':
        return text.split('\n').map((l, i) => (
          <motion.div key={i} variants={splitVariants.lines}>
            {l}
          </motion.div>
        ))
    }
  })()

  return (
    <motion.p
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: split === 'chars' ? 0.02 : 0.05,
          },
        },
      }}
      {...props}
    >
      {splitText}
    </motion.p>
  )
}

export interface RevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
}

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  className,
}: RevealProps) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  const directionMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredReveal({
  children,
  delay = 0,
  stagger = 0.1,
  direction = 'up',
  className,
  ...props
}: {
  children: ReactNode
  delay?: number
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    return <div className={cn(className)}>{children}</div>
  }

  const childArray = Array.isArray(children) ? children : [children]

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      {...props}
    >
      {childArray.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: direction === 'up' ? 40 : -40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
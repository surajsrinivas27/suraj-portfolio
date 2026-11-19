'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode, type MouseEvent } from 'react'
import { PERSONAL, SOCIAL_LINKS, RESUME_LABEL } from '@/lib/social'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { PortraitBackground } from '@/components/three/PortraitBackground'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 })

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.18)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.22)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="motion-reduce:transform-none"
    >
      {children}
    </motion.div>
  )
}

function PortraitFrame() {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 140,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 140,
    damping: 20,
  })

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      className="relative h-full w-full [perspective:1200px] motion-reduce:hidden"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="h-full w-full [transform-style:preserve-3d]"
      >
        <PortraitCard />
      </motion.div>
    </div>
  )
}

function PortraitCard() {
  return (
    <motion.div
      className="relative h-full w-full"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Rim glow */}
      <div className="absolute -inset-6 rounded-[3rem] bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.35),transparent_60%)] blur-2xl" />
      <div className="absolute -inset-px rounded-[2.25rem] bg-[linear-gradient(140deg,rgba(249,115,22,0.9),rgba(253,186,116,0.25)_35%,rgba(255,255,255,0.06)_55%,rgba(251,146,60,0.7))] opacity-70" />

      {/* Glass frame */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface/60 p-2 backdrop-blur-xl shadow-[0_30px_80px_-20px_rgba(249,115,22,0.45)]">
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
          <img
            src="/assets/suraj-profile.jpg"
            alt="Portrait of Suraj S"
            width={880}
            height={1100}
            className="h-full w-full object-cover object-top"
            fetchPriority="high"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(9,9,9,0.55)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(249,115,22,0.22),transparent_45%)]" />
        </div>
      </div>

      {/* Glass badge */}
      <motion.div
        className="glass absolute -left-4 top-1/3 hidden rounded-2xl px-4 py-3 sm:flex items-center gap-3"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.7, ease: EASE }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Icon name="brainCircuit" size={18} />
        </span>
        <div className="leading-tight">
          <p className="text-xs text-text-secondary">Focused on</p>
          <p className="text-sm font-medium text-text-primary">Applied AI Systems</p>
        </div>
      </motion.div>

      <motion.div
        className="glass absolute -right-3 bottom-16 hidden rounded-2xl px-4 py-3 sm:flex items-center gap-3"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Icon name="code" size={18} />
        </span>
        <div className="leading-tight">
          <p className="text-xs text-text-secondary">End to end</p>
          <p className="text-sm font-medium text-text-primary">ML → Product</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section
      className="relative isolate min-h-screen w-full overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Backdrop layers */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_70%_35%,rgba(249,115,22,0.13),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_40%_40%_at_10%_80%,rgba(251,146,60,0.07),transparent_70%)]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-custom relative flex min-h-screen items-center pt-28 pb-20 lg:pt-24">
        <motion.div
          className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* LEFT — introduction */}
          <div className="max-w-2xl">
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Hello, I&apos;m Suraj
            </motion.span>

            <motion.h1
              id="hero-heading"
              variants={item}
              className="mt-6 font-display text-4xl font-semibold leading-[1.07] tracking-tight text-text-primary sm:text-5xl lg:text-[3.9rem]"
            >
              Building{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-highlight bg-clip-text text-transparent">
                Intelligence.
              </span>
              <br />
              Engineering{' '}
              <span className="bg-gradient-to-r from-highlight via-secondary to-primary bg-clip-text text-transparent">
                Impact.
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 font-display text-lg font-medium text-text-primary/90 sm:text-xl"
            >
              AI/ML Engineer
              <span className="mx-2 text-primary/70">|</span>
              Full-Stack Developer
            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
            >
              I build intelligent systems that connect AI, engineering, and real-world
              problem solving — from data pipelines and models to the interfaces people
              actually use.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <Button size="lg" variant="primary" asChild>
                  <a href="#projects" className="group flex items-center gap-2">
                    Explore My Projects
                    <Icon
                      name="arrowRight"
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button size="lg" variant="secondary" asChild>
                  <a href={PERSONAL.resumeUrl} download="Suraj_S_Resume.pdf" className="flex items-center gap-2">
                    <Icon name="download" size={20} />
                    {RESUME_LABEL}
                  </a>
                </Button>
              </Magnetic>
            </motion.div>

            <motion.div variants={item} className="mt-10 flex items-center gap-5">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface/60 text-text-secondary backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
                  whileHover={{ y: -3, scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon name={social.icon} size={19} />
                </motion.a>
              ))}
              <a
                href={`mailto:${PERSONAL.email}`}
                className="ml-1 hidden text-sm text-text-secondary transition-colors hover:text-primary sm:inline"
              >
                {PERSONAL.email}
              </a>
            </motion.div>
          </div>

          {/* RIGHT — 3D behind portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            className="relative mx-auto w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[520px]"
          >
            {/* 3D composition sits behind + around the portrait */}
            <div className="pointer-events-none absolute -inset-16 z-0 sm:-inset-24 lg:-inset-28">
              <PortraitBackground className="h-full w-full" />
            </div>

            {/* Portrait */}
            <div className="relative z-10 aspect-[4/5] w-full">
              <div className="absolute inset-0 motion-reduce:hidden">
                <PortraitFrame />
              </div>
              <div className="absolute inset-0 hidden motion-reduce:block">
                <PortraitCard />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-secondary/60 transition-colors hover:text-primary md:flex"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-label="Scroll to explore"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.2em]">Scroll to explore</span>
        <span className="relative h-9 w-5 rounded-full border border-border">
          <motion.span
            className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
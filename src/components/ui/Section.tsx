'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'narrow' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  children: ReactNode
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    { className, variant = 'default', padding = 'xl', children, ...props },
    ref
  ) => {
    const variants = {
      default: 'container-custom',
      narrow: 'container-custom max-w-4xl',
      full: 'w-full px-4 sm:px-6 lg:px-8',
    }

    const paddings = {
      none: '',
      sm: 'py-8 sm:py-12',
      md: 'py-12 sm:py-16 lg:py-20',
      lg: 'py-16 sm:py-20 lg:py-24',
      xl: 'py-20 sm:py-28 lg:py-36',
      '2xl': 'py-24 sm:py-32 lg:py-40',
    }

    return (
      <section
        ref={ref}
        className={cn(variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 sm:mb-16',
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl',
        className
      )}
    >
      {label && (
        <span className="inline-block mb-4 text-sm font-medium tracking-widest uppercase text-primary">
          {label}
        </span>
      )}
      <h2 className="font-display text-display-md sm:text-display-lg lg:text-display-xl font-semibold text-text-primary mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
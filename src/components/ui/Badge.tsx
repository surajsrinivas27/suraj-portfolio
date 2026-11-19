'use client'

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'soft' | 'outline'
  size?: 'sm' | 'md'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = 'default', size = 'md', children, ...props },
    ref
  ) => {
    const variants = {
      default: 'bg-primary/15 text-primary border border-primary/30',
      accent: 'bg-primary text-background',
      soft: 'bg-surface text-text-secondary border border-border',
      outline: 'bg-transparent text-text-secondary border border-border',
    }

    const sizes = {
      sm: 'px-2.5 py-0.5 text-xs rounded-full',
      md: 'px-3 py-1 text-sm rounded-xl',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
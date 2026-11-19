'use client'

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'gradient'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  children: ReactNode
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-surface border border-border',
      elevated: 'bg-surface border border-border shadow-[0_4px_24px_rgba(0,0,0,0.4)]',
      glass: 'glass',
      gradient: 'gradient-border bg-surface border-transparent',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    }

    const hoverStyles = hover
      ? 'transition-all duration-500 hover:border-primary/50 hover:shadow-glow'
      : 'transition-all duration-300'

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl',
          variants[variant],
          paddings[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardHeader.displayName = 'CardHeader'

export type CardContentProps = HTMLAttributes<HTMLDivElement>

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  )
)

CardContent.displayName = 'CardContent'
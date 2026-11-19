'use client'

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'asChild'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'magnetic'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  asChild?: boolean
  children: ReactNode
  href?: string
}

const baseStyles =
  'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden'

const variants = {
  primary:
    'bg-primary text-background hover:bg-secondary hover:shadow-glow active:scale-[0.98]',
  secondary:
    'bg-transparent border border-border text-text-primary hover:bg-surface hover:border-primary/50 active:scale-[0.98]',
  ghost:
    'bg-transparent text-text-primary hover:bg-surface hover:text-primary active:scale-[0.98]',
  magnetic:
    'bg-primary text-background hover:bg-secondary hover:shadow-glow-lg relative',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-xl gap-2',
  md: 'px-6 py-3 text-base rounded-2xl gap-2.5',
  lg: 'px-8 py-4 text-lg rounded-3xl gap-3',
}

function renderButton(
  {
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    asChild = false,
    children,
    href,
    type,
    onClick,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const isLink = asChild && !!href

  const commonClassName = cn(baseStyles, variants[variant], sizes[size], className)

  if (isLink) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { form, formAction, formEncType, formMethod, formNoValidate, formTarget, ...linkProps } = props as Record<string, unknown>
    return (
      <a
        href={href!}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={commonClassName}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        {...linkProps}
      >
        <span className={cn('relative z-10')}>
          {children}
        </span>
      </a>
    )
  }

  return (
    <button
      ref={ref}
      className={commonClassName}
      disabled={disabled || isLoading}
      type={type || 'button'}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className={cn('relative z-10', isLoading && 'opacity-0')}>
        {children}
      </span>
    </button>
  )
}

export const Button = forwardRef(renderButton)
Button.displayName = 'Button'
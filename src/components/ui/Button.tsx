'use client'

import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  asChild?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent text-text-inverse font-medium',
    'hover:bg-accent-hover',
    'active:scale-[0.98]',
    'shadow-glow hover:shadow-glow',
  ].join(' '),
  secondary: [
    'border border-border text-text-primary bg-transparent',
    'hover:border-border-strong hover:bg-bg-elevated',
  ].join(' '),
  ghost: ['text-text-primary bg-transparent', 'hover:bg-bg-elevated'].join(' '),
  link: [
    'text-accent bg-transparent p-0 h-auto inline-flex items-center gap-1',
    'hover:text-accent-hover underline-offset-4 hover:underline',
  ].join(' '),
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm rounded-md gap-1.5',
  md: 'h-10 px-5 text-sm rounded-lg gap-2',
  lg: 'h-12 px-7 text-base rounded-lg gap-2',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
          variant !== 'link' && sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }

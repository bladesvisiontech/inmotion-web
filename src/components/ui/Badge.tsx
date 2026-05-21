import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning'
}

const variantClasses = {
  default: 'border-border text-text-secondary bg-bg-elevated',
  accent: 'border-border-accent text-accent bg-accent/10',
  success: 'border-success/40 text-success bg-success/10',
  warning: 'border-warning/40 text-warning bg-warning/10',
}

function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }

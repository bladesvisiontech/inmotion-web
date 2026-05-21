import { cn } from '@/lib/utils'

type GradientTextProps = React.HTMLAttributes<HTMLSpanElement>

function GradientText({ className, children, ...props }: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-accent via-brand-blue to-brand-purple',
        'bg-clip-text text-transparent',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { GradientText }

import { cn } from '@/lib/utils'

type GradientTextProps = React.HTMLAttributes<HTMLSpanElement>

function GradientText({ className, children, ...props }: GradientTextProps) {
  return (
    <span className={cn('text-accent', className)} {...props}>
      {children}
    </span>
  )
}

export { GradientText }

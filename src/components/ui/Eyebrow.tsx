import { cn } from '@/lib/utils'

interface EyebrowProps extends React.HTMLAttributes<HTMLParagraphElement> {
  arrows?: boolean
}

function Eyebrow({ arrows = true, className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-xs font-medium uppercase tracking-widest text-accent',
        'inline-flex items-center gap-2',
        className
      )}
      {...props}
    >
      {arrows && <span aria-hidden>←</span>}
      {children}
      {arrows && <span aria-hidden>→</span>}
    </p>
  )
}

export { Eyebrow }

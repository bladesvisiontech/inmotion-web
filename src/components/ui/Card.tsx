import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

function Card({ hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-bg-elevated border border-border rounded-lg p-6 md:p-8',
        'shadow-card',
        hover && [
          'transition-all duration-200 cursor-pointer',
          'hover:border-border-strong hover:-translate-y-0.5',
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-text-primary font-semibold text-lg leading-snug', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

function CardBody({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-text-secondary text-sm leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

export { Card, CardHeader, CardTitle, CardBody }

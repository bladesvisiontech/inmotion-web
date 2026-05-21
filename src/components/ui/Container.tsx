import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  narrow?: boolean
}

function Container({ narrow = false, className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        narrow ? 'max-w-2xl' : 'max-w-7xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Container }

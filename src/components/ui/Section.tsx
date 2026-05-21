import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  glow?: boolean
  glowPosition?: 'top' | 'bottom' | 'center'
  as?: 'section' | 'div'
}

function Section({
  glow = false,
  glowPosition = 'bottom',
  as: Tag = 'section',
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn('relative py-20 md:py-32 overflow-hidden', className)} {...props}>
      {glow && (
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 -z-10',
            'h-[600px] rounded-full opacity-30',
            'bg-[radial-gradient(ellipse_at_center,_rgba(180,248,56,0.35)_0%,_transparent_70%)]',
            glowPosition === 'top' && '-top-40',
            glowPosition === 'center' && 'top-1/2 -translate-y-1/2',
            glowPosition === 'bottom' && '-bottom-40'
          )}
        />
      )}
      {children}
    </Tag>
  )
}

export { Section }

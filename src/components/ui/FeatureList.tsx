import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureListProps {
  items: string[]
  className?: string
  itemClassName?: string
}

function FeatureList({ items, className, itemClassName }: FeatureListProps) {
  return (
    <ul className={cn('space-y-3', className)} role="list">
      {items.map((item, i) => (
        <li key={i} className={cn('flex items-start gap-3', itemClassName)}>
          <span
            className="mt-0.5 flex-shrink-0 size-5 rounded-full bg-accent/15 flex items-center justify-center"
            aria-hidden
          >
            <Check className="size-3 text-accent" />
          </span>
          <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export { FeatureList }

import { cn } from '@/lib/utils'

interface NumberedListProps {
  items: string[]
  className?: string
}

function NumberedList({ items, className }: NumberedListProps) {
  return (
    <ol className={cn('space-y-4', className)} role="list">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4">
          <span className="flex-shrink-0 font-mono text-xs text-accent-muted tracking-wider pt-0.5 w-6">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ol>
  )
}

export { NumberedList }

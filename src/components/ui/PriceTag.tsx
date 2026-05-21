import { cn } from '@/lib/utils'

interface PriceTagProps {
  amount: number | null
  currency?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: { amount: 'text-2xl', currency: 'text-sm' },
  md: { amount: 'text-4xl', currency: 'text-base' },
  lg: { amount: 'text-6xl', currency: 'text-xl' },
}

function PriceTag({ amount, currency = 'USD', label, size = 'md', className }: PriceTagProps) {
  if (amount === null) {
    return (
      <div className={cn('flex items-baseline gap-2', className)}>
        <span className={cn('text-text-primary font-semibold', sizeClasses[size].amount)}>
          Cotización
        </span>
        {label && <span className="text-text-secondary text-sm">{label}</span>}
      </div>
    )
  }

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className={cn('text-accent font-semibold tabular-nums', sizeClasses[size].amount)}>
        ${amount}
      </span>
      <span className={cn('text-text-secondary font-normal', sizeClasses[size].currency)}>
        {currency}
      </span>
      {label && <span className="text-text-tertiary text-sm">{label}</span>}
    </div>
  )
}

export { PriceTag }

'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionItem {
  id: string
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cn('divide-y divide-border', className)} role="list">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} role="listitem">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className={cn(
                'w-full flex items-center justify-between py-5 text-left gap-4',
                'text-text-primary hover:text-accent transition-colors duration-150',
                'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm'
              )}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-sm md:text-base">{item.question}</span>
              <Plus
                className={cn(
                  'flex-shrink-0 size-4 text-text-tertiary transition-transform duration-200',
                  isOpen && 'rotate-45'
                )}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isOpen ? 'max-h-96 pb-5' : 'max-h-0'
              )}
            >
              <p className="text-text-secondary text-sm leading-relaxed">{item.answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { Accordion }
export type { AccordionItem }

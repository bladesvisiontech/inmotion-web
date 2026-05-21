'use client'

import { useTranslations } from 'next-intl'
import { Star } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Card } from '@/components/ui/Card'
import { TESTIMONIALS } from '@/content/testimonials'

function TestimonialsSection() {
  const t = useTranslations('home.testimonials')

  return (
    <Section className="py-20 md:py-32 bg-bg-elevated/20">
      <Container>
        <div className="text-center mb-14">
          <Eyebrow className="mb-4 justify-center">{t('eyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-2">
            {t('h2')}
          </h2>
          <p className="text-text-tertiary text-xs uppercase tracking-wider mt-3">
            {t('disclaimer')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {TESTIMONIALS.map((item) => (
            <Card key={item.id} className="flex flex-col gap-4">
              <div className="flex gap-0.5" aria-label={`${item.rating} de 5 estrellas`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" aria-hidden />
                ))}
              </div>
              <p className="text-text-secondary text-sm leading-relaxed flex-1">
                &ldquo;{item.content}&rdquo;
              </p>
              <div>
                <p className="text-text-primary text-sm font-medium">{item.name}</p>
                <p className="text-text-tertiary text-xs">
                  {item.role} · {item.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export { TestimonialsSection }

'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Globe, Search, Lightbulb, ShoppingCart, ArrowRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SERVICES } from '@/content/services'

const iconMap = { Globe, Search, Lightbulb, ShoppingCart }

function ServicesGrid() {
  const t = useTranslations()
  const locale = useLocale()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <Section className="py-24 md:py-40 bg-bg-elevated/30">
      <Container>
        <div className="text-center mb-14">
          <Eyebrow className="mb-4 justify-center">{t('home.services.eyebrow')}</Eyebrow>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary max-w-2xl mx-auto">
            {t('home.services.h2')}
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Globe
            const name = t(`services.${service.slug}.name`)
            const pitch = t(`services.${service.slug}.pitch`)
            const price = service.priceUSD

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
              >
                <Link href={`/${locale}/services/${service.slug}`} className="block h-full group">
                  <Card
                    hover
                    className="h-full flex flex-col gap-4 group-hover:border-border-accent/40"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="size-5 text-accent" aria-hidden />
                      </div>
                      {price !== null ? (
                        <Badge variant="accent">${price} USD</Badge>
                      ) : (
                        <Badge>Cotización</Badge>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-text-primary font-semibold text-lg mb-2">{name}</h3>
                      <p className="text-text-secondary text-sm leading-relaxed">{pitch}</p>
                    </div>

                    <div className="flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all duration-150">
                      {t('home.services.viewDetails')}
                      <ArrowRight className="size-3.5" aria-hidden />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export { ServicesGrid }

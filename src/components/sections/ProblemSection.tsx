'use client'

import { useTranslations } from 'next-intl'
import { DollarSign, Link2, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Card, CardTitle, CardBody } from '@/components/ui/Card'

const icons = [DollarSign, Link2, Clock]
const cardKeys = ['card1', 'card2', 'card3'] as const

function ProblemSection() {
  const t = useTranslations('home.problem')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <Section className="py-20 md:py-32">
      <Container>
        <div className="text-center mb-14">
          <Eyebrow className="mb-4 justify-center">{t('eyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-text-primary mb-4 max-w-3xl mx-auto">
            {t('h2')}
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">{t('sub')}</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {cardKeys.map((key, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
              >
                <Card className="h-full">
                  <div className="size-10 rounded-lg bg-danger/10 flex items-center justify-center mb-4">
                    <Icon className="size-5 text-danger" aria-hidden />
                  </div>
                  <CardTitle className="mb-2">{t(`${key}Title`)}</CardTitle>
                  <CardBody>{t(`${key}Body`)}</CardBody>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

export { ProblemSection }

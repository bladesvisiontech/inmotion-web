'use client'

import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'

function ProcessSection() {
  const t = useTranslations('home.process')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const steps = [t('step1'), t('step2'), t('step3'), t('step4')]

  return (
    <Section className="py-24 md:py-40">
      <Container>
        <div className="text-center mb-14">
          <Eyebrow className="mb-4 justify-center">{t('eyebrow')}</Eyebrow>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
            {t('h2')}
          </h2>
        </div>

        <div ref={ref} className="max-w-2xl mx-auto">
          <ol className="space-y-6" role="list">
            {steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
                className="flex items-start gap-5 group"
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="size-10 rounded-full border border-border-accent bg-accent/10 flex items-center justify-center">
                    <span className="font-mono text-xs text-accent font-medium">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 min-h-6 bg-border mt-2" aria-hidden />
                  )}
                </div>
                <p className="text-text-secondary text-base leading-relaxed pt-2">{step}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}

export { ProcessSection }

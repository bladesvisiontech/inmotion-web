'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { GradientText } from '@/components/ui/GradientText'
import { Container } from '@/components/ui/Container'

function HeroHome() {
  const t = useTranslations('home.hero')
  const locale = useLocale()

  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,248,56,0.12) 0%, transparent 70%)',
        }}
      />

      <Container>
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow className="mb-6">{t('eyebrow')}</Eyebrow>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary leading-tight mb-6">
            {t('h1Before')} <GradientText>{t('h1Gradient')}</GradientText>
          </h1>

          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            {t('sub')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-8">
            <Button size="lg" asChild>
              <Link href={`/${locale}/pricing`}>
                {t('ctaPrimary')} <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href={`/${locale}/contact`}>{t('ctaSecondary')}</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {([t('trust1'), t('trust2'), t('trust3')] as string[]).map((item, i) => (
              <span
                key={i}
                className="text-xs text-text-tertiary font-mono flex items-center gap-2"
              >
                {i > 0 && (
                  <span aria-hidden className="hidden sm:inline text-border-strong">
                    ·
                  </span>
                )}
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export { HeroHome }

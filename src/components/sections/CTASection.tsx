'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SERVICES } from '@/content/services'

function CTASection() {
  const t = useTranslations('home.cta')
  const locale = useLocale()
  const websiteService = SERVICES.find((s) => s.slug === 'website')

  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      {/* Strong glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(180,248,56,0.18) 0%, transparent 70%)',
        }}
      />
      {/* Border lines */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-accent/40 to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border-accent/40 to-transparent"
        aria-hidden
      />

      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-4">
            {t('h2')}
          </h2>
          <p className="text-text-secondary text-xl mb-10">{t('sub')}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild>
              <a
                href={websiteService?.paymentLink ?? `/${locale}/contact`}
                target={websiteService?.paymentLink ? '_self' : undefined}
              >
                {t('button')} <ArrowRight className="size-4" aria-hidden />
              </a>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href={`/${locale}/contact`}>{t('secondary')}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { CTASection }

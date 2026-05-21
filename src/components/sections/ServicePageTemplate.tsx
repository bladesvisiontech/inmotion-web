'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowRight, X } from 'lucide-react'
import { motion } from 'framer-motion'
import type { ServiceSlug } from '@/content/services'
import { SERVICES } from '@/content/services'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { GradientText } from '@/components/ui/GradientText'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Card, CardTitle, CardBody } from '@/components/ui/Card'
import { FeatureList } from '@/components/ui/FeatureList'
import { NumberedList } from '@/components/ui/NumberedList'
import { PriceTag } from '@/components/ui/PriceTag'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'

interface ServicePageProps {
  slug: ServiceSlug
}

function ServiceHero({ slug }: ServicePageProps) {
  const t = useTranslations(`services.${slug}.hero`)
  const locale = useLocale()
  const service = SERVICES.find((s) => s.slug === slug)!

  const hasBuy = service.priceUSD !== null && service.paymentLink !== null
  const buyLabel = t('ctaBuy' as never) as string | undefined
  const contactLabel = t('ctaContact' as never) as string
  const trustLabel = t('trustPayment' as never) as string

  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-40 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(180,248,56,0.10) 0%, transparent 70%)',
        }}
      />
      <Container>
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow className="mb-6">{t('eyebrow' as never) as string}</Eyebrow>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-tight mb-6">
            {t('h1' as never) as string}{' '}
            <GradientText>{t('h1Gradient' as never) as string}</GradientText>{' '}
            {(t('h1After' as never) as string) && (
              <span className="text-text-primary">{t('h1After' as never) as string}</span>
            )}
          </h1>

          <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            {t('sub' as never) as string}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-6">
            {hasBuy && buyLabel ? (
              <Button size="lg" asChild>
                <a href={service.paymentLink!}>
                  {buyLabel} <ArrowRight className="size-4" aria-hidden />
                </a>
              </Button>
            ) : null}
            <Button size="lg" variant={hasBuy ? 'secondary' : 'primary'} asChild>
              <Link href={`/${locale}/contact?service=${slug}`}>
                {contactLabel} {!hasBuy && <ArrowRight className="size-4" aria-hidden />}
              </Link>
            </Button>
          </div>

          <p className="text-text-tertiary text-xs font-mono">{trustLabel}</p>
        </motion.div>
      </Container>
    </section>
  )
}

function ServiceIncludes({ slug }: ServicePageProps) {
  const t = useTranslations(`services.${slug}.includes`)
  const items = Array.from({ length: 12 }, (_, i) => {
    try {
      return t(`items.${i}` as never) as string
    } catch {
      return null
    }
  }).filter(Boolean) as string[]

  return (
    <Section className="py-20 md:py-28 bg-bg-elevated/20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-8">
              {t('title' as never) as string}
            </h2>
            <FeatureList items={items} />
          </div>
          <div className="hidden md:block">
            <div className="aspect-square rounded-xl bg-bg-elevated border border-border flex items-center justify-center">
              <span className="text-text-tertiary text-sm">Imagen ilustrativa</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ServiceProcess({ slug }: ServicePageProps) {
  const t = useTranslations(`services.${slug}.process`)
  const steps = Array.from({ length: 6 }, (_, i) => {
    try {
      return t(`step${i + 1}` as never) as string
    } catch {
      return null
    }
  }).filter(Boolean) as string[]

  return (
    <Section className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-10 text-center">
            {t('title' as never) as string}
          </h2>
          <NumberedList items={steps} />
        </div>
      </Container>
    </Section>
  )
}

function ServiceForWhom({ slug }: ServicePageProps) {
  const t = useTranslations(`services.${slug}.forWhom`)
  const items = Array.from({ length: 8 }, (_, i) => {
    try {
      return t(`items.${i}` as never) as string
    } catch {
      return null
    }
  }).filter(Boolean) as string[]

  return (
    <Section className="py-20 md:py-28 bg-bg-elevated/20">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-8 text-center">
            {t('title' as never) as string}
          </h2>
          <ul className="space-y-4" role="list">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Badge variant="accent" className="flex-shrink-0 mt-0.5">
                  ✓
                </Badge>
                <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}

function ServiceNotIncludes({ slug }: ServicePageProps) {
  const t = useTranslations(`services.${slug}.notIncludes`)
  const items = Array.from({ length: 8 }, (_, i) => {
    try {
      return t(`items.${i}` as never) as string
    } catch {
      return null
    }
  }).filter(Boolean) as string[]

  return (
    <Section className="py-20 md:py-28">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-3 text-center">
            {t('title' as never) as string}
          </h2>
          <p className="text-text-tertiary text-sm text-center mb-8">
            Transparencia total. Sin letra chica.
          </p>
          <ul className="space-y-3" role="list">
            {items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 py-3 border-b border-border last:border-0"
              >
                <X className="size-4 flex-shrink-0 mt-0.5 text-text-tertiary" aria-hidden />
                <span className="text-text-secondary text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}

function ServicePricing({ slug }: ServicePageProps) {
  const t = useTranslations(`services.${slug}.pricing`)
  const service = SERVICES.find((s) => s.slug === slug)!
  const locale = useLocale()

  return (
    <Section glow glowPosition="center" className="py-20 md:py-28 bg-bg-elevated/10">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-8">
            {t('title' as never) as string}
          </h2>

          <div className="bg-bg-elevated border border-border-accent/30 rounded-xl p-8 mb-8">
            <PriceTag amount={service.priceUSD} size="lg" className="justify-center mb-6" />
            <div className="grid grid-cols-2 gap-4 text-sm text-text-secondary mb-6">
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                {t('oneTime' as never) as string}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                {t('noHidden' as never) as string}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                {t('noSubscription' as never) as string}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                {t('guarantee' as never) as string}
              </div>
            </div>

            {service.priceUSD !== null && service.paymentLink ? (
              <Button size="lg" className="w-full" asChild>
                <a href={service.paymentLink}>
                  Comprar por ${service.priceUSD} USD <ArrowRight className="size-4" aria-hidden />
                </a>
              </Button>
            ) : (
              <Button size="lg" className="w-full" asChild>
                <Link href={`/${locale}/contact?service=${slug}`}>
                  Solicitar cotización <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            )}
            <p className="text-text-tertiary text-xs mt-3">
              Pago seguro vía Stripe · Tarjeta · Sin suscripciones
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ServiceFAQ({ slug }: ServicePageProps) {
  const t = useTranslations(`services.${slug}.faq`)
  const items = Array.from({ length: 6 }, (_, i) => {
    try {
      const q = t(`q${i + 1}` as never) as string
      const a = t(`a${i + 1}` as never) as string
      return { id: String(i + 1), question: q, answer: a }
    } catch {
      return null
    }
  }).filter(Boolean) as { id: string; question: string; answer: string }[]

  return (
    <Section className="py-20 md:py-28">
      <Container narrow>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-10 text-center">
          Preguntas frecuentes
        </h2>
        <Accordion items={items} />
      </Container>
    </Section>
  )
}

function ServiceCrossSell({ slug }: ServicePageProps) {
  const t = useTranslations()
  const locale = useLocale()
  const otherServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <Section className="py-20 md:py-28 bg-bg-elevated/20">
      <Container>
        <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-8 text-center">
          Otros servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherServices.map((service) => (
            <Link
              key={service.slug}
              href={`/${locale}/services/${service.slug}`}
              className="block group"
            >
              <Card hover className="group-hover:border-border-accent/40">
                <CardTitle className="mb-2 group-hover:text-accent transition-colors">
                  {t(`services.${service.slug}.name`)}
                </CardTitle>
                <CardBody className="mb-4">{t(`services.${service.slug}.pitch`)}</CardBody>
                <span className="text-accent text-sm">Ver detalles →</span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ServicePageTemplate({ slug }: ServicePageProps) {
  const hasFullContent = ['website', 'seo'].includes(slug)

  return (
    <>
      <ServiceHero slug={slug} />
      {hasFullContent && (
        <>
          <ServiceIncludes slug={slug} />
          <ServiceProcess slug={slug} />
          <ServiceForWhom slug={slug} />
          <ServiceNotIncludes slug={slug} />
          <ServicePricing slug={slug} />
          <ServiceFAQ slug={slug} />
        </>
      )}
      <ServiceCrossSell slug={slug} />
    </>
  )
}

export { ServicePageTemplate }

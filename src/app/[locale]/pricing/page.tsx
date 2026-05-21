import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { GradientText } from '@/components/ui/GradientText'
import { Button } from '@/components/ui/Button'
import { SERVICES } from '@/content/services'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('pricingTitle') }
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <>
      <Section className="pt-20 pb-12 md:pt-32 md:pb-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Eyebrow className="mb-6 justify-center">{t('pricing.eyebrow')}</Eyebrow>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary mb-4">
              {t('pricing.h1')} <GradientText>{t('pricing.h1Gradient')}</GradientText>
            </h1>
            <p className="text-text-secondary text-xl">{t('pricing.sub')}</p>
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-text-tertiary text-xs uppercase tracking-wider py-4 pr-8 font-medium w-1/4">
                    {t('pricing.columns.service')}
                  </th>
                  <th className="text-left text-text-tertiary text-xs uppercase tracking-wider py-4 pr-8 font-medium w-1/6">
                    {t('pricing.columns.price')}
                  </th>
                  <th className="text-left text-text-tertiary text-xs uppercase tracking-wider py-4 pr-8 font-medium w-1/8">
                    {t('pricing.columns.delivery')}
                  </th>
                  <th className="text-left text-text-tertiary text-xs uppercase tracking-wider py-4 pr-8 font-medium">
                    {t('pricing.columns.includes')}
                  </th>
                  <th className="text-right text-text-tertiary text-xs uppercase tracking-wider py-4 font-medium w-1/8">
                    {t('pricing.columns.cta')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SERVICES.map((service) => {
                  const hasBuy = service.priceUSD !== null && service.paymentLink !== null
                  return (
                    <tr key={service.slug} className="hover:bg-bg-elevated/40 transition-colors">
                      <td className="py-6 pr-8">
                        <p className="text-text-primary font-medium">
                          {t(`services.${service.slug}.name`)}
                        </p>
                      </td>
                      <td className="py-6 pr-8">
                        <p className="text-accent font-semibold">
                          {service.priceUSD !== null
                            ? `$${service.priceUSD} USD`
                            : t('pricing.quote')}
                        </p>
                        {service.priceUSD !== null && (
                          <p className="text-text-tertiary text-xs mt-0.5">
                            {t('pricing.oneTime')}
                          </p>
                        )}
                      </td>
                      <td className="py-6 pr-8">
                        <p className="text-text-secondary text-sm">
                          {service.deliveryDays
                            ? t('pricing.days', { n: service.deliveryDays.toString() })
                            : '—'}
                        </p>
                      </td>
                      <td className="py-6 pr-8">
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {t(`pricing.${service.slug}.includes`)}
                        </p>
                      </td>
                      <td className="py-6 text-right">
                        {hasBuy ? (
                          <Button size="sm" asChild>
                            <a href={service.paymentLink!}>
                              {t('pricing.ctaBuy')} <ArrowRight className="size-3.5" aria-hidden />
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" variant="secondary" asChild>
                            <Link href={`/${locale}/contact?service=${service.slug}`}>
                              {t('pricing.ctaContact')}
                            </Link>
                          </Button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {SERVICES.map((service) => {
              const hasBuy = service.priceUSD !== null && service.paymentLink !== null
              return (
                <div
                  key={service.slug}
                  className="border border-border rounded-lg p-6 bg-bg-elevated"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-text-primary font-semibold">
                      {t(`services.${service.slug}.name`)}
                    </h3>
                    <span className="text-accent font-bold text-lg">
                      {service.priceUSD !== null ? `$${service.priceUSD}` : t('pricing.quote')}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mb-4">
                    {t(`pricing.${service.slug}.includes`)}
                  </p>
                  {service.deliveryDays && (
                    <p className="text-text-tertiary text-xs mb-4">
                      Plazo: {t('pricing.days', { n: service.deliveryDays.toString() })}
                    </p>
                  )}
                  {hasBuy ? (
                    <Button size="sm" className="w-full" asChild>
                      <a href={service.paymentLink!}>
                        {t('pricing.ctaBuy')} <ArrowRight className="size-3.5" aria-hidden />
                      </a>
                    </Button>
                  ) : (
                    <Button size="sm" variant="secondary" className="w-full" asChild>
                      <Link href={`/${locale}/contact?service=${service.slug}`}>
                        {t('pricing.ctaContact')}
                      </Link>
                    </Button>
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-text-tertiary text-xs mt-8 text-center">{t('pricing.note')}</p>
        </Container>
      </Section>
    </>
  )
}

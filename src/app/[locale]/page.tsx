import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { HeroHome } from '@/components/sections/HeroHome'
import { ProblemSection } from '@/components/sections/ProblemSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CTASection } from '@/components/sections/CTASection'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { SERVICES } from '@/content/services'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: locale === 'es' ? '/' : '/en',
      languages: { es: '/', en: '/en' },
    },
  }
}

function PricingPreviewSection() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <Section className="py-20 md:py-32 bg-bg-elevated/20">
      <Container>
        <div className="text-center mb-12">
          <Eyebrow className="mb-4 justify-center">{t('home.pricing.eyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            {t('home.pricing.h2')}
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">{t('home.pricing.sub')}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-text-tertiary text-xs uppercase tracking-wider py-3 pr-6 font-medium">
                  {t('pricing.columns.service')}
                </th>
                <th className="text-left text-text-tertiary text-xs uppercase tracking-wider py-3 pr-6 font-medium">
                  {t('pricing.columns.price')}
                </th>
                <th className="text-left text-text-tertiary text-xs uppercase tracking-wider py-3 pr-6 font-medium">
                  {t('pricing.columns.delivery')}
                </th>
                <th className="text-right text-text-tertiary text-xs uppercase tracking-wider py-3 font-medium">
                  {t('pricing.columns.cta')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SERVICES.map((service) => (
                <tr key={service.slug} className="group hover:bg-bg-elevated/50 transition-colors">
                  <td className="py-4 pr-6">
                    <span className="text-text-primary font-medium text-sm">
                      {t(`services.${service.slug}.name`)}
                    </span>
                  </td>
                  <td className="py-4 pr-6">
                    <span className="text-accent font-semibold text-sm">
                      {service.priceUSD !== null ? `$${service.priceUSD} USD` : t('pricing.quote')}
                    </span>
                    {service.priceUSD !== null && (
                      <span className="text-text-tertiary text-xs ml-2">
                        {t('pricing.oneTime')}
                      </span>
                    )}
                  </td>
                  <td className="py-4 pr-6">
                    <span className="text-text-secondary text-sm">
                      {service.deliveryDays
                        ? t('pricing.days', { n: service.deliveryDays.toString() })
                        : '—'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <Link
                      href={`/${locale}/services/${service.slug}`}
                      className="text-accent text-sm hover:text-accent-hover transition-colors"
                    >
                      {t('home.services.viewDetails')}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-8">
          <Button variant="secondary" asChild>
            <Link href={`/${locale}/pricing`}>{t('home.pricing.cta')}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <ProblemSection />
      <ServicesGrid />
      <ProcessSection />
      <PricingPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}

import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Globe, Search, Lightbulb, ShoppingCart } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { SERVICES } from '@/content/services'

const iconMap = { Globe, Search, Lightbulb, ShoppingCart }

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('servicesTitle'), description: t('homeDescription') }
}

export default async function ServicesHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <Section className="py-20 md:py-32">
      <Container>
        <div className="text-center mb-14">
          <Eyebrow className="mb-4 justify-center">{t('services.hub.eyebrow')}</Eyebrow>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-4">
            {t('services.hub.h1')}
          </h1>
          <p className="text-text-secondary text-xl max-w-xl mx-auto">{t('services.hub.sub')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Globe
            return (
              <Link
                key={service.slug}
                href={`/${locale}/services/${service.slug}`}
                className="block group"
              >
                <Card
                  hover
                  className="h-full flex flex-col gap-4 group-hover:border-border-accent/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Icon className="size-6 text-accent" aria-hidden />
                    </div>
                    {service.priceUSD !== null ? (
                      <Badge variant="accent">${service.priceUSD} USD</Badge>
                    ) : (
                      <Badge>Cotización</Badge>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-text-primary font-semibold text-xl mb-2 group-hover:text-accent transition-colors">
                      {t(`services.${service.slug}.name`)}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {t(`services.${service.slug}.pitch`)}
                    </p>
                  </div>
                  <span className="text-accent text-sm font-medium group-hover:gap-2 transition-all flex items-center gap-1">
                    {t('home.services.viewDetails')}
                  </span>
                </Card>
              </Link>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

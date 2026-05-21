import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ShieldCheck, Zap, User } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { GradientText } from '@/components/ui/GradientText'
import { Card, CardTitle, CardBody } from '@/components/ui/Card'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('aboutTitle') }
}

const valueIcons = [ShieldCheck, Zap, User]

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const values = [
    { title: t('about.values.v1Title'), body: t('about.values.v1Body') },
    { title: t('about.values.v2Title'), body: t('about.values.v2Body') },
    { title: t('about.values.v3Title'), body: t('about.values.v3Body') },
  ]

  return (
    <>
      {/* Hero */}
      <Section className="pt-20 pb-16 md:pt-32 md:pb-24">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow className="mb-6">{t('about.eyebrow')}</Eyebrow>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary mb-6">
              {t('about.h1')} <GradientText>{t('about.h1Gradient')}</GradientText>
            </h1>
            <p className="text-text-secondary text-xl leading-relaxed">{t('about.sub')}</p>
          </div>
        </Container>
      </Section>

      {/* Why */}
      <Section className="py-16 md:py-24 bg-bg-elevated/20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">
              {t('about.why.title')}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">{t('about.why.body')}</p>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="py-16 md:py-24">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-10">
            {t('about.values.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, i) => {
              const Icon = valueIcons[i]
              return (
                <Card key={i}>
                  <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="size-5 text-accent" aria-hidden />
                  </div>
                  <CardTitle className="mb-2">{value.title}</CardTitle>
                  <CardBody>{value.body}</CardBody>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Team placeholder */}
      <Section className="py-16 md:py-24 bg-bg-elevated/20">
        <Container>
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-10">
            {t('about.team.title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-4 p-6 border border-border rounded-lg bg-bg-elevated"
              >
                <div className="size-20 rounded-full bg-bg-subtle border border-border flex items-center justify-center">
                  <User className="size-8 text-text-tertiary" aria-hidden />
                </div>
                <div>
                  <p className="text-text-primary font-medium">Jhojan M.</p>
                  <p className="text-text-secondary text-sm">Fundador & Full-Stack Dev</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Mail, Clock } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ContactForm } from '@/components/sections/ContactForm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('contactTitle') }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <Section className="py-20 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <Eyebrow className="mb-6">{t('contact.eyebrow')}</Eyebrow>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mb-4">
              {t('contact.h1')}
            </h1>
            <p className="text-text-secondary text-xl mb-12">{t('contact.sub')}</p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="size-5 text-accent" aria-hidden />
                </div>
                <div>
                  <p className="text-text-primary font-medium text-sm mb-0.5">
                    {t('contact.info.email')}
                  </p>
                  <a
                    href="mailto:hello@inmotionteam.com"
                    className="text-text-secondary text-sm hover:text-accent transition-colors"
                  >
                    hello@inmotionteam.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="size-5 text-accent" aria-hidden />
                </div>
                <div>
                  <p className="text-text-primary font-medium text-sm mb-0.5">
                    {t('contact.info.response')}
                  </p>
                  <p className="text-text-secondary text-sm">{t('contact.info.hours')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <Suspense fallback={<div className="h-96 bg-bg-elevated rounded-lg animate-pulse" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </Section>
  )
}

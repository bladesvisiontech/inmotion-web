import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { CheckCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'checkout.success' })

  const steps = [t('steps.s1'), t('steps.s2'), t('steps.s3'), t('steps.s4')]

  return (
    <Section glow glowPosition="top" className="py-20 md:py-32">
      <Container>
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="size-16 rounded-full bg-success/15 flex items-center justify-center">
              <CheckCircle className="size-8 text-success" aria-hidden />
            </div>
          </div>

          <Eyebrow className="mb-4 justify-center">{t('eyebrow')}</Eyebrow>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text-primary mb-4">
            {t('h1')}
          </h1>
          <p className="text-text-secondary text-lg mb-12">{t('sub')}</p>

          <div className="text-left bg-bg-elevated border border-border rounded-xl p-6 mb-10">
            <h2 className="text-text-primary font-semibold mb-6">{t('steps.title')}</h2>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 size-6 rounded-full bg-accent/15 flex items-center justify-center font-mono text-xs text-accent font-medium">
                    {i + 1}
                  </span>
                  <span className="text-text-secondary text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <Button variant="secondary" asChild>
            <Link href={`/${locale}`}>{t('cta')}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}

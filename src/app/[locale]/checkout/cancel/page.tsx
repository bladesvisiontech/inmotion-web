import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { XCircle } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import { GLOBAL_FAQS } from '@/content/faqs'

export default async function CheckoutCancelPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const faqItems = GLOBAL_FAQS.slice(0, 3).map((faq) => ({
    id: faq.id,
    question: t(faq.questionKey as never) as string,
    answer: t(faq.answerKey as never) as string,
  }))

  return (
    <Section className="py-20 md:py-32">
      <Container>
        <div className="max-w-xl mx-auto text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="size-16 rounded-full bg-text-tertiary/10 flex items-center justify-center">
              <XCircle className="size-8 text-text-tertiary" aria-hidden />
            </div>
          </div>

          <Eyebrow className="mb-4 justify-center">{t('checkout.cancel.eyebrow')}</Eyebrow>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text-primary mb-4">
            {t('checkout.cancel.h1')}
          </h1>
          <p className="text-text-secondary text-lg mb-8">{t('checkout.cancel.sub')}</p>

          <p className="text-text-secondary font-medium mb-6">{t('checkout.cancel.help')}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href={`/${locale}/contact`}>{t('checkout.cancel.ctaContact')}</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href={`/${locale}`}>{t('checkout.cancel.ctaBack')}</Link>
            </Button>
          </div>
        </div>

        <div className="max-w-xl mx-auto">
          <h2 className="text-text-primary font-semibold mb-6 text-center">
            {t('checkout.cancel.faqTitle')}
          </h2>
          <Accordion items={faqItems} />
        </div>
      </Container>
    </Section>
  )
}

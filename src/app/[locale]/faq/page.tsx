import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Accordion } from '@/components/ui/Accordion'
import { GLOBAL_FAQS } from '@/content/faqs'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return { title: t('faqTitle') }
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const items = GLOBAL_FAQS.map((faq) => ({
    id: faq.id,
    question: t(faq.questionKey as never) as string,
    answer: t(faq.answerKey as never) as string,
  }))

  return (
    <Section className="py-20 md:py-32">
      <Container narrow>
        <div className="text-center mb-12">
          <Eyebrow className="mb-4 justify-center">{t('faq.eyebrow')}</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mb-4">
            {t('faq.h1')}
          </h1>
          <p className="text-text-secondary text-lg">{t('faq.sub')}</p>
        </div>
        <Accordion items={items} />
      </Container>
    </Section>
  )
}

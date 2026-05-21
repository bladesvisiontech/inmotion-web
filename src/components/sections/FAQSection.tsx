import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Accordion } from '@/components/ui/Accordion'
import { GLOBAL_FAQS } from '@/content/faqs'

function FAQSection() {
  const t = useTranslations()
  const locale = useLocale()

  const items = GLOBAL_FAQS.map((faq) => ({
    id: faq.id,
    question: t(faq.questionKey),
    answer: t(faq.answerKey),
  }))

  return (
    <Section className="py-20 md:py-32">
      <Container narrow>
        <div className="text-center mb-12">
          <Eyebrow className="mb-4 justify-center">{t('home.faq.eyebrow')}</Eyebrow>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
            {t('home.faq.h2')}
          </h2>
        </div>

        <Accordion items={items} />

        <div className="text-center mt-8">
          <Link
            href={`/${locale}/faq`}
            className="text-accent text-sm hover:text-accent-hover transition-colors"
          >
            {t('home.faq.viewAll')}
          </Link>
        </div>
      </Container>
    </Section>
  )
}

export { FAQSection }

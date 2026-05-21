import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate'

const SLUG = 'seo' as const

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: `services.${SLUG}` })

  return {
    title: `${t('name' as never)} | Inmotion`,
    description: t('pitch' as never) as string,
    openGraph: {
      title: `${t('name' as never)} | Inmotion`,
      description: t('pitch' as never) as string,
      images: ['/og-image.png'],
    },
  }
}

export default function ServicePage() {
  return <ServicePageTemplate slug={SLUG} />
}

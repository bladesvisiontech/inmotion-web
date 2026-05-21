import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal.privacy' })
  return { title: `${t('title')} | Inmotion` }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal.privacy' })

  return (
    <Section className="py-20 md:py-32">
      <Container narrow>
        <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3">{t('title')}</h1>
        <p className="text-text-tertiary text-sm mb-10">
          {t('lastUpdated', { date: '2025-06-01' })}
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
          <h2 className="text-text-primary text-xl font-semibold">1. Datos que recopilamos</h2>
          <p>
            Recopilamos únicamente los datos necesarios para prestarte el servicio: nombre, email,
            empresa (opcional), y el mensaje que nos envíes a través del formulario de contacto.
          </p>

          <h2 className="text-text-primary text-xl font-semibold">2. Uso de los datos</h2>
          <p>
            Usamos tus datos exclusivamente para responderte y prestarte el servicio contratado. No
            vendemos ni compartimos tus datos con terceros, excepto con los proveedores necesarios
            para operar el servicio (Stripe para pagos, Resend para email).
          </p>

          <h2 className="text-text-primary text-xl font-semibold">3. Cookies</h2>
          <p>
            Usamos cookies de analíticas (Vercel Analytics, Plausible) que no rastrean información
            personal identificable. No usamos cookies de publicidad ni de terceros.
          </p>

          <h2 className="text-text-primary text-xl font-semibold">4. Tus derechos</h2>
          <p>
            Tienes derecho a acceder, rectificar o eliminar tus datos en cualquier momento.
            Escríbenos a{' '}
            <a href="mailto:hello@inmotionteam.com" className="text-accent hover:underline">
              hello@inmotionteam.com
            </a>{' '}
            y procesamos tu solicitud en menos de 48 horas.
          </p>

          <h2 className="text-text-primary text-xl font-semibold">5. Retención de datos</h2>
          <p>
            Conservamos tus datos mientras tengamos una relación comercial activa. Puedes pedirnos
            que los eliminemos en cualquier momento.
          </p>
        </div>
      </Container>
    </Section>
  )
}

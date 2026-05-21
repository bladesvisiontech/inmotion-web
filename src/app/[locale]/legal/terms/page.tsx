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
  const t = await getTranslations({ locale, namespace: 'legal.terms' })
  return { title: `${t('title')} | Inmotion` }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'legal.terms' })

  return (
    <Section className="py-20 md:py-32">
      <Container narrow>
        <h1 className="text-3xl md:text-4xl font-semibold text-text-primary mb-3">{t('title')}</h1>
        <p className="text-text-tertiary text-sm mb-10">
          {t('lastUpdated', { date: '2025-06-01' })}
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
          <h2 className="text-text-primary text-xl font-semibold">1. Aceptación de términos</h2>
          <p>
            Al contratar los servicios de Inmotion, aceptas estos términos y condiciones en su
            totalidad. Si no estás de acuerdo con alguna parte, no debes usar nuestros servicios.
          </p>

          <h2 className="text-text-primary text-xl font-semibold">2. Servicios</h2>
          <p>
            Inmotion ofrece servicios de desarrollo web, SEO, consultoría digital y e-commerce para
            pequeñas y medianas empresas. El alcance de cada servicio está definido en la propuesta
            aceptada o en la página de cada servicio.
          </p>

          <h2 className="text-text-primary text-xl font-semibold">3. Pagos</h2>
          <p>
            Los pagos son procesados por Stripe de forma segura. Para servicios con precio fijo, el
            pago es 100% por adelantado. No hay reembolsos una vez iniciado el trabajo, salvo en
            casos de incumplimiento documentado por parte de Inmotion.
          </p>

          <h2 className="text-text-primary text-xl font-semibold">4. Propiedad del trabajo</h2>
          <p>
            Una vez completado el pago y entregado el proyecto, el cliente es el propietario 100% de
            todos los activos entregados. Inmotion no retiene ningún derecho sobre el sitio web u
            otros entregables.
          </p>

          <h2 className="text-text-primary text-xl font-semibold">
            5. Limitación de responsabilidad
          </h2>
          <p>
            Inmotion no se hace responsable por pérdidas indirectas, pérdida de ingresos o daños
            consecuentes derivados del uso o imposibilidad de uso de los servicios entregados.
          </p>

          <h2 className="text-text-primary text-xl font-semibold">6. Contacto</h2>
          <p>
            Para cualquier duda sobre estos términos, escríbenos a{' '}
            <a href="mailto:hello@inmotionteam.com" className="text-accent hover:underline">
              hello@inmotionteam.com
            </a>
            .
          </p>
        </div>
      </Container>
    </Section>
  )
}

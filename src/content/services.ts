export type ServiceSlug = 'website' | 'seo' | 'consulting' | 'ecommerce'

export type Service = {
  slug: ServiceSlug
  i18nKey: string
  priceUSD: number | null
  deliveryDays: number | null
  paymentLink: string | null
  featured: boolean
  icon: string
}

export const SERVICES: Service[] = [
  {
    slug: 'website',
    i18nKey: 'services.website',
    priceUSD: 500,
    deliveryDays: 3,
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_LINK_WEBSITE ?? null,
    featured: true,
    icon: 'Globe',
  },
  {
    slug: 'seo',
    i18nKey: 'services.seo',
    priceUSD: 500,
    deliveryDays: null,
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_LINK_SEO ?? null,
    featured: true,
    icon: 'Search',
  },
  {
    slug: 'consulting',
    i18nKey: 'services.consulting',
    priceUSD: null,
    deliveryDays: null,
    paymentLink: null,
    featured: false,
    icon: 'Lightbulb',
  },
  {
    slug: 'ecommerce',
    i18nKey: 'services.ecommerce',
    priceUSD: null,
    deliveryDays: null,
    paymentLink: null,
    featured: false,
    icon: 'ShoppingCart',
  },
]

export function getService(slug: ServiceSlug): Service {
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) throw new Error(`Service not found: ${slug}`)
  return service
}

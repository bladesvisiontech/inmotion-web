export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Inmotion',
  url: 'https://www.inmotionteam.com',
  logo: 'https://www.inmotionteam.com/logo.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@inmotionteam.com',
    contactType: 'customer service',
    availableLanguage: ['Spanish', 'English'],
  },
  areaServed: 'LATAM',
  description:
    'Agencia digital para PYMEs. Sitios web autoadministrables, SEO y consultoría con precios fijos y transparentes.',
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://www.inmotionteam.com',
  name: 'Inmotion',
}

export function serviceJsonLd(name: string, description: string, price?: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Inmotion',
      url: 'https://www.inmotionteam.com',
    },
    areaServed: 'LATAM',
    ...(price !== undefined && {
      offers: {
        '@type': 'Offer',
        price: price.toString(),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
  }
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

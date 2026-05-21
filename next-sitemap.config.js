/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.inmotionteam.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/checkout/'] },
    ],
  },
  alternateRefs: [
    { href: 'https://www.inmotionteam.com', hreflang: 'es' },
    { href: 'https://www.inmotionteam.com/en', hreflang: 'en' },
  ],
  exclude: ['/api/*', '/checkout/*'],
}

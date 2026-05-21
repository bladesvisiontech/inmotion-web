import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'

function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border bg-bg overflow-hidden">
      {/* Ambient glow bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-80 -z-10 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(180,248,56,0.4) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={`/${locale}`} aria-label="Inmotion — inicio">
              <Image
                src="/logo.svg"
                alt="Inmotion"
                width={120}
                height={32}
                className="h-7 w-auto mb-4"
              />
            </Link>
            <p className="text-text-tertiary text-sm leading-relaxed max-w-xs">
              {t('footer.brandSub')}
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-text-tertiary text-xs uppercase tracking-widest mb-4 font-medium">
              {t('footer.servicesLabel')}
            </p>
            <ul className="space-y-3">
              {(['website', 'seo', 'consulting', 'ecommerce'] as const).map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${locale}/services/${slug}`}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {t(`footer.links.${slug}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-text-tertiary text-xs uppercase tracking-widest mb-4 font-medium">
              {t('footer.companyLabel')}
            </p>
            <ul className="space-y-3">
              {(['about', 'contact', 'pricing', 'faq'] as const).map((key) => (
                <li key={key}>
                  <Link
                    href={`/${locale}/${key === 'about' ? 'about' : key}`}
                    className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                  >
                    {t(`footer.links.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-text-tertiary text-xs uppercase tracking-widest mb-4 font-medium">
              {t('footer.legalLabel')}
            </p>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/legal/terms`}
                  className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                >
                  {t('footer.links.terms')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/legal/privacy`}
                  className="text-text-secondary text-sm hover:text-text-primary transition-colors"
                >
                  {t('footer.links.privacy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand statement */}
        <div className="border-t border-border pt-10 mb-8">
          <p className="text-6xl md:text-8xl lg:text-9xl font-bold text-text-primary tracking-tight leading-none">
            {t('footer.brand')}
          </p>
          <p className="text-text-secondary text-base mt-3">{t('footer.brandSub')}</p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-border pt-6">
          <p className="text-text-tertiary text-xs">
            {t('footer.copyright', { year: year.toString() })}
          </p>
          <p className="text-text-tertiary text-xs">hello@inmotionteam.com</p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }

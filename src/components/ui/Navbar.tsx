'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/services', labelKey: 'nav.services' },
  { href: '/pricing', labelKey: 'nav.pricing' },
  { href: '/about', labelKey: 'nav.about' },
  { href: '/contact', labelKey: 'nav.contact' },
]

function Navbar() {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  function toggleLocale() {
    const nextLocale = locale === 'es' ? 'en' : 'es'
    const withoutLocale = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${nextLocale}${withoutLocale === '/' ? '' : withoutLocale}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0" aria-label="Inmotion — inicio">
            <Image
              src="/logo.svg"
              alt="Inmotion"
              width={130}
              height={35}
              priority
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
            {navLinks.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={`/${locale}${href}`}
                className={cn(
                  'text-sm transition-colors duration-150',
                  pathname.includes(href)
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {t(labelKey)}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLocale}
              className="text-xs font-mono text-text-tertiary hover:text-text-primary transition-colors border border-border rounded-md px-2 py-1"
              aria-label={`Cambiar idioma a ${locale === 'es' ? 'inglés' : 'español'}`}
            >
              {t('nav.toggleLang')}
            </button>
            <Button asChild size="sm">
              <Link href={`/${locale}/pricing`}>{t('nav.cta')}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          'md:hidden border-t border-border overflow-hidden transition-all duration-200',
          mobileOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Navegación móvil">
          {navLinks.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={`/${locale}${href}`}
              className="text-sm text-text-secondary hover:text-text-primary py-2 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t(labelKey)}
            </Link>
          ))}
          <div className="pt-3 flex items-center gap-3 border-t border-border mt-2">
            <button
              onClick={toggleLocale}
              className="text-xs font-mono text-text-tertiary hover:text-text-primary transition-colors border border-border rounded-md px-2 py-1"
            >
              {t('nav.toggleLang')}
            </button>
            <Button size="sm" className="flex-1" asChild>
              <Link href={`/${locale}/pricing`} onClick={() => setMobileOpen(false)}>
                {t('nav.cta')}
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export { Navbar }

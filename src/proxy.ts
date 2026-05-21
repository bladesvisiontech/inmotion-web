import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// DECISION: using next-intl's middleware for locale detection/routing via proxy.ts (Next.js 16 renamed middleware → proxy)
export const proxy = createMiddleware(routing)

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}

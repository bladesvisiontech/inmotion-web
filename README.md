# Inmotion — www.inmotionteam.com

Sitio web corporativo y de conversión para Inmotion, agencia digital para PYMEs.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · next-intl · Stripe Payment Links · Resend

---

## Correr en local (< 10 minutos)

### 1. Clonar y dependencias

```bash
git clone <repo-url>
cd inmotion-web
npm install
```

### 2. Variables de entorno

Crear `.env.local`:

```env
# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_STRIPE_LINK_WEBSITE=https://buy.stripe.com/xxx
NEXT_PUBLIC_STRIPE_LINK_SEO=https://buy.stripe.com/xxx

# Resend
RESEND_API_KEY=re_xxx
RESEND_FROM_EMAIL=hello@inmotionteam.com
RESEND_TO_EMAIL=bladesvisiontech@gmail.com

# Site
NEXT_PUBLIC_SITE_URL=https://www.inmotionteam.com
```

### 3. Desarrollo

```bash
npm run dev
# → http://localhost:3000
```

---

## Configurar Stripe Payment Links

1. Dashboard → Products → "Add product" (nombre, precio único)
2. Payment links → "New" → seleccionar producto
   - Success URL: `https://www.inmotionteam.com/checkout/success?session_id={CHECKOUT_SESSION_ID}`
   - Cancel URL: `https://www.inmotionteam.com/checkout/cancel`
   - Habilitar: nombre, email, teléfono
3. Copiar URL → pegar en `.env.local`

### Webhook

```bash
# Local: stripe listen --forward-to localhost:3000/api/stripe/webhook
# Producción: Dashboard → Webhooks → endpoint /api/stripe/webhook → evento: checkout.session.completed
```

---

## Configurar Resend

1. Cuenta en resend.com → agregar dominio `inmotionteam.com` → verificar DNS
2. Crear API Key → copiar en `RESEND_API_KEY`

---

## Agregar un nuevo servicio

1. `src/content/services.ts` → agregar entrada al array `SERVICES`
2. `src/i18n/messages/es.json` + `en.json` → agregar bloque bajo `services`
3. `src/app/[locale]/services/nuevo-slug/page.tsx` → copiar cualquier página existente y cambiar `SLUG`
4. Agregar variable de Stripe a `.env.local`

---

## Cambiar el copy

Todo el copy está en `src/i18n/messages/es.json` y `en.json`. Nunca hay texto hardcodeado en componentes.

---

## Scripts

```bash
npm run dev      # Desarrollo
npm run build    # Build producción
npm run lint     # ESLint
npm run format   # Prettier
```

---

## Deploy en Vercel

1. Push a GitHub → importar en vercel.com
2. Agregar variables de entorno en Vercel Settings
3. Dominio: `www.inmotionteam.com` → CNAME a `cname.vercel-dns.com`

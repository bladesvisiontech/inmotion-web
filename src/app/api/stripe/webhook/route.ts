import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '')
const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'hello@inmotionteam.com'
const TO = process.env.RESEND_TO_EMAIL ?? 'bladesvisiontech@gmail.com'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET ?? '')
  } catch (err) {
    console.error('[stripe webhook] signature error', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email ?? ''
    const customerName = session.customer_details?.name ?? 'Cliente'
    const amount = ((session.amount_total ?? 0) / 100).toFixed(2)
    const currency = (session.currency ?? 'usd').toUpperCase()

    console.log(
      `[stripe webhook] checkout.session.completed — ${customerEmail} — $${amount} ${currency}`
    )

    // Notify team
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `[Inmotion] ¡Nueva compra! ${customerName} — $${amount} ${currency}`,
      html: `
        <h2>Nueva compra confirmada</h2>
        <p><strong>Cliente:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Monto:</strong> $${amount} ${currency}</p>
        <p><strong>Session ID:</strong> ${session.id}</p>
        <p><strong>Teléfono:</strong> ${session.customer_details?.phone ?? 'No proporcionado'}</p>
        <hr>
        <p>Contactar al cliente en las próximas 24 horas para iniciar el brief.</p>
      `,
    })

    // Confirm to customer
    if (customerEmail) {
      await resend.emails.send({
        from: FROM,
        to: customerEmail,
        subject: '¡Pago confirmado! — Inmotion',
        html: `
          <h2>Hola ${customerName},</h2>
          <p>Tu pago de $${amount} ${currency} fue confirmado exitosamente.</p>
          <h3>¿Qué sigue?</h3>
          <ol>
            <li>Revisa este email — tienes todos los detalles de tu compra</li>
            <li>Nuestro equipo te contacta en las próximas 24 horas</li>
            <li>Prepara el contenido de tu sitio (textos, imágenes, logo)</li>
            <li>En 3 días tienes tu sitio listo</li>
          </ol>
          <p>Cualquier duda, escríbenos a <a href="mailto:hello@inmotionteam.com">hello@inmotionteam.com</a></p>
          <br>
          <p>— El equipo de Inmotion</p>
        `,
      })
    }
  }

  return NextResponse.json({ received: true })
}

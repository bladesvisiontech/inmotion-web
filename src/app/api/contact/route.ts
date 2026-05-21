import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(10),
})

export async function POST(req: NextRequest) {
  const FROM = process.env.RESEND_FROM_EMAIL ?? 'hello@inmotionteam.com'
  const TO = process.env.RESEND_TO_EMAIL ?? 'bladesvisiontech@gmail.com'
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const body = await req.json()
    const data = schema.parse(body)

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `[Inmotion] Nuevo lead: ${data.name} — ${data.service}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Empresa:</strong> ${data.company}</p>` : ''}
        <p><strong>Servicio:</strong> ${data.service}</p>
        <p><strong>Mensaje:</strong><br>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    })

    await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: 'Recibimos tu mensaje — Inmotion',
      html: `
        <h2>Hola ${data.name},</h2>
        <p>Recibimos tu mensaje. Te respondemos en menos de 24 horas.</p>
        <p>Mientras tanto, puedes revisar nuestros <a href="https://www.inmotionteam.com/faq">preguntas frecuentes</a>.</p>
        <br>
        <p>— El equipo de Inmotion</p>
        <p><a href="https://www.inmotionteam.com">www.inmotionteam.com</a></p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Datos inválidos', details: err.issues }, { status: 400 })
    }
    console.error('[contact route]', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

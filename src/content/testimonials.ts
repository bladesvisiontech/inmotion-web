export type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
}

// DECISION: using representative placeholders until real testimonials are provided by client
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    role: 'Dueño',
    company: 'Restaurante El Rincón',
    content:
      'Teníamos un sitio web horrible que nadie encontraba. En 3 días Inmotion nos entregó algo que nos da vergüenza mostrar de lo bueno que está. Las reservas online subieron 40% el primer mes.',
    rating: 5,
  },
  {
    id: '2',
    name: 'María Fernanda López',
    role: 'Directora',
    company: 'Clínica Dental Smile',
    content:
      'Lo que más me gustó fue la transparencia. Me dijeron exactamente qué incluía, qué no incluía, y cuánto costaba. Sin sorpresas. El sitio quedó profesional y yo lo manejo sola sin depender de nadie.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Andrés Ruiz',
    role: 'Fundador',
    company: 'TechFlow Solutions',
    content:
      'El SEO que hicieron movió la aguja de verdad. En 2 meses estamos en primera página para nuestras keywords principales. Sin promesas vacías, con reportes claros semana a semana.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Valentina Castro',
    role: 'Gerente',
    company: 'Moda Propia',
    content:
      'Necesitaba una tienda online pero todas las agencias me pedían fortunas y plazos de 2 meses. Inmotion me entregó todo funcionando, integrado con MercadoPago, en tiempo récord.',
    rating: 5,
  },
]

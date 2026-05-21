export type FAQ = {
  id: string
  questionKey: string
  answerKey: string
  category?: string
}

export const GLOBAL_FAQS: FAQ[] = [
  { id: '1', questionKey: 'faq.global.q1', answerKey: 'faq.global.a1', category: 'process' },
  { id: '2', questionKey: 'faq.global.q2', answerKey: 'faq.global.a2', category: 'payments' },
  { id: '3', questionKey: 'faq.global.q3', answerKey: 'faq.global.a3', category: 'transparency' },
  { id: '4', questionKey: 'faq.global.q4', answerKey: 'faq.global.a4', category: 'support' },
  { id: '5', questionKey: 'faq.global.q5', answerKey: 'faq.global.a5', category: 'transparency' },
]

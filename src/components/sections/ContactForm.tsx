'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  email: z.string().email('Email inválido'),
  company: z.string().optional(),
  service: z.string().min(1, 'Selecciona un servicio'),
  message: z.string().min(10, 'Mensaje muy corto (mínimo 10 caracteres)'),
})

type FormData = z.infer<typeof schema>

function ContactForm() {
  const t = useTranslations('contact.form')
  const searchParams = useSearchParams()
  const preselectedService = searchParams.get('service') ?? ''

  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  useEffect(() => {
    if (preselectedService) {
      setValue('service', preselectedService)
    }
  }, [preselectedService, setValue])

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputClass = cn(
    'w-full bg-bg-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary',
    'placeholder:text-text-tertiary',
    'focus:outline-none focus:border-border-accent',
    'transition-colors duration-150'
  )

  const labelClass = 'block text-text-secondary text-sm mb-1.5 font-medium'
  const errorClass = 'text-danger text-xs mt-1'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t('name')}{' '}
            <span className="text-danger" aria-hidden>
              *
            </span>
          </label>
          <input
            id="name"
            type="text"
            className={inputClass}
            placeholder="Juan García"
            {...register('name')}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            {t('email')}{' '}
            <span className="text-danger" aria-hidden>
              *
            </span>
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder="juan@empresa.com"
            {...register('email')}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          {t('company')}
        </label>
        <input
          id="company"
          type="text"
          className={inputClass}
          placeholder="Mi Empresa S.A."
          {...register('company')}
        />
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          {t('service')}{' '}
          <span className="text-danger" aria-hidden>
            *
          </span>
        </label>
        <select
          id="service"
          className={cn(inputClass, 'cursor-pointer')}
          defaultValue={preselectedService}
          {...register('service')}
        >
          <option value="" disabled>
            {t('servicePlaceholder')}
          </option>
          <option value="website">{t('serviceOptions.website')}</option>
          <option value="seo">{t('serviceOptions.seo')}</option>
          <option value="consulting">{t('serviceOptions.consulting')}</option>
          <option value="ecommerce">{t('serviceOptions.ecommerce')}</option>
          <option value="other">{t('serviceOptions.other')}</option>
        </select>
        {errors.service && <p className={errorClass}>{errors.service.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t('message')}{' '}
          <span className="text-danger" aria-hidden>
            *
          </span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={cn(inputClass, 'resize-none')}
          placeholder={t('messagePlaceholder')}
          {...register('message')}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {status === 'success' && (
        <p
          className="text-success text-sm bg-success/10 border border-success/30 rounded-lg px-4 py-3"
          role="status"
        >
          {t('success')}
        </p>
      )}
      {status === 'error' && (
        <p
          className="text-danger text-sm bg-danger/10 border border-danger/30 rounded-lg px-4 py-3"
          role="alert"
        >
          {t('error')}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  )
}

export { ContactForm }

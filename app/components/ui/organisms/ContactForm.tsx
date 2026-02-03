/**
 * ContactForm Organism
 *
 * Complete contact form with:
 * - Client-side validation
 * - Loading states
 * - Success/error feedback
 * - i18n support
 * - Accessibility
 *
 * Usage:
 * <ContactForm onSubmit={async (data) => { ... }} />
 *
 * For Remix integration, use the Form component with an action:
 * <ContactForm method="post" action="/api/contact" />
 */

import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '~/lib/utils'
import { Input } from '../atoms/Input'
import { Textarea } from '../atoms/Textarea'
import { Select } from '../atoms/Select'
import { Button } from '../atoms/Button'
import { Spinner } from '../atoms/Spinner'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormProps {
  /** Custom submit handler */
  onSubmit?: (data: ContactFormData) => Promise<void>
  /** Additional class names */
  className?: string
  /** Show subject selector (default: true) */
  showSubject?: boolean
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm({
  onSubmit,
  className,
  showSubject = true,
}: ContactFormProps) {
  const { t } = useTranslation()

  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Subject options
  const subjectOptions = [
    { value: 'general', label: t('contact.subjects.general') },
    { value: 'collaboration', label: t('contact.subjects.collaboration') },
    { value: 'sponsorship', label: t('contact.subjects.sponsorship') },
    { value: 'press', label: t('contact.subjects.press') },
    { value: 'other', label: t('contact.subjects.other') },
  ]

  // Validation
  const validate = (data: ContactFormData): FormErrors => {
    const newErrors: FormErrors = {}

    if (!data.name.trim()) {
      newErrors.name = t('contact.errors.nameRequired')
    } else if (data.name.trim().length < 2) {
      newErrors.name = t('contact.errors.nameTooShort')
    }

    if (!data.email.trim()) {
      newErrors.email = t('contact.errors.emailRequired')
    } else if (!EMAIL_REGEX.test(data.email)) {
      newErrors.email = t('contact.errors.emailInvalid')
    }

    if (showSubject && !data.subject) {
      newErrors.subject = t('contact.errors.subjectRequired')
    }

    if (!data.message.trim()) {
      newErrors.message = t('contact.errors.messageRequired')
    } else if (data.message.trim().length < 10) {
      newErrors.message = t('contact.errors.messageTooShort')
    }

    return newErrors
  }

  // Handle field change
  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Handle field blur (for validation)
  const handleBlur = (field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }))

    // Validate single field
    const fieldErrors = validate(formData)
    if (fieldErrors[field]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }))
    }
  }

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    // If there are errors, don't submit
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setStatus('submitting')

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Default: simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
      }

      setStatus('success')
      // Reset form after success
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  // Reset status after showing success/error
  const handleReset = () => {
    setStatus('idle')
  }

  // Success state
  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center',
          className
        )}
      >
        <CheckCircleIcon className="mb-4 h-12 w-12 text-green-500" />
        <h3 className="mb-2 font-montserrat text-xl font-semibold text-white">
          {t('contact.success.title')}
        </h3>
        <p className="mb-4 text-gray-300">{t('contact.success.message')}</p>
        <Button variant="outline" onClick={handleReset}>
          {t('contact.success.sendAnother')}
        </Button>
      </div>
    )
  }

  // Error state
  if (status === 'error') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center',
          className
        )}
      >
        <ExclamationCircleIcon className="mb-4 h-12 w-12 text-red-500" />
        <h3 className="mb-2 font-montserrat text-xl font-semibold text-white">
          {t('contact.error.title')}
        </h3>
        <p className="mb-4 text-gray-300">{t('contact.error.message')}</p>
        <Button variant="outline" onClick={handleReset}>
          {t('contact.error.tryAgain')}
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      noValidate
    >
      {/* Name and Email row */}
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label={t('contact.fields.name')}
          placeholder={t('contact.placeholders.name')}
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          error={touched.name ? errors.name : undefined}
          required
          disabled={status === 'submitting'}
        />
        <Input
          type="email"
          label={t('contact.fields.email')}
          placeholder={t('contact.placeholders.email')}
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          error={touched.email ? errors.email : undefined}
          required
          disabled={status === 'submitting'}
        />
      </div>

      {/* Subject */}
      {showSubject && (
        <Select
          label={t('contact.fields.subject')}
          placeholder={t('contact.placeholders.subject')}
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          onBlur={() => handleBlur('subject')}
          error={touched.subject ? errors.subject : undefined}
          options={subjectOptions}
          required
          disabled={status === 'submitting'}
        />
      )}

      {/* Message */}
      <Textarea
        label={t('contact.fields.message')}
        placeholder={t('contact.placeholders.message')}
        value={formData.message}
        onChange={(e) => handleChange('message', e.target.value)}
        onBlur={() => handleBlur('message')}
        error={touched.message ? errors.message : undefined}
        rows={5}
        required
        disabled={status === 'submitting'}
      />

      {/* Submit button */}
      <Button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full md:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Spinner size="sm" className="mr-2" />
            {t('contact.sending')}
          </>
        ) : (
          t('contact.submit')
        )}
      </Button>
    </form>
  )
}

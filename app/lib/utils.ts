/**
 * Utility functions
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names with Tailwind merge support
 * Prevents class conflicts and duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats date according to language
 */
export function formatDate(date: string | Date, lang: 'es' | 'en' = 'es') {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Generates WhatsApp link with pre-filled message
 */
export function getWhatsAppLink(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

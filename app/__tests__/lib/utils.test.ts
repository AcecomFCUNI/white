import { describe, it, expect } from 'vitest'
import { cn, formatDate, getWhatsAppLink } from '~/lib/utils'

describe('cn()', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('resolves Tailwind conflicts (last wins)', () => {
    expect(cn('p-4', 'p-6')).toBe('p-6')
  })

  it('resolves complex Tailwind conflicts', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
  })

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar')
  })
})

describe('formatDate()', () => {
  const testDate = '2024-03-15T12:00:00Z'

  it('formats in Spanish (es-PE) by default', () => {
    const result = formatDate(testDate)
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('formats in English (en-US)', () => {
    const result = formatDate(testDate, 'en')
    expect(result).toContain('15')
    expect(result).toContain('2024')
  })

  it('accepts Date objects', () => {
    const date = new Date('2024-03-15T12:00:00Z')
    const result = formatDate(date)
    expect(result).toContain('2024')
  })

  it('Spanish format contains month name in Spanish', () => {
    const result = formatDate(testDate, 'es')
    expect(result.toLowerCase()).toContain('marzo')
  })

  it('English format contains month name in English', () => {
    const result = formatDate(testDate, 'en')
    expect(result).toContain('March')
  })
})

describe('getWhatsAppLink()', () => {
  it('generates correct WhatsApp URL', () => {
    const link = getWhatsAppLink('51999999999', 'Hola')
    expect(link).toBe('https://wa.me/51999999999?text=Hola')
  })

  it('encodes special characters in message', () => {
    const link = getWhatsAppLink('51999999999', 'Hola mundo!')
    expect(link).toBe('https://wa.me/51999999999?text=Hola%20mundo!')
  })

  it('encodes spaces and symbols', () => {
    const link = getWhatsAppLink('123', 'price: $100 & more')
    expect(link).toContain('text=price%3A%20%24100%20%26%20more')
  })
})

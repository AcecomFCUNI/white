import { describe, it, expect, vi } from 'vitest'

// Mock the Sanity client to avoid real connections
vi.mock('~/sanity/lib/client', () => ({
  client: { config: () => ({ projectId: 'test', dataset: 'test' }) },
  projectId: 'test',
  dataset: 'test',
  apiVersion: '2024-01-01',
}))

vi.mock('@sanity/image-url', () => ({
  createImageUrlBuilder: vi.fn(() => ({ image: vi.fn() })),
}))

import { getLocalizedValue } from '~/sanity/lib/image'

describe('getLocalizedValue()', () => {
  it('returns Spanish value when lang is es', () => {
    const obj = { es: 'Hola', en: 'Hello' }
    expect(getLocalizedValue(obj, 'es')).toBe('Hola')
  })

  it('returns English value when lang is en', () => {
    const obj = { es: 'Hola', en: 'Hello' }
    expect(getLocalizedValue(obj, 'en')).toBe('Hello')
  })

  it('falls back to Spanish when English is missing', () => {
    const obj = { es: 'Solo español' }
    expect(getLocalizedValue(obj, 'en')).toBe('Solo español')
  })

  it('falls back to English when Spanish is missing', () => {
    const obj = { en: 'English only' }
    expect(getLocalizedValue(obj, 'es')).toBe('English only')
  })

  it('returns undefined for null input', () => {
    expect(getLocalizedValue(null, 'es')).toBeUndefined()
  })

  it('returns undefined for undefined input', () => {
    expect(getLocalizedValue(undefined, 'es')).toBeUndefined()
  })

  it('returns undefined when both languages are missing', () => {
    const obj = {}
    expect(getLocalizedValue(obj, 'es')).toBeUndefined()
  })

  it('works with non-string values (arrays)', () => {
    const obj = { es: ['a', 'b'], en: ['c', 'd'] }
    expect(getLocalizedValue(obj, 'es')).toEqual(['a', 'b'])
    expect(getLocalizedValue(obj, 'en')).toEqual(['c', 'd'])
  })
})

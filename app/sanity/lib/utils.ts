/**
 * Sanity utility functions (client-safe, no Sanity SDK dependency)
 */

/**
 * Helper to get localized value based on current language
 */
export function getLocalizedValue<T>(
  obj: { es?: T; en?: T } | undefined | null,
  lang: string
): T | undefined {
  if (!obj) return undefined
  return lang === 'en' ? obj.en ?? obj.es : obj.es ?? obj.en
}

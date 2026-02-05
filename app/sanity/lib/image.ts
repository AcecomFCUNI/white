/**
 * Sanity Image URL Builder
 *
 * Helper functions to generate optimized image URLs from Sanity assets.
 */
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const { projectId, dataset } = client.config()

/**
 * Creates an image URL builder for a Sanity image asset
 */
export function urlFor(source: SanityImageSource) {
  if (!projectId || !dataset) {
    throw new Error('Sanity projectId and dataset must be configured')
  }
  return createImageUrlBuilder({ projectId, dataset }).image(source)
}

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

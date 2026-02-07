/**
 * Sanity Image URL Builder (server-only)
 *
 * Only used in loaders. Uses hardcoded config to avoid
 * pulling @sanity/client into the client bundle.
 */
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

const projectId = 'oh7nanvc'
const dataset = 'production'

/**
 * Creates an image URL builder for a Sanity image asset
 */
export function urlFor(source: SanityImageSource) {
  return createImageUrlBuilder({ projectId, dataset }).image(source)
}

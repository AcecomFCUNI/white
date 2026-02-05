/**
 * Sanity Client Configuration
 *
 * Used for fetching content from the Sanity Content Lake.
 * Follows React Router/Remix integration pattern from Sanity docs.
 */
import { createClient } from '@sanity/client'

// Public configuration (safe to expose in browser)
export const projectId = 'oh7nanvc'
export const dataset = 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Use CDN for better performance
  useCdn: true,
})

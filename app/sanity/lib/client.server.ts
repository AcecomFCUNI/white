/**
 * Sanity Client Configuration (server-only)
 *
 * This file is server-only (.server.ts) to prevent @sanity/client
 * from being bundled into the client JavaScript (~251KB savings).
 */
import { createClient } from '@sanity/client'

// Public configuration
export const projectId = 'oh7nanvc'
export const dataset = 'production'
export const apiVersion = '2024-01-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

// Client with token for authenticated requests (previews, mutations)
export const getAuthenticatedClient = () => {
  const token = process.env.SANITY_API_READ_TOKEN
  if (!token) {
    console.warn('SANITY_API_READ_TOKEN not set, preview mode will not work')
    return client
  }
  return client.withConfig({ token })
}

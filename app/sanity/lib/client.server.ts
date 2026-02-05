/**
 * Sanity Server Client Configuration
 *
 * Server-only client with authentication for previews and mutations.
 * This file uses process.env which only works on the server.
 */
import { client } from './client'

// Client with token for authenticated requests (previews, mutations)
export const getAuthenticatedClient = () => {
  const token = process.env.SANITY_API_READ_TOKEN
  if (!token) {
    console.warn('SANITY_API_READ_TOKEN not set, preview mode will not work')
    return client
  }
  return client.withConfig({ token })
}

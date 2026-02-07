/**
 * Sanity Library Exports
 *
 * Client-safe barrel: only exports that don't pull in @sanity/client.
 * For the Sanity client, import directly from './client.server'.
 */

// Utilities (client-safe, no Sanity SDK dependency)
export { getLocalizedValue } from './utils'

// Queries (client-safe, only uses groq)
export * from './queries'

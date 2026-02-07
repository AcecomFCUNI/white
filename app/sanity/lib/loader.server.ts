/**
 * Sanity Loader (Server-side)
 *
 * Provides server-side data loading with support for preview mode.
 * Used in Remix loaders to fetch content from Sanity.
 */
import { loadQuery, setServerClient } from '@sanity/react-loader'
import { getAuthenticatedClient } from './client.server'

// Initialize the server client with authentication for previews
setServerClient(getAuthenticatedClient())

export { loadQuery }

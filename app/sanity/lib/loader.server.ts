/**
 * Sanity Loader (Server-side)
 *
 * Provides server-side data loading with support for preview mode.
 * Used in Remix loaders to fetch content from Sanity.
 */
import { loadQuery, setServerClient } from '@sanity/react-loader'
import { client } from './client'
import { getAuthenticatedClient } from './client.server'

// Initialize the server client with authentication for previews
const serverClient = getAuthenticatedClient()
setServerClient(serverClient)

export { loadQuery }

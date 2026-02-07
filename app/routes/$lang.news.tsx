/**
 * English News Route - Redirects to /noticias
 * Handles /en/news -> /en/noticias redirect for SEO and user convenience
 */

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { validateLang } from '~/lib/i18n-routes'

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = validateLang(params.lang)
  throw redirect(`/${lang}/noticias`, 301)
}

export default function NewsRedirect() {
  // This should never render due to the redirect
  return null
}

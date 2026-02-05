/**
 * English News Route - Redirects to /noticias
 * Handles /en/news -> /en/noticias redirect for SEO and user convenience
 */

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { supportedLanguages, type Language } from '~/lib/i18n-routes'

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang as Language

  // Validate language
  if (!supportedLanguages.includes(lang)) {
    throw redirect('/es/noticias')
  }

  // Redirect to the canonical noticias route
  throw redirect(`/${lang}/noticias`, 301)
}

export default function NewsRedirect() {
  // This should never render due to the redirect
  return null
}

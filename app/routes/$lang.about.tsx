/**
 * English About Route - Redirects to /nosotros
 * Handles /en/about -> /en/nosotros redirect for SEO and user convenience
 */

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { validateLang } from '~/lib/i18n-routes'

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = validateLang(params.lang)
  throw redirect(`/${lang}/nosotros`, 301)
}

export default function AboutRedirect() {
  return null
}

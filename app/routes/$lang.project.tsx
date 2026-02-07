/**
 * English Project Route - Redirects to /proyecto
 * Handles /en/project -> /en/proyecto redirect for SEO and user convenience
 */

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { validateLang } from '~/lib/i18n-routes'

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = validateLang(params.lang)
  throw redirect(`/${lang}/proyecto`, 301)
}

export default function ProjectRedirect() {
  return null
}

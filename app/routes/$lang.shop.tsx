/**
 * English Shop Route - Redirects to /tienda
 */

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { validateLang } from '~/lib/i18n-routes'

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = validateLang(params.lang)
  throw redirect(`/${lang}/tienda`, 301)
}

export default function ShopRedirect() {
  return null
}

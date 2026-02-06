/**
 * English Shop Route - Redirects to /tienda
 */

import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { supportedLanguages, type Language } from '~/lib/i18n-routes'

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang as Language

  if (!supportedLanguages.includes(lang)) {
    throw redirect('/es/tienda')
  }

  throw redirect(`/${lang}/tienda`, 301)
}

export default function ShopRedirect() {
  return null
}

/**
 * Root index - redirects to language-prefixed route
 */

import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { defaultLanguage, supportedLanguages, type Language } from '~/lib/i18n-routes'

export async function loader({ request }: LoaderFunctionArgs) {
  // Check for language cookie
  const cookieHeader = request.headers.get('Cookie') || ''
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').filter(Boolean).map(c => {
      const [key, ...val] = c.split('=')
      return [key, val.join('=')]
    })
  )

  let detectedLang: Language = defaultLanguage

  // 1. Check cookie
  const cookieLang = cookies['i18next'] as Language
  if (cookieLang && supportedLanguages.includes(cookieLang)) {
    detectedLang = cookieLang
  } else {
    // 2. Check Accept-Language header
    const acceptLang = request.headers.get('Accept-Language')
    if (acceptLang) {
      const browserLang = acceptLang.split(',')[0].split('-')[0] as Language
      if (supportedLanguages.includes(browserLang)) {
        detectedLang = browserLang
      }
    }
  }

  return redirect(`/${detectedLang}`)
}

// This component won't render due to redirect, but required for route
export default function Index() {
  return null
}

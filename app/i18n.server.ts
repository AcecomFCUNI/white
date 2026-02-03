import { RemixI18Next } from 'remix-i18next/server'
import i18nConfig from './i18n'
import { resources } from './lib/translations'

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18nConfig.supportedLngs,
    fallbackLanguage: i18nConfig.fallbackLng
  },
  i18next: {
    ...i18nConfig,
    resources, // Use bundled translations instead of fs-backend
  }
})

// Helper to get locale from cookie manually
export async function getLocale(request: Request): Promise<string> {
  const cookieHeader = request.headers.get('Cookie') || ''
  const cookies = Object.fromEntries(
    cookieHeader.split('; ').map(c => {
      const [key, ...val] = c.split('=')
      return [key, val.join('=')]
    })
  )

  const cookieLang = cookies['i18next']
  if (cookieLang && i18nConfig.supportedLngs.includes(cookieLang)) {
    return cookieLang
  }

  // Fallback to remix-i18next detection (Accept-Language header, etc.)
  return i18next.getLocale(request)
}

export default i18next

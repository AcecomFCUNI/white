/**
 * i18n Route Mapping
 * Maps routes between languages with native slugs
 */

import { redirect } from '@remix-run/node'

export const supportedLanguages = ['es', 'en'] as const
export type Language = typeof supportedLanguages[number]

export const defaultLanguage: Language = 'es'

// Route mapping: key is the route identifier, value is the slug per language
export const routeMap = {
  home: { es: '', en: '' },
  about: { es: 'nosotros', en: 'about' },
  project: { es: 'proyecto', en: 'project' },
  news: { es: 'noticias', en: 'news' },
  shop: { es: 'tienda', en: 'shop' },
} as const

export type RouteKey = keyof typeof routeMap

// Get the full path for a route in a specific language
export function getLocalizedPath(routeKey: RouteKey, lang: Language): string {
  const slug = routeMap[routeKey][lang]
  return slug ? `/${lang}/${slug}` : `/${lang}`
}

// Find route key from current path
export function getRouteKeyFromPath(path: string): { routeKey: RouteKey; lang: Language } | null {
  // Remove leading slash and split
  const parts = path.replace(/^\//, '').split('/')
  const lang = parts[0] as Language
  const slug = parts[1] || ''

  if (!supportedLanguages.includes(lang)) {
    return null
  }

  // Find the route key that matches this slug for this language
  for (const [key, slugs] of Object.entries(routeMap)) {
    if (slugs[lang] === slug) {
      return { routeKey: key as RouteKey, lang }
    }
  }

  return null
}

// Get equivalent path in another language
export function getAlternateLanguagePath(currentPath: string, targetLang: Language): string {
  const routeInfo = getRouteKeyFromPath(currentPath)

  if (!routeInfo) {
    // Fallback: just replace the language prefix
    return `/${targetLang}`
  }

  return getLocalizedPath(routeInfo.routeKey, targetLang)
}

// Validate lang param, redirect to /es if invalid
export function validateLang(lang: string | undefined): Language {
  if (lang && supportedLanguages.includes(lang as Language)) {
    return lang as Language
  }
  throw redirect('/es')
}

// Navigation items with route keys (for Header)
export const navigationRoutes = [
  { routeKey: 'home' as RouteKey, labelKey: 'nav.home' },
  { routeKey: 'about' as RouteKey, labelKey: 'nav.about' },
  { routeKey: 'project' as RouteKey, labelKey: 'nav.project' },
  { routeKey: 'news' as RouteKey, labelKey: 'nav.news' },
  { routeKey: 'shop' as RouteKey, labelKey: 'nav.shop' },
]

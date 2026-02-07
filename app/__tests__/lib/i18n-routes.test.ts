import { describe, it, expect } from 'vitest'
import {
  supportedLanguages,
  routeMap,
  getLocalizedPath,
  getRouteKeyFromPath,
  getAlternateLanguagePath,
  validateLang,
  navigationRoutes,
} from '~/lib/i18n-routes'

describe('supportedLanguages', () => {
  it('contains es and en', () => {
    expect(supportedLanguages).toContain('es')
    expect(supportedLanguages).toContain('en')
  })

  it('has exactly 2 languages', () => {
    expect(supportedLanguages).toHaveLength(2)
  })
})

describe('routeMap', () => {
  it('has entries for home, about, project, news, shop', () => {
    expect(routeMap).toHaveProperty('home')
    expect(routeMap).toHaveProperty('about')
    expect(routeMap).toHaveProperty('project')
    expect(routeMap).toHaveProperty('news')
    expect(routeMap).toHaveProperty('shop')
  })

  it('home has empty slugs for both languages', () => {
    expect(routeMap.home.es).toBe('')
    expect(routeMap.home.en).toBe('')
  })

  it('about has correct slugs', () => {
    expect(routeMap.about.es).toBe('nosotros')
    expect(routeMap.about.en).toBe('about')
  })
})

describe('getLocalizedPath()', () => {
  it('generates home path for es', () => {
    expect(getLocalizedPath('home', 'es')).toBe('/es')
  })

  it('generates home path for en', () => {
    expect(getLocalizedPath('home', 'en')).toBe('/en')
  })

  it('generates about path for es', () => {
    expect(getLocalizedPath('about', 'es')).toBe('/es/nosotros')
  })

  it('generates about path for en', () => {
    expect(getLocalizedPath('about', 'en')).toBe('/en/about')
  })

  it('generates news path for es', () => {
    expect(getLocalizedPath('news', 'es')).toBe('/es/noticias')
  })

  it('generates shop path for en', () => {
    expect(getLocalizedPath('shop', 'en')).toBe('/en/shop')
  })
})

describe('getRouteKeyFromPath()', () => {
  it('finds home route from /es', () => {
    const result = getRouteKeyFromPath('/es')
    expect(result).toEqual({ routeKey: 'home', lang: 'es' })
  })

  it('finds about route from /es/nosotros', () => {
    const result = getRouteKeyFromPath('/es/nosotros')
    expect(result).toEqual({ routeKey: 'about', lang: 'es' })
  })

  it('finds about route from /en/about', () => {
    const result = getRouteKeyFromPath('/en/about')
    expect(result).toEqual({ routeKey: 'about', lang: 'en' })
  })

  it('returns null for invalid language', () => {
    expect(getRouteKeyFromPath('/fr/about')).toBeNull()
  })

  it('returns null for invalid slug', () => {
    expect(getRouteKeyFromPath('/es/invalid-route')).toBeNull()
  })

  it('returns null for empty path', () => {
    expect(getRouteKeyFromPath('/')).toBeNull()
  })
})

describe('getAlternateLanguagePath()', () => {
  it('switches from es home to en home', () => {
    expect(getAlternateLanguagePath('/es', 'en')).toBe('/en')
  })

  it('switches from es/nosotros to en/about', () => {
    expect(getAlternateLanguagePath('/es/nosotros', 'en')).toBe('/en/about')
  })

  it('switches from en/news to es/noticias', () => {
    expect(getAlternateLanguagePath('/en/news', 'es')).toBe('/es/noticias')
  })

  it('falls back to target lang root for unknown paths', () => {
    expect(getAlternateLanguagePath('/fr/unknown', 'es')).toBe('/es')
  })
})

describe('validateLang()', () => {
  it('returns es for valid es', () => {
    expect(validateLang('es')).toBe('es')
  })

  it('returns en for valid en', () => {
    expect(validateLang('en')).toBe('en')
  })

  it('throws Response for invalid language', () => {
    try {
      validateLang('fr')
      expect.fail('should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(Response)
      const response = error as Response
      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toBe('/es')
    }
  })

  it('throws Response for undefined', () => {
    try {
      validateLang(undefined)
      expect.fail('should have thrown')
    } catch (error) {
      expect(error).toBeInstanceOf(Response)
    }
  })
})

describe('navigationRoutes', () => {
  it('has 5 navigation items', () => {
    expect(navigationRoutes).toHaveLength(5)
  })

  it('each item has routeKey and labelKey', () => {
    for (const route of navigationRoutes) {
      expect(route).toHaveProperty('routeKey')
      expect(route).toHaveProperty('labelKey')
    }
  })

  it('contains home, about, project, news, shop route keys', () => {
    const keys = navigationRoutes.map((r) => r.routeKey)
    expect(keys).toEqual(['home', 'about', 'project', 'news', 'shop'])
  })
})

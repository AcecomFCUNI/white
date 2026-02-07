/**
 * Dynamic Sitemap Generator
 * Generates XML sitemap with all routes in both languages
 */

import { routeMap, supportedLanguages, type Language } from '~/lib/i18n-routes'

const BASE_URL = 'https://chasqui2.pe'

export async function loader() {
  const lastmod = new Date().toISOString().split('T')[0]

  const urls = Object.entries(routeMap)
    .flatMap(([key, slugs]) =>
      supportedLanguages.map((lang) => {
        const slug = slugs[lang as Language]
        const path = slug ? `/${lang}/${slug}` : `/${lang}`
        const priority = key === 'home' ? '1.0' : '0.8'
        const altLang = lang === 'es' ? 'en' : 'es'
        const altSlug = slugs[altLang as Language]
        const altPath = altSlug ? `/${altLang}/${altSlug}` : `/${altLang}`

        return `
  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE_URL}${path}"/>
    <xhtml:link rel="alternate" hreflang="${altLang}" href="${BASE_URL}${altPath}"/>
  </url>`
      })
    )
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>${urls}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

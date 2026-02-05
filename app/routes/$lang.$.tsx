/**
 * Dynamic route handler for all language-prefixed pages
 * Matches: /es/nosotros, /en/about, /es/proyecto, /en/project, etc.
 */

import { LoaderFunctionArgs, redirect, json } from '@remix-run/node'
import type { MetaFunction } from '@remix-run/node'
import { useLoaderData, useRouteError, isRouteErrorResponse } from '@remix-run/react'
import {
  supportedLanguages,
  routeMap,
  type Language,
  type RouteKey
} from '~/lib/i18n-routes'
import { client } from '~/sanity/lib'
import { PRODUCTS_LIST_QUERY } from '~/sanity/lib/queries'

// Import page components
import { AboutPage } from '~/pages/AboutPage'
import { ProjectPage } from '~/pages/ProjectPage'
import { NewsPage } from '~/pages/NewsPage'
import { ShopPage, type SanityProduct } from '~/pages/ShopPage'
import { ErrorPage } from '~/pages/ErrorPage'

// Map route keys to page components
const pageComponents: Record<Exclude<RouteKey, 'home'>, React.ComponentType> = {
  about: AboutPage,
  project: ProjectPage,
  news: NewsPage,
  shop: ShopPage,
}

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang as Language
  const slug = params['*'] || ''

  // Validate language
  if (!supportedLanguages.includes(lang)) {
    throw redirect('/es')
  }

  // Find which route key matches this slug for this language
  let matchedRouteKey: RouteKey | null = null
  for (const [key, slugs] of Object.entries(routeMap)) {
    if (key !== 'home' && slugs[lang] === slug) {
      matchedRouteKey = key as RouteKey
      break
    }
  }

  // If no match, redirect to home
  if (!matchedRouteKey) {
    throw redirect(`/${lang}`)
  }

  // Fetch products from Sanity for the shop page
  let products: SanityProduct[] = []
  if (matchedRouteKey === 'shop') {
    products = await client.fetch<SanityProduct[]>(PRODUCTS_LIST_QUERY)
  }

  return json({ lang, routeKey: matchedRouteKey, slug, products })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return []

  const { lang, routeKey } = data
  const isEnglish = lang === 'en'

  const titles: Record<string, { es: string; en: string }> = {
    about: {
      es: 'Nosotros - Chasqui II',
      en: 'About Us - Chasqui II'
    },
    project: {
      es: 'Proyecto - Chasqui II',
      en: 'Project - Chasqui II'
    },
    news: {
      es: 'Noticias - Chasqui II',
      en: 'News - Chasqui II'
    },
    shop: {
      es: 'Tienda - Chasqui II',
      en: 'Shop - Chasqui II'
    }
  }

  const descriptions: Record<string, { es: string; en: string }> = {
    about: {
      es: 'Conoce al equipo detrás del proyecto Chasqui II',
      en: 'Meet the team behind the Chasqui II project'
    },
    project: {
      es: 'Descubre los detalles técnicos de nuestra misión espacial',
      en: 'Discover the technical details of our space mission'
    },
    news: {
      es: 'Últimas noticias y actualizaciones del proyecto',
      en: 'Latest news and project updates'
    },
    shop: {
      es: 'Apoya nuestra misión con merchandise oficial',
      en: 'Support our mission with official merchandise'
    }
  }

  const title = titles[routeKey]?.[lang] || 'Chasqui II'
  const description = descriptions[routeKey]?.[lang] || ''

  // Get alternate language slug for SEO
  const altLang = isEnglish ? 'es' : 'en'
  const altSlug = routeMap[routeKey as RouteKey]?.[altLang] || ''

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { tagName: 'link', rel: 'alternate', hrefLang: 'es', href: `/es/${routeMap[routeKey as RouteKey]?.es}` },
    { tagName: 'link', rel: 'alternate', hrefLang: 'en', href: `/en/${routeMap[routeKey as RouteKey]?.en}` },
  ]
}

export default function DynamicPage() {
  const { lang, routeKey, products } = useLoaderData<typeof loader>()

  // Special handling for shop page to pass products
  if (routeKey === 'shop') {
    return <ShopPage products={products} lang={lang} />
  }

  const PageComponent = pageComponents[routeKey as Exclude<RouteKey, 'home'>]

  if (!PageComponent) {
    return <ErrorPage status={404} />
  }

  return <PageComponent />
}

/**
 * Error Boundary for route errors
 * Catches errors in loaders, actions, and rendering
 */
export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return <ErrorPage status={error.status} />
  }

  // Log unexpected errors
  console.error('Unexpected error:', error)

  return <ErrorPage status={500} />
}

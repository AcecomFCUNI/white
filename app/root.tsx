import { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams
} from '@remix-run/react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LazyMotion, motionFeatures } from '~/lib/motion'
import { SmoothScroll } from '~/components/layout'
import { supportedLanguages, defaultLanguage, type Language } from '~/lib/i18n-routes'
import '~/assets/css/style.css'
import './tailwind.css'
// Self-hosted variable fonts (eliminates Google Fonts CDN roundtrip)
import '@fontsource-variable/open-sans'
import '@fontsource-variable/montserrat'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
// Import Lenis styles
import 'lenis/dist/lenis.css'

export const links: LinksFunction = () => {
  return [
    // PWA Manifest
    { rel: 'manifest', href: '/manifest.json' },
  ]
}

export const handle = { i18n: 'common' }

export function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams()
  const lang = params.lang as Language
  const validLang = lang && supportedLanguages.includes(lang) ? lang : defaultLanguage

  return (
    <html lang={validLang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/assets/img/logo.png" rel="icon" />
        <link href="/assets/img/logo.png" rel="apple-touch-icon" />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {/* Skip link for accessibility - allows keyboard users to skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          Saltar al contenido principal
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const params = useParams()
  const { i18n } = useTranslation()

  const lang = params.lang as Language
  const validLang = lang && supportedLanguages.includes(lang) ? lang : defaultLanguage

  // Sync i18next with URL language
  useEffect(() => {
    if (i18n.language !== validLang) {
      i18n.changeLanguage(validLang)
    }
  }, [validLang, i18n])

  return (
    <LazyMotion features={motionFeatures} strict>
      <SmoothScroll>
        <Outlet />
      </SmoothScroll>
    </LazyMotion>
  )
}

/**
 * Scrollytelling Landing Page - Chasqui II
 * Language-prefixed home route: /es/ or /en/
 */

import { LoaderFunctionArgs, redirect, json } from '@remix-run/node'
import type { MetaFunction } from '@remix-run/node'
import { useLoaderData, useRouteError, isRouteErrorResponse } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { Header } from '~/sections/shared'
import {
  StoryHero,
  StoryDream,
  StoryTeam,
  StoryMission,
  StoryAlliances,
  StoryCTA,
  StoryContact
} from '~/sections/story'
import { ScrollProgress } from '~/components/animations'
import { supportedLanguages, type Language } from '~/lib/i18n-routes'
import { ErrorPage } from '~/pages/ErrorPage'

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang as Language

  // Validate language
  if (!supportedLanguages.includes(lang)) {
    throw redirect('/es')
  }

  return json({ lang })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const isEnglish = data?.lang === 'en'

  return [
    {
      title: isEnglish
        ? 'Chasqui II - Student Mission to Space'
        : 'Chasqui II - Misión Estudiantil al Espacio'
    },
    {
      name: 'description',
      content: isEnglish
        ? 'The first Peruvian CubeSat designed and built by students from the National University of Engineering'
        : 'El primer CubeSat peruano diseñado y construido por estudiantes de la Universidad Nacional de Ingeniería'
    },
    {
      property: 'og:title',
      content: isEnglish
        ? 'Chasqui II - Student Mission to Space'
        : 'Chasqui II - Misión Estudiantil al Espacio'
    },
    {
      property: 'og:description',
      content: isEnglish
        ? 'Discover the story of the student project that will take Peru to space'
        : 'Descubre la historia del proyecto estudiantil que llevará a Perú al espacio'
    },
    { property: 'og:type', content: 'website' },
    // Alternate language links for SEO
    { tagName: 'link', rel: 'alternate', hrefLang: 'es', href: '/es' },
    { tagName: 'link', rel: 'alternate', hrefLang: 'en', href: '/en' },
  ]
}

export default function LangIndex() {
  const { lang } = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()

  // Sync i18n with URL language
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang)
  }

  return (
    <>
      {/* Progress indicator */}
      <ScrollProgress variant="bar" position="top" color="#db013a" />

      {/* Header */}
      <Header />

      {/* Main scrollytelling content */}
      <main id="main-content" className="relative" role="main">
        {/* Acto 1: Intro/Hero */}
        <StoryHero />

        {/* Acto 2: El Sueño - Our origin story */}
        <StoryDream />

        {/* Acto 3: El Equipo - Team areas */}
        <StoryTeam />

        {/* Acto 4: La Misión - Subsystems */}
        <StoryMission />

        {/* Acto 5: Alianzas - Partners */}
        <StoryAlliances />

        {/* Acto 6: Únete/Apóyanos - CTA */}
        <StoryCTA />

        {/* Acto 7: Contacto + Footer */}
        <StoryContact />
      </main>
    </>
  )
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

/**
 * About Page Route - /es/nosotros | /en/nosotros
 * Fetches team data from Sanity CMS
 */

import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { validateLang, routeMap } from '~/lib/i18n-routes'
import { client, getLocalizedValue } from '~/sanity/lib'
import { TEAM_LEADERSHIP_QUERY, TEAM_MEMBERS_QUERY } from '~/sanity/lib/queries'
import { AboutPage } from '~/pages/AboutPage'
import { RouteErrorBoundary } from '~/components/shared'
import type { SanityTeamLeader, SanityTeamMember } from '~/types'

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = validateLang(params.lang)

  const [leadership, members] = await Promise.all([
    client.fetch(TEAM_LEADERSHIP_QUERY),
    client.fetch(TEAM_MEMBERS_QUERY),
  ])

  return json({ lang, leadership, members })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return []

  const { lang } = data
  const title = lang === 'en' ? 'About Us - Chasqui II' : 'Nosotros - Chasqui II'
  const description = lang === 'en'
    ? 'Meet the team behind the Chasqui II project'
    : 'Conoce al equipo detrás del proyecto Chasqui II'

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { tagName: 'link', rel: 'alternate', hrefLang: 'es', href: `/es/${routeMap.about.es}` },
    { tagName: 'link', rel: 'alternate', hrefLang: 'en', href: `/en/${routeMap.about.en}` },
  ]
}

export default function NosotrosRoute() {
  const { lang, leadership, members } = useLoaderData<typeof loader>()

  const leadershipMembers = leadership.map((m: SanityTeamLeader) => ({
    name: m.name,
    role: getLocalizedValue(m.role, lang) || '',
    quote: getLocalizedValue(m.quote, lang),
    photoUrl: m.photo?.asset?.url,
    email: m.email,
    linkedin: m.linkedin,
  }))

  const teamMembers = members.map((m: SanityTeamMember) => ({
    name: m.name,
    role: getLocalizedValue(m.role, lang) || '',
    area: m.area,
    photoUrl: m.photo?.asset?.url,
    linkedin: m.linkedin,
  }))

  return <AboutPage leadership={leadershipMembers} members={teamMembers} />
}

export { RouteErrorBoundary as ErrorBoundary }

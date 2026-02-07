/**
 * About Page Route - /es/nosotros | /en/nosotros
 * Fetches team data from Sanity CMS
 */

import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { validateLang, routeMap } from '~/lib/i18n-routes'
import { client } from '~/sanity/lib/client.server'
import { getLocalizedValue, TEAM_LEADERSHIP_QUERY, TEAM_MEMBERS_QUERY } from '~/sanity/lib'
import { Header } from '~/sections/shared'
import { StoryContact } from '~/sections/story'
import { FadeInView } from '~/components/animations'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import { TeamMemberCard } from '~/components/ui/molecules'
import { Image } from '~/components/ui/atoms'
import { RouteErrorBoundary } from '~/components/shared'
import type { SanityTeamLeader, SanityTeamMember } from '~/types'

const areaLabels: Record<string, { es: string; en: string }> = {
  stem: { es: 'STEM', en: 'STEM' },
  design: { es: 'Diseño y Publicidad', en: 'Design & Marketing' },
  management: { es: 'Gestión y Logística', en: 'Management & Logistics' },
}

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = validateLang(params.lang)

  const [leadership, members] = await Promise.all([
    client.fetch(TEAM_LEADERSHIP_QUERY),
    client.fetch(TEAM_MEMBERS_QUERY),
  ])

  return json({ lang, leadership, members }, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
  })
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
  const { t } = useTranslation()

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

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black pt-20">
        {/* Hero section */}
        <section className="relative overflow-hidden py-20">
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-0">
            <StarField starCount={80} parallaxEnabled />
            <NebulaOrb
              color="rgba(219, 1, 58, 0.15)"
              size={500}
              position={{ x: '70%', y: '30%' }}
              blur={100}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeInView direction="up">
              <span className="mb-4 inline-block rounded-full border border-gray-700 px-4 py-2 text-xs uppercase tracking-widest text-gray-400">
                {t('about.badge')}
              </span>
            </FadeInView>
            <FadeInView direction="up" delay={0.1}>
              <h1 className="mb-6 font-montserrat text-4xl font-bold text-white md:text-5xl">
                {t('about.title')} <span className="text-brand">Chasqui II</span>
              </h1>
            </FadeInView>
            <FadeInView direction="up" delay={0.2}>
              <p className="text-lg text-gray-300">
                {t('about.subtitle')}
              </p>
            </FadeInView>
          </div>
        </section>

        {/* About content */}
        <section className="relative py-20">
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-12 md:grid-cols-2">
              <FadeInView direction="up">
                <div>
                  <h2 className="mb-6 font-montserrat text-2xl font-bold text-white">
                    {t('about.history.title')}
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>{t('about.history.p1')}</p>
                    <p>{t('about.history.p2')}</p>
                    <p>{t('about.history.p3')}</p>
                  </div>
                </div>
              </FadeInView>

              <FadeInView direction="up" delay={0.2}>
                <div>
                  <h2 className="mb-6 font-montserrat text-2xl font-bold text-white">
                    {t('about.mission.title')}
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>{t('about.mission.p1')}</p>
                    <p>{t('about.mission.p2')}</p>
                  </div>

                  <h2 className="mb-6 mt-8 font-montserrat text-2xl font-bold text-white">
                    {t('about.vision.title')}
                  </h2>
                  <p className="text-gray-300">
                    {t('about.vision.text')}
                  </p>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="relative py-20">
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-0">
            <NebulaOrb
              color="rgba(139, 92, 246, 0.1)"
              size={600}
              position={{ x: '20%', y: '50%' }}
              blur={120}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4">
            <FadeInView direction="up" className="mb-12 text-center">
              <h2 className="mb-4 font-montserrat text-3xl font-bold text-white">
                {t('about.team.title')}
              </h2>
              <p className="text-gray-400">
                {t('about.team.subtitle')}
              </p>
            </FadeInView>

            {/* Leadership */}
            {leadershipMembers.length > 0 && (
              <>
                <div className="mx-auto mb-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {leadershipMembers.map((member: typeof leadershipMembers[number], index: number) => (
                    <FadeInView key={member.name} direction="up" delay={index * 0.1} className="h-full">
                      <TeamMemberCard
                        name={member.name}
                        role={member.role}
                        quote={member.quote}
                        photoUrl={member.photoUrl}
                        email={member.email}
                        linkedin={member.linkedin}
                      />
                    </FadeInView>
                  ))}
                </div>
              </>
            )}

            {/* Members by area */}
            {teamMembers.length > 0 && (
              <div className="mt-8 space-y-10">
                {Object.entries(areaLabels).map(([areaKey, labels]) => {
                  const areaMembers = teamMembers.filter((m: typeof teamMembers[number]) => m.area === areaKey)
                  if (areaMembers.length === 0) return null

                  const label = t(`about.team.area.${areaKey}`, labels.es)

                  return (
                    <div key={areaKey}>
                      <FadeInView direction="up">
                        <h3 className="mb-6 text-center font-montserrat text-xl font-semibold text-gray-300">
                          {label}
                        </h3>
                      </FadeInView>
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {areaMembers.map((member: typeof teamMembers[number], index: number) => (
                          <FadeInView key={member.name} direction="up" delay={index * 0.05} className="h-full">
                            <div className="flex h-full flex-col items-center rounded-xl border border-white/10 bg-black/40 p-4 text-center backdrop-blur-xl transition-all hover:border-white/20">
                              <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border border-white/10">
                                <Image
                                  src={member.photoUrl}
                                  alt={member.name}
                                  fallbackText="Foto"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <h4 className="mb-0.5 text-sm font-semibold text-white">{member.name}</h4>
                              <p className="text-xs text-gray-400">{member.role}</p>
                              {member.linkedin && (
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-2 text-gray-500 transition-colors hover:text-white"
                                  aria-label={`LinkedIn de ${member.name}`}
                                >
                                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </FadeInView>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* Contact */}
        <StoryContact />
      </main>
    </>
  )
}

export { RouteErrorBoundary as ErrorBoundary }

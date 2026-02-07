/**
 * Project Page Route - /es/proyecto | /en/proyecto
 * All content via i18n, no Sanity fetch needed
 */

import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useTranslation } from 'react-i18next'
import { validateLang, routeMap } from '~/lib/i18n-routes'
import { Header } from '~/sections/shared'
import { StoryContact } from '~/sections/story'
import { FadeInView } from '~/components/animations'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import { RouteErrorBoundary } from '~/components/shared'
import {
  CpuChipIcon,
  SignalIcon,
  SunIcon,
  CubeIcon,
  BoltIcon,
  GlobeAltIcon,
  WrenchScrewdriverIcon,
  BeakerIcon,
  RocketLaunchIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

const subsystemIcons = {
  payload: BeakerIcon,
  computer: CpuChipIcon,
  comms: SignalIcon,
  thermal: SunIcon,
  attitude: Cog6ToothIcon,
  ground: GlobeAltIcon,
  structure: CubeIcon,
  manufacturing: WrenchScrewdriverIcon,
  power: BoltIcon,
  propulsion: RocketLaunchIcon
}

const subsystemKeys = [
  'payload',
  'computer',
  'comms',
  'thermal',
  'attitude',
  'ground',
  'structure',
  'manufacturing',
  'power',
  'propulsion'
] as const

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = validateLang(params.lang)
  return json({ lang })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return []

  const { lang } = data
  const title = lang === 'en' ? 'Project - Chasqui II' : 'Proyecto - Chasqui II'
  const description = lang === 'en'
    ? 'Discover the technical details of our space mission'
    : 'Descubre los detalles técnicos de nuestra misión espacial'

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { tagName: 'link', rel: 'alternate', hrefLang: 'es', href: `/es/${routeMap.project.es}` },
    { tagName: 'link', rel: 'alternate', hrefLang: 'en', href: `/en/${routeMap.project.en}` },
  ]
}

export default function ProyectoRoute() {
  const { t } = useTranslation()

  const specs = [
    { labelKey: 'project.specs.type', valueKey: 'project.specs.typeValue' },
    { labelKey: 'project.specs.dimensions', valueKey: 'project.specs.dimensionsValue' },
    { labelKey: 'project.specs.mass', valueKey: 'project.specs.massValue' },
    { labelKey: 'project.specs.orbit', valueKey: 'project.specs.orbitValue' },
    { labelKey: 'project.specs.lifespan', valueKey: 'project.specs.lifespanValue' },
    { labelKey: 'project.specs.power', valueKey: 'project.specs.powerValue' }
  ]

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black pt-20">
        {/* Hero section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <StarField starCount={100} parallaxEnabled />
            <NebulaOrb
              color="rgba(59, 130, 246, 0.15)"
              size={600}
              position={{ x: '80%', y: '40%' }}
              blur={120}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeInView direction="up">
              <span className="mb-4 inline-block rounded-full border border-gray-700 px-4 py-2 text-xs uppercase tracking-widest text-gray-400">
                {t('project.badge')}
              </span>
            </FadeInView>
            <FadeInView direction="up" delay={0.1}>
              <h1 className="mb-6 font-montserrat text-4xl font-bold text-white md:text-5xl">
                {t('project.title')} <span className="text-brand">CubeSat</span>
              </h1>
            </FadeInView>
            <FadeInView direction="up" delay={0.2}>
              <p className="text-lg text-gray-300">
                {t('project.subtitle')}
              </p>
            </FadeInView>
          </div>
        </section>

        {/* Specifications */}
        <section className="relative py-16">
          <div className="mx-auto max-w-6xl px-4">
            <FadeInView direction="up" className="mb-8 text-center">
              <h2 className="mb-4 font-montserrat text-2xl font-bold text-white">
                {t('project.specsTitle')}
              </h2>
            </FadeInView>

            <FadeInView direction="up" delay={0.1}>
              <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {specs.map((spec) => (
                  <div
                    key={spec.labelKey}
                    className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-center"
                  >
                    <div className="mb-1 text-sm text-gray-400">{t(spec.labelKey)}</div>
                    <div className="font-montserrat font-bold text-white">
                      {t(spec.valueKey)}
                    </div>
                  </div>
                ))}
              </div>
            </FadeInView>
          </div>
        </section>

        {/* Subsystems */}
        <section className="relative py-20">
          <div className="absolute inset-0">
            <NebulaOrb
              color="rgba(219, 1, 58, 0.1)"
              size={800}
              position={{ x: '30%', y: '50%' }}
              blur={150}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4">
            <FadeInView direction="up" className="mb-12 text-center">
              <h2 className="mb-4 font-montserrat text-3xl font-bold text-white">
                {t('project.subsystemsTitle')}
              </h2>
              <p className="text-gray-400">
                {t('project.subsystemsSubtitle')}
              </p>
            </FadeInView>

            <div className="grid gap-6 md:grid-cols-2">
              {subsystemKeys.map((key, index) => {
                const Icon = subsystemIcons[key]
                return (
                  <FadeInView
                    key={key}
                    direction="up"
                    delay={index * 0.05}
                    className="h-full"
                  >
                    <div className="flex h-full flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm transition-all hover:border-brand/30">
                      <div className="mb-4 flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand/10">
                          <Icon className="h-6 w-6 text-brand" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-2 font-montserrat text-lg font-semibold text-white">
                            {t(`project.subsystems.${key}.name`)}
                          </h3>
                          <p className="text-sm text-gray-300">
                            {t(`project.subsystems.${key}.description`)}
                          </p>
                        </div>
                      </div>
                      <ul className="ml-16 mt-auto space-y-1">
                        {[1, 2, 3].map((num) => (
                          <li
                            key={num}
                            className="flex items-center gap-2 text-sm text-gray-400"
                          >
                            <span className="h-1 w-1 rounded-full bg-brand" />
                            {t(`project.subsystems.${key}.detail${num}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeInView>
                )
              })}
            </div>
          </div>
        </section>

        {/* Contact */}
        <StoryContact />
      </main>
    </>
  )
}

export { RouteErrorBoundary as ErrorBoundary }

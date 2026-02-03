/**
 * About Us Page Component
 * Supports both Spanish and English
 */

import { useTranslation } from 'react-i18next'
import { Header } from '~/sections/shared'
import { StoryContact } from '~/sections/story'
import { FadeInView } from '~/components/animations'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'

const directiva = [
  {
    name: 'Raul Figueroa',
    positionKey: 'about.team.director',
    image: '/assets/img/directiva/rfigueroa.jpg'
  },
  {
    name: 'Jairo Solano',
    positionKey: 'about.team.coordinator',
    image: '/assets/img/directiva/jsolano.jpg'
  }
]

export function AboutPage() {
  const { t } = useTranslation()

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black pt-20">
        {/* Hero section */}
        <section className="relative overflow-hidden py-20">
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

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {directiva.map((member, index) => (
                <FadeInView key={member.name} direction="up" delay={index * 0.1} className="h-full">
                  <div className="flex h-full flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm">
                    <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-brand/50">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%231f2937' width='100' height='100'/%3E%3Ccircle cx='50' cy='40' r='20' fill='%236b7280'/%3E%3Cellipse cx='50' cy='85' rx='30' ry='25' fill='%236b7280'/%3E%3C/svg%3E"
                        }}
                      />
                    </div>
                    <h3 className="mb-1 font-montserrat text-lg font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="mt-auto text-sm text-brand">{t(member.positionKey)}</p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <StoryContact />
      </main>
    </>
  )
}

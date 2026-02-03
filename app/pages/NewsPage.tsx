/**
 * News Page Component
 * Supports both Spanish and English
 */

import { useTranslation } from 'react-i18next'
import { Header } from '~/sections/shared'
import { StoryContact } from '~/sections/story'
import { FadeInView } from '~/components/animations'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import { CalendarIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const featuredNews = {
  titleKey: 'news.featured.title',
  excerptKey: 'news.featured.excerpt',
  date: '2024-11-15',
  image: '/assets/img/news/flit.png',
  categoryKey: 'news.categories.event'
}

const newsItems = [
  {
    titleKey: 'news.items.comms.title',
    excerptKey: 'news.items.comms.excerpt',
    date: '2024-10-28',
    image: '/assets/img/news/academia.png',
    categoryKey: 'news.categories.technical'
  },
  {
    titleKey: 'news.items.unitec.title',
    excerptKey: 'news.items.unitec.excerpt',
    date: '2024-09-20',
    image: '/assets/img/news/unitec.png',
    categoryKey: 'news.categories.event'
  },
  {
    titleKey: 'news.items.newMembers.title',
    excerptKey: 'news.items.newMembers.excerpt',
    date: '2024-08-15',
    image: '/assets/img/news/team.png',
    categoryKey: 'news.categories.team'
  },
  {
    titleKey: 'news.items.apsco.title',
    excerptKey: 'news.items.apsco.excerpt',
    date: '2024-07-10',
    image: '/assets/img/news/apsco.png',
    categoryKey: 'news.categories.international'
  },
  {
    titleKey: 'news.items.iac.title',
    excerptKey: 'news.items.iac.excerpt',
    date: '2024-06-25',
    image: '/assets/img/news/iac.png',
    categoryKey: 'news.categories.research'
  },
  {
    titleKey: 'news.items.workshop.title',
    excerptKey: 'news.items.workshop.excerpt',
    date: '2024-05-18',
    image: '/assets/img/news/workshop.png',
    categoryKey: 'news.categories.infrastructure'
  }
]

export function NewsPage() {
  const { t, i18n } = useTranslation()

  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black pt-20">
        {/* Hero section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <StarField starCount={80} parallaxEnabled />
            <NebulaOrb
              color="rgba(59, 130, 246, 0.15)"
              size={500}
              position={{ x: '70%', y: '30%' }}
              blur={100}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeInView direction="up">
              <span className="mb-4 inline-block rounded-full border border-gray-700 px-4 py-2 text-xs uppercase tracking-widest text-gray-400">
                {t('news.badge')}
              </span>
            </FadeInView>
            <FadeInView direction="up" delay={0.1}>
              <h1 className="mb-6 font-montserrat text-4xl font-bold text-white md:text-5xl">
                <span className="text-brand">{t('news.titleHighlight')}</span> {t('news.title')}
              </h1>
            </FadeInView>
            <FadeInView direction="up" delay={0.2}>
              <p className="text-lg text-gray-300">
                {t('news.subtitle')}
              </p>
            </FadeInView>
          </div>
        </section>

        {/* Featured news */}
        <section className="relative py-12">
          <div className="mx-auto max-w-6xl px-4">
            <FadeInView direction="up">
              <article className="group overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-brand/30">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video overflow-hidden md:aspect-auto">
                    <img
                      src={featuredNews.image}
                      alt={t(featuredNews.titleKey)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%231f2937' width='600' height='400'/%3E%3Ctext fill='%236b7280' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif'%3EImage%3C/text%3E%3C/svg%3E"
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <div className="mb-4 flex items-center gap-4">
                      <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-medium text-brand">
                        {t(featuredNews.categoryKey)}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-400">
                        <CalendarIcon className="h-4 w-4" />
                        {formatDate(featuredNews.date)}
                      </span>
                    </div>
                    <h2 className="mb-4 font-montserrat text-2xl font-bold text-white md:text-3xl">
                      {t(featuredNews.titleKey)}
                    </h2>
                    <p className="mb-6 text-gray-300">{t(featuredNews.excerptKey)}</p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 text-brand transition-colors hover:text-white"
                    >
                      {t('news.readMore')}
                      <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            </FadeInView>
          </div>
        </section>

        {/* News grid */}
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
            <FadeInView direction="up" className="mb-12">
              <h2 className="font-montserrat text-2xl font-bold text-white">
                {t('news.moreNews')}
              </h2>
            </FadeInView>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newsItems.map((item, index) => (
                <FadeInView key={item.titleKey} direction="up" delay={index * 0.1} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-brand/30">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={t(item.titleKey)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225'%3E%3Crect fill='%231f2937' width='400' height='225'/%3E%3Ctext fill='%236b7280' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif'%3EImage%3C/text%3E%3C/svg%3E"
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="rounded-full bg-brand/20 px-2 py-0.5 text-xs font-medium text-brand">
                          {t(item.categoryKey)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(item.date)}
                        </span>
                      </div>
                      <h3 className="mb-2 font-montserrat text-lg font-semibold text-white line-clamp-2">
                        {t(item.titleKey)}
                      </h3>
                      <p className="mb-4 flex-1 text-sm text-gray-400 line-clamp-2">
                        {t(item.excerptKey)}
                      </p>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-sm text-brand transition-colors hover:text-white"
                      >
                        {t('news.readMore')}
                        <ArrowRightIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </article>
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

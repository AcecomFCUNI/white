/**
 * News Page Route - Connected to Sanity CMS
 * Fetches news articles from Sanity and displays them
 */

import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { client, getLocalizedValue } from '~/sanity/lib'
import { NEWS_LIST_QUERY } from '~/sanity/lib/queries'
import { Header } from '~/sections/shared'
import { StoryContact } from '~/sections/story'
import { FadeInView } from '~/components/animations'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import { NewsCard } from '~/components/ui/molecules'
import { validateLang } from '~/lib/i18n-routes'

// Category config: labels and badge colors
const categoryConfig: Record<string, { es: string; en: string; color: 'purple' | 'blue' | 'green' | 'yellow' | 'red' }> = {
  launch: { es: 'Lanzamiento', en: 'Launch', color: 'red' },
  event: { es: 'Evento', en: 'Event', color: 'blue' },
  achievement: { es: 'Logro', en: 'Achievement', color: 'green' },
  partnership: { es: 'Alianza', en: 'Partnership', color: 'purple' },
  technical: { es: 'Técnico', en: 'Technical', color: 'yellow' },
}

interface SanityNews {
  _id: string
  title: { es?: string; en?: string }
  slug: { current: string }
  excerpt: { es?: string; en?: string }
  publishedAt: string
  featured: boolean
  category?: string
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = validateLang(params.lang)

  const news = await client.fetch<SanityNews[]>(NEWS_LIST_QUERY)

  return json({ news, lang })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return []

  const { lang } = data
  const title = lang === 'en' ? 'News - Chasqui II' : 'Noticias - Chasqui II'
  const description = lang === 'en'
    ? 'Stay updated with the latest news, events and achievements of the Chasqui II project'
    : 'Mantente al día con las últimas noticias, eventos y logros del proyecto Chasqui II'

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
  ]
}

export default function NewsRoute() {
  const { news, lang } = useLoaderData<typeof loader>()
  const { t } = useTranslation()

  // Format date
  function formatDate(dateString: string) {
    const date = new Date(dateString)
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Separate featured and regular news
  const featuredNews = news.find((n) => n.featured)
  const regularNews = news.filter((n) => !n.featured)

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black pt-20">
        {/* Hero section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0">
            <StarField starCount={80} parallaxEnabled />
            <NebulaOrb
              color="rgba(139, 92, 246, 0.2)"
              size={500}
              position={{ x: '20%', y: '30%' }}
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
        {featuredNews && (
          <section className="relative py-12">
            <div className="relative z-10 mx-auto max-w-6xl px-4">
              <FadeInView direction="up">
                <NewsCard
                  featured
                  title={getLocalizedValue(featuredNews.title, lang) || ''}
                  excerpt={getLocalizedValue(featuredNews.excerpt, lang) || ''}
                  imageUrl={featuredNews.image?.asset?.url}
                  href={`/${lang}/noticias/${featuredNews.slug.current}`}
                  category={
                    featuredNews.category && categoryConfig[featuredNews.category]
                      ? {
                          name: categoryConfig[featuredNews.category][lang as 'es' | 'en'],
                          color: categoryConfig[featuredNews.category].color,
                        }
                      : undefined
                  }
                  publishedAt={formatDate(featuredNews.publishedAt)}
                  readMoreLabel={t('news.readMore')}
                />
              </FadeInView>
            </div>
          </section>
        )}

        {/* News grid */}
        <section className="relative py-20">
          <div className="absolute inset-0">
            <NebulaOrb
              color="rgba(219, 1, 58, 0.1)"
              size={600}
              position={{ x: '80%', y: '50%' }}
              blur={120}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4">
            {news.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-lg text-gray-400">
                  {lang === 'en' ? 'No news available yet.' : 'No hay noticias disponibles aún.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regularNews.map((article, index) => (
                  <FadeInView
                    key={article._id}
                    direction="up"
                    delay={index * 0.1}
                    className="h-full"
                  >
                    <NewsCard
                      title={getLocalizedValue(article.title, lang) || ''}
                      excerpt={getLocalizedValue(article.excerpt, lang) || ''}
                      imageUrl={article.image?.asset?.url}
                      href={`/${lang}/noticias/${article.slug.current}`}
                      category={
                        article.category && categoryConfig[article.category]
                          ? {
                              name: categoryConfig[article.category][lang as 'es' | 'en'],
                              color: categoryConfig[article.category].color,
                            }
                          : undefined
                      }
                      publishedAt={formatDate(article.publishedAt)}
                      readMoreLabel={t('news.readMore')}
                    />
                  </FadeInView>
                ))}
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

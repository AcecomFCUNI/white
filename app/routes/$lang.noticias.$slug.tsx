/**
 * News Detail Page Route - Connected to Sanity CMS
 * Fetches a single news article by slug and displays it
 */

import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { client, getLocalizedValue } from '~/sanity/lib'
import { NEWS_BY_SLUG_QUERY } from '~/sanity/lib/queries'
import { Header } from '~/sections/shared'
import { StoryContact } from '~/sections/story'
import { FadeInView } from '~/components/animations'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import { Badge } from '~/components/ui/atoms'
import { supportedLanguages, type Language } from '~/lib/i18n-routes'
import { redirect } from '@remix-run/node'
import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react'

// Category config: labels and badge colors
const categoryConfig: Record<string, { es: string; en: string; color: 'purple' | 'blue' | 'green' | 'yellow' | 'red' }> = {
  launch: { es: 'Lanzamiento', en: 'Launch', color: 'red' },
  event: { es: 'Evento', en: 'Event', color: 'blue' },
  achievement: { es: 'Logro', en: 'Achievement', color: 'green' },
  partnership: { es: 'Alianza', en: 'Partnership', color: 'purple' },
  technical: { es: 'Técnico', en: 'Technical', color: 'yellow' },
}

interface SanityNewsDetail {
  _id: string
  title: { es?: string; en?: string }
  slug: { current: string }
  excerpt: { es?: string; en?: string }
  body: { es?: PortableTextBlock[]; en?: PortableTextBlock[] }
  publishedAt: string
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
  category?: string
}

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang as Language
  const slug = params.slug

  // Validate language
  if (!supportedLanguages.includes(lang)) {
    throw redirect('/es/noticias')
  }

  if (!slug) {
    throw redirect(`/${lang}/noticias`)
  }

  // Fetch news article from Sanity
  const article = await client.fetch<SanityNewsDetail | null>(NEWS_BY_SLUG_QUERY, { slug })

  if (!article) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ article, lang })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return []

  const { article, lang } = data
  const title = getLocalizedValue(article.title, lang) || 'News'
  const description = getLocalizedValue(article.excerpt, lang) || ''

  return [
    { title: `${title} - Chasqui II` },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    ...(article.image?.asset?.url
      ? [{ property: 'og:image', content: article.image.asset.url }]
      : []),
  ]
}

// Map Sanity colors to Badge variants
const colorToVariant: Record<string, 'section' | 'skill'> = {
  purple: 'section',
  blue: 'skill',
  green: 'skill',
  yellow: 'skill',
  red: 'section',
}

// Portable Text components for rich text rendering
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-6 mt-10 font-montserrat text-3xl font-bold text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 font-montserrat text-2xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 font-montserrat text-xl font-semibold text-white">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-300">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand pl-4 italic text-gray-400">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand underline transition-colors hover:text-brand-light"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-gray-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-gray-300">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
}

export default function NewsDetailRoute() {
  const { article, lang } = useLoaderData<typeof loader>()
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

  const title = getLocalizedValue(article.title, lang) || ''
  const body = lang === 'en' ? article.body?.en : article.body?.es

  return (
    <>
      <Header />

      <main className="min-h-screen bg-black pt-20">
        {/* Hero section with image */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <StarField starCount={50} parallaxEnabled />
            <NebulaOrb
              color="rgba(139, 92, 246, 0.15)"
              size={600}
              position={{ x: '80%', y: '20%' }}
              blur={120}
            />
          </div>

          {/* Featured image */}
          {article.image?.asset?.url && (
            <div className="relative mx-auto max-w-5xl px-4 pt-12">
              <FadeInView direction="up">
                <div className="aspect-video overflow-hidden rounded-2xl">
                  <img
                    src={article.image.asset.url}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </FadeInView>
            </div>
          )}

          {/* Header content */}
          <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 text-center">
            <FadeInView direction="up">
              <Link
                to={`/${lang}/noticias`}
                className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                &larr; {lang === 'en' ? 'Back to News' : 'Volver a Noticias'}
              </Link>
            </FadeInView>

            {article.category && categoryConfig[article.category] && (
              <FadeInView direction="up" delay={0.1}>
                <Badge
                  variant={colorToVariant[categoryConfig[article.category].color] || 'section'}
                  className="mb-4"
                >
                  {categoryConfig[article.category][lang as 'es' | 'en']}
                </Badge>
              </FadeInView>
            )}

            <FadeInView direction="up" delay={0.2}>
              <h1 className="mb-4 font-montserrat text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {title}
              </h1>
            </FadeInView>

            <FadeInView direction="up" delay={0.3}>
              <time className="text-gray-400">
                {formatDate(article.publishedAt)}
              </time>
            </FadeInView>
          </div>
        </section>

        {/* Article content */}
        <section className="relative py-12">
          <div className="absolute inset-0">
            <NebulaOrb
              color="rgba(219, 1, 58, 0.08)"
              size={500}
              position={{ x: '10%', y: '60%' }}
              blur={100}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-3xl px-4">
            <FadeInView direction="up">
              <article className="prose prose-invert max-w-none">
                {body ? (
                  <PortableText value={body as PortableTextBlock[]} components={portableTextComponents} />
                ) : (
                  <p className="text-gray-400">
                    {getLocalizedValue(article.excerpt, lang)}
                  </p>
                )}
              </article>
            </FadeInView>

            {/* Back to news */}
            <FadeInView direction="up" className="mt-12 border-t border-gray-800 pt-8">
              <Link
                to={`/${lang}/noticias`}
                className="inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-light"
              >
                &larr; {t('news.moreNews')}
              </Link>
            </FadeInView>
          </div>
        </section>

        {/* Contact */}
        <StoryContact />
      </main>
    </>
  )
}

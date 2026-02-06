/**
 * Shop Page Route - Connected to Sanity CMS
 * Fetches products from Sanity and displays them
 */

import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { client, getLocalizedValue } from '~/sanity/lib'
import { PRODUCTS_LIST_QUERY } from '~/sanity/lib/queries'
import { Header } from '~/sections/shared'
import { StoryContact } from '~/sections/story'
import { FadeInView } from '~/components/animations'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import { ProductCard } from '~/components/ui/molecules'
import { supportedLanguages, type Language } from '~/lib/i18n-routes'
import { redirect } from '@remix-run/node'

// Types for Sanity product
interface SanityProduct {
  _id: string
  name: { es: string; en: string }
  slug: { current: string }
  description: { es: string; en: string }
  price: number
  inStock: boolean
  featured: boolean
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
  gallery?: Array<{
    asset: {
      _id: string
      url: string
    }
  }>
}

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang as Language

  // Validate language
  if (!supportedLanguages.includes(lang)) {
    throw redirect('/es/tienda')
  }

  // Fetch products from Sanity
  const products = await client.fetch<SanityProduct[]>(PRODUCTS_LIST_QUERY)

  return json({ products, lang })
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return []

  const { lang } = data
  const title = lang === 'en' ? 'Shop - Chasqui II' : 'Tienda - Chasqui II'
  const description = lang === 'en'
    ? 'Support our mission with official merchandise'
    : 'Apoya nuestra misión con merchandise oficial'

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
  ]
}

const WHATSAPP_NUMBER = '519XXXXXXXX' // Replace with actual number

export default function ShopRoute() {
  const { products, lang } = useLoaderData<typeof loader>()
  const { t, i18n } = useTranslation()

  // Sync i18n with URL language
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang)
  }

  function getWhatsAppLink(productName: string) {
    const message = lang === 'en'
      ? `Hello, I'm interested in buying: ${productName} from the Chasqui II project`
      : `Hola, me interesa comprar: ${productName} del proyecto Chasqui II`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
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
              color="rgba(219, 1, 58, 0.2)"
              size={500}
              position={{ x: '20%', y: '30%' }}
              blur={100}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <FadeInView direction="up">
              <span className="mb-4 inline-block rounded-full border border-gray-700 px-4 py-2 text-xs uppercase tracking-widest text-gray-400">
                {t('shop.badge')}
              </span>
            </FadeInView>
            <FadeInView direction="up" delay={0.1}>
              <h1 className="mb-6 font-montserrat text-4xl font-bold text-white md:text-5xl">
                <span className="text-brand">{t('shop.titleHighlight')}</span> {t('shop.title')}
              </h1>
            </FadeInView>
            <FadeInView direction="up" delay={0.2}>
              <p className="text-lg text-gray-300">
                {t('shop.subtitle')}
              </p>
            </FadeInView>
          </div>
        </section>

        {/* Products grid */}
        <section className="relative py-20">
          <div className="absolute inset-0">
            <NebulaOrb
              color="rgba(139, 92, 246, 0.1)"
              size={600}
              position={{ x: '80%', y: '50%' }}
              blur={120}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">
                  {lang === 'en' ? 'No products available yet.' : 'No hay productos disponibles aún.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product, index) => {
                  const name = getLocalizedValue(product.name, lang) || ''
                  const description = getLocalizedValue(product.description, lang) || ''

                  return (
                    <FadeInView
                      key={product._id}
                      direction="up"
                      delay={index * 0.1}
                      className="h-full"
                    >
                      <ProductCard
                        name={name}
                        description={description}
                        price={product.price}
                        imageUrl={product.image?.asset?.url}
                        gallery={product.gallery?.map(img => img.asset?.url).filter(Boolean) as string[]}
                        inStock={product.inStock}
                        buyLink={getWhatsAppLink(name)}
                        buyLabel={t('shop.buyButton')}
                        outOfStockLabel={lang === 'en' ? 'Out of stock' : 'Agotado'}
                      />
                    </FadeInView>
                  )
                })}
              </div>
            )}

            {/* Info banner */}
            <FadeInView direction="up" className="mt-12">
              <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 text-center backdrop-blur-sm">
                <h3 className="mb-2 font-montserrat text-lg font-semibold text-white">
                  {t('shop.howToBuy.title')}
                </h3>
                <p className="text-gray-400">
                  {t('shop.howToBuy.description')}
                </p>
              </div>
            </FadeInView>
          </div>
        </section>

        {/* Contact */}
        <StoryContact />
      </main>
    </>
  )
}

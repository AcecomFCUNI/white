/**
 * Shop Page Component
 * Products redirect to WhatsApp for purchase
 * Supports both Spanish and English
 */

import { useTranslation } from 'react-i18next'
import { Header } from '~/sections/shared'
import { StoryContact } from '~/sections/story'
import { FadeInView } from '~/components/animations'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'

const products = [
  {
    id: 'mug',
    nameKey: 'shop.products.mug.name',
    price: 'S/. 12.00',
    descriptionKey: 'shop.products.mug.description',
    image: '/assets/img/merch/taza.png'
  },
  {
    id: 'keychain',
    nameKey: 'shop.products.keychain.name',
    price: 'S/. 5.00',
    descriptionKey: 'shop.products.keychain.description',
    image: '/assets/img/merch/llavero.png'
  },
  {
    id: 'shirt',
    nameKey: 'shop.products.shirt.name',
    price: 'S/. 50.00',
    descriptionKey: 'shop.products.shirt.description',
    image: '/assets/img/merch/polo.png'
  },
  {
    id: 'stickers',
    nameKey: 'shop.products.stickers.name',
    price: 'S/. 8.00',
    descriptionKey: 'shop.products.stickers.description',
    image: '/assets/img/merch/stickers.png'
  },
  {
    id: 'cap',
    nameKey: 'shop.products.cap.name',
    price: 'S/. 25.00',
    descriptionKey: 'shop.products.cap.description',
    image: '/assets/img/merch/gorra.png'
  },
  {
    id: 'notebook',
    nameKey: 'shop.products.notebook.name',
    price: 'S/. 15.00',
    descriptionKey: 'shop.products.notebook.description',
    image: '/assets/img/merch/libreta.png'
  }
]

const WHATSAPP_NUMBER = '519XXXXXXXX' // Replace with actual number

export function ShopPage() {
  const { t, i18n } = useTranslation()

  function getWhatsAppLink(productName: string) {
    const message = i18n.language === 'en'
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <FadeInView
                  key={product.id}
                  direction="up"
                  delay={index * 0.1}
                  className="h-full"
                >
                  <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-brand/50">
                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-gray-800">
                      <img
                        src={product.image}
                        alt={t(product.nameKey)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%231f2937' width='300' height='300'/%3E%3Ctext fill='%236b7280' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='14'%3EImage not available%3C/text%3E%3C/svg%3E"
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="mb-1 font-montserrat text-lg font-semibold text-white">
                        {t(product.nameKey)}
                      </h3>
                      <p className="mb-3 flex-1 text-sm text-gray-400">
                        {t(product.descriptionKey)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-brand">
                          {product.price}
                        </span>
                        <a
                          href={getWhatsAppLink(t(product.nameKey))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[#1fb855]"
                        >
                          <WhatsAppIcon className="h-4 w-4" />
                          {t('shop.buyButton')}
                        </a>
                      </div>
                    </div>
                  </div>
                </FadeInView>
              ))}
            </div>

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

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

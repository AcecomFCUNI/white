/**
 * StoryCTA - Acto 6: Únete / Apóyanos
 * Call-to-action section with WhatsApp, Merch, and Donations
 */

import { FadeInView } from '~/components/animations/FadeInView'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import { GlowText } from '~/components/effects/GlowText'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Badge, Card, LinkButton } from '~/components/ui'
import { ProductCard } from '~/components/ui/molecules'
import { CONTACT } from '~/lib/constants'

interface MerchProduct {
  name: string
  price: number
  imageUrl?: string
  gallery?: string[]
}

interface StoryCTAProps {
  products?: MerchProduct[]
  lang?: string
}

export function StoryCTA ({ products = [], lang = 'es' }: StoryCTAProps) {
  const { t } = useTranslation()

  return (
    <section
      id="unete"
      className="relative min-h-screen w-full overflow-hidden bg-black py-32"
    >
      {/* Background - Layered nebulas for parallax depth */}
      <div className="absolute inset-0">
        <StarField starCount={50} parallaxEnabled />
        {/* Capa 1 - Fondo profundo */}
        <NebulaOrb
          color="rgba(219, 1, 58, 0.15)"
          size={900}
          position={{ x: '50%', y: '25%' }}
          blur={160}
        />
        {/* Capa 2 - Media izquierda */}
        <NebulaOrb
          color="rgba(37, 211, 102, 0.08)"
          size={500}
          position={{ x: '15%', y: '40%' }}
          blur={100}
        />
        {/* Capa 3 - Media derecha */}
        <NebulaOrb
          color="rgba(139, 92, 246, 0.1)"
          size={450}
          position={{ x: '85%', y: '60%' }}
          blur={90}
        />
        {/* Capa 4 - Cercana */}
        <NebulaOrb
          color="rgba(59, 130, 246, 0.08)"
          size={350}
          position={{ x: '30%', y: '80%' }}
          blur={70}
        />
        {/* Gradient overlay for "landing" effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Main CTA - WhatsApp */}
        <div className="mb-20 text-center">
          <FadeInView direction="up">
            <Badge className="mb-4">{t('cta.badge')}</Badge>
          </FadeInView>
          <FadeInView direction="up" delay={0.1}>
            <h2 className="mb-6 font-montserrat text-4xl font-bold text-white md:text-5xl">
              <GlowText color="#db013a" glowIntensity="low">
                {t('cta.title')}
              </GlowText>
            </h2>
          </FadeInView>
          <FadeInView direction="up" delay={0.2}>
            <p className="mx-auto mb-8 max-w-2xl text-gray-300">
              {t('cta.description')}
            </p>
          </FadeInView>
          <FadeInView direction="up" delay={0.3}>
            <LinkButton
              href={CONTACT.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
            >
              <WhatsAppIcon className="h-6 w-6" />
              {t('cta.whatsappButton')}
            </LinkButton>
          </FadeInView>
        </div>

        {/* Divider */}
        <div className="mx-auto mb-20 h-px w-32 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Merchandise section */}
        <div className="mb-20">
          <FadeInView direction="up">
            <h3 className="mb-8 text-center font-montserrat text-2xl font-bold text-white md:text-3xl">
              {t('cta.merchTitle')}{' '}
              <span className="text-brand">{t('cta.merchHighlight')}</span>
            </h3>
          </FadeInView>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {products.map((product, index) => (
                <FadeInView key={product.name} direction="up" delay={index * 0.1} className="h-full">
                  <ProductCard
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    gallery={product.gallery}
                  />
                </FadeInView>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {t('cta.noProducts', 'Próximamente productos disponibles')}
            </p>
          )}

          <FadeInView direction="up" delay={0.3} className="mt-8 text-center">
            <LinkButton href={`/${lang}/tienda`} variant="outline">
              {t('cta.exploreShop')}
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
          </FadeInView>
        </div>

        {/* Divider */}
        <div className="mx-auto mb-20 h-px w-32 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Donations section */}
        <div className="text-center">
          <FadeInView direction="up">
            <h3 id="apoyanos" className="mb-4 scroll-mt-24 font-montserrat text-2xl font-bold text-white md:text-3xl">
              {t('cta.donationTitle')} <span className="text-brand">{t('cta.donationHighlight')}</span>
            </h3>
          </FadeInView>
          <FadeInView direction="up" delay={0.1}>
            <p className="mx-auto mb-8 max-w-xl text-gray-300">
              {t('cta.donationDescription')}
            </p>
          </FadeInView>

          <FadeInView direction="up" delay={0.2}>
            <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
              {/* Yape */}
              <Card hover={false}>
                <div className="mb-4 flex h-12 items-center justify-center">
                  <span className="text-2xl font-bold text-[#6B2D91]">Yape</span>
                </div>
                <div className="mx-auto mb-4 h-32 w-32 rounded-lg bg-white p-2">
                  {/* QR Placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded bg-gray-100 text-xs text-gray-500">
                    QR Yape
                  </div>
                </div>
                <p className="text-sm text-gray-300">{t('cta.scanQr')}</p>
              </Card>

              {/* Plin */}
              <Card hover={false}>
                <div className="mb-4 flex h-12 items-center justify-center">
                  <span className="text-2xl font-bold text-[#00D4AA]">Plin</span>
                </div>
                <div className="mx-auto mb-4 h-32 w-32 rounded-lg bg-white p-2">
                  {/* QR Placeholder */}
                  <div className="flex h-full w-full items-center justify-center rounded bg-gray-100 text-xs text-gray-500">
                    QR Plin
                  </div>
                </div>
                <p className="text-sm text-gray-300">{t('cta.scanQr')}</p>
              </Card>
            </div>
          </FadeInView>

          <FadeInView direction="up" delay={0.3} className="mt-8">
            <p className="text-sm text-gray-500">
              {t('cta.bankTransfer')}{' '}
              <a href="#contacto" className="text-brand hover:underline">
                {t('cta.contactUs')}
              </a>{' '}
              {t('cta.moreInfo')}
            </p>
          </FadeInView>
        </div>
      </div>

      {/* Gradient overlays for smooth transitions */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

function WhatsAppIcon ({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

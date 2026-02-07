/**
 * StoryAlliances - Acto 5: Alianzas
 * Partner logos with constellation effect
 */

import { useRef } from 'react'
import { useScroll } from 'motion/react'
import { FadeInView } from '~/components/animations/FadeInView'
import { useTranslation } from 'react-i18next'
import { LinkButton, SectionHeader, SectionBackground } from '~/components/ui'

// Partner IDs for translation lookup
const partnerIds = ['ctic', 'ieee', 'acecom', 'graviit'] as const
type PartnerId = typeof partnerIds[number]

const partnerLogos: Record<PartnerId, string> = {
  ctic: '/assets/img/partners/ctic_logo.svg',
  ieee: '/assets/img/partners/ieee_uni_aess-logo.svg',
  acecom: '/assets/img/partners/acecom_logo.svg',
  graviit: '/assets/img/partners/01_GRAVIIT_Space_-_Logo_Negro.svg'
}

export function StoryAlliances () {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  // Scroll tracking for potential future animations
  useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black py-32"
    >
      {/* Background */}
      <SectionBackground preset="alliances" gradientTop={false} />

      {/* Top gradient for smoother transition from Mission section */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-40 bg-gradient-to-b from-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <SectionHeader
          badge={t('alliances.badge')}
          title={t('alliances.title')}
          highlight={t('alliances.titleHighlight')}
          description={t('alliances.description')}
          className="mb-16"
        />

        {/* Partner grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {partnerIds.map((partnerId, index) => (
            <PartnerCard
              key={partnerId}
              partnerId={partnerId}
              logo={partnerLogos[partnerId]}
              index={index}
            />
          ))}
        </div>

        {/* Connection lines (constellation effect) */}
        <ConstellationLines />

        {/* Call to become partner */}
        <FadeInView direction="up" delay={0.4} className="mt-20 text-center">
          <p className="mb-6 text-gray-300">
            {t('alliances.cta')}
          </p>
          <LinkButton href="#contacto" variant="outline">
            {t('alliances.button')}
          </LinkButton>
        </FadeInView>
      </div>

    </section>
  )
}

interface PartnerCardProps {
  partnerId: PartnerId
  logo: string
  index: number
}

function PartnerCard ({ partnerId, logo, index }: PartnerCardProps) {
  const { t } = useTranslation()
  const name = t(`alliances.partners.${partnerId}.name`)
  const description = t(`alliances.partners.${partnerId}.description`)

  return (
    <FadeInView direction="up" delay={index * 0.1} className="h-full">
      <div className="group flex h-full flex-col items-center rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all hover:border-brand/30 hover:bg-black/50">
        {/* Logo container - sin círculo, altura uniforme */}
        <div className="mb-4 flex h-16 w-full items-center justify-center transition-transform group-hover:scale-105">
          <img
            src={logo}
            alt={name}
            className="h-full w-auto max-w-full object-contain"
          />
        </div>
        <h3 className="mb-1 text-center font-montserrat text-sm font-semibold text-white">
          {name}
        </h3>
        <p className="mt-auto text-center text-xs text-gray-300">{description}</p>
      </div>
    </FadeInView>
  )
}

// Constellation line segments connecting the 4 partner cards horizontally
// Each segment: [x1, x2] at y=60% — matches the 4-column grid positions (25%, 50%, 75%)
const CONSTELLATION_SEGMENTS = [
  { x1: '25%', x2: '50%' },
  { x1: '50%', x2: '75%' },
] as const
const CONSTELLATION_Y = '60%'

function ConstellationLines () {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#db013a" stopOpacity="0" />
          <stop offset="50%" stopColor="#db013a" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#db013a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {CONSTELLATION_SEGMENTS.map((seg) => (
        <line
          key={seg.x1}
          x1={seg.x1}
          y1={CONSTELLATION_Y}
          x2={seg.x2}
          y2={CONSTELLATION_Y}
          stroke="url(#lineGradient)"
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}

/**
 * StoryMission - Acto 4: La Misión
 * Deep parallax section with CubeSat and subsystems
 */

import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { FadeInView } from '~/components/animations/FadeInView'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
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
import { useTranslation } from 'react-i18next'
import { Badge } from '~/components/ui'
import { SubsystemCard } from '~/components/ui/molecules'

const subsystemIds = [
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

export function StoryMission () {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const cubeRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const cubeScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black pb-32 pt-32"
    >
      {/* Background - Layered nebulas for parallax depth */}
      <div className="absolute inset-0">
        <StarField starCount={100} parallaxEnabled />
        {/* Capa 1 - Fondo profundo */}
        <NebulaOrb
          color="rgba(219, 1, 58, 0.12)"
          size={1000}
          position={{ x: '60%', y: '25%' }}
          blur={180}
        />
        {/* Capa 2 - Media izquierda */}
        <NebulaOrb
          color="rgba(59, 130, 246, 0.1)"
          size={600}
          position={{ x: '15%', y: '45%' }}
          blur={120}
        />
        {/* Capa 3 - Media derecha - purple for transition to Alliances */}
        <NebulaOrb
          color="rgba(139, 92, 246, 0.12)"
          size={600}
          position={{ x: '75%', y: '75%' }}
          blur={140}
        />
        {/* Capa 4 - Bottom center - softer red for transition */}
        <NebulaOrb
          color="rgba(219, 1, 58, 0.06)"
          size={500}
          position={{ x: '35%', y: '90%' }}
          blur={120}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-20 text-center">
          <FadeInView direction="up">
            <Badge className="mb-4">{t('mission.badge')}</Badge>
          </FadeInView>
          <FadeInView direction="up" delay={0.1}>
            <h2 className="mb-6 font-montserrat text-4xl font-bold text-white md:text-5xl">
              {t('mission.title')}{' '}
              <span className="text-brand">{t('mission.titleHighlight')}</span>
            </h2>
          </FadeInView>
          <FadeInView direction="up" delay={0.2}>
            <p className="mx-auto max-w-2xl text-gray-300">
              {t('mission.description')}
            </p>
          </FadeInView>
        </div>

        {/* CubeSat visualization */}
        <div className="relative mb-20 flex justify-center">
          <m.img
            src="/assets/img/logo.png"
            alt="Chasqui II"
            className="h-48 w-48 object-contain md:h-64 md:w-64"
            style={{
              rotateY: cubeRotate,
              scale: cubeScale,
              perspective: 1000,
              filter: 'drop-shadow(0 0 40px rgba(219, 1, 58, 0.3))'
            }}
          />
        </div>

        {/* Subsystems grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {subsystemIds.map((subsystemId, index) => {
            const Icon = subsystemIcons[subsystemId]
            return (
              <FadeInView key={subsystemId} direction="up" delay={index * 0.05} className="h-full">
                <SubsystemCard
                  name={t(`mission.subsystems.${subsystemId}.name`)}
                  description={t(`mission.subsystems.${subsystemId}.description`)}
                  icon={Icon}
                />
              </FadeInView>
            )
          })}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}


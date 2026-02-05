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
          <m.div
            className="relative h-48 w-48 md:h-64 md:w-64"
            style={{
              rotateY: cubeRotate,
              scale: cubeScale,
              perspective: 1000
            }}
          >
            {/* Cube representation */}
            <div
              className="absolute inset-0 rounded-lg border-2 border-brand/50 bg-gradient-to-br from-gray-800 to-gray-900"
              style={{
                boxShadow:
                  '0 0 60px rgba(219, 1, 58, 0.3), inset 0 0 30px rgba(219, 1, 58, 0.1)'
              }}
            >
              {/* Solar panel effect */}
              <div className="absolute -left-8 top-1/2 h-32 w-8 -translate-y-1/2 rounded bg-gradient-to-r from-blue-900 to-blue-700 opacity-80" />
              <div className="absolute -right-8 top-1/2 h-32 w-8 -translate-y-1/2 rounded bg-gradient-to-l from-blue-900 to-blue-700 opacity-80" />

              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-montserrat text-xl font-bold text-white/80">
                  1U
                </span>
              </div>
            </div>
          </m.div>
        </div>

        {/* Subsystems grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {subsystemIds.map((subsystemId, index) => (
            <SubsystemCard
              key={subsystemId}
              subsystemId={subsystemId}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

interface SubsystemCardProps {
  subsystemId: typeof subsystemIds[number];
  index: number;
}

function SubsystemCard ({ subsystemId, index }: SubsystemCardProps) {
  const { t } = useTranslation()
  const Icon = subsystemIcons[subsystemId]

  return (
    <FadeInView direction="up" delay={index * 0.05} className="h-full">
      <div className="group flex h-full flex-col rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl transition-all hover:border-brand/50 hover:bg-black/50">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 transition-colors group-hover:bg-brand/20">
          <Icon className="h-5 w-5 text-brand" />
        </div>
        <h3 className="mb-1 font-montserrat text-sm font-semibold text-white">
          {t(`mission.subsystems.${subsystemId}.name`)}
        </h3>
        <p className="mt-auto text-xs text-gray-300">{t(`mission.subsystems.${subsystemId}.description`)}</p>
      </div>
    </FadeInView>
  )
}

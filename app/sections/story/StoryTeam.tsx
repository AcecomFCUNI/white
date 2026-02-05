/**
 * StoryTeam - Acto 3: El Equipo
 * Simple grid layout with fade-in animation
 */

import { FadeInView } from '~/components/animations/FadeInView'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import {
  PaintBrushIcon,
  CogIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { Badge, Card } from '~/components/ui'

const teamAreaIds = ['design', 'management', 'stem'] as const
type TeamAreaId = typeof teamAreaIds[number]

const teamAreaIcons: Record<TeamAreaId, typeof PaintBrushIcon> = {
  design: PaintBrushIcon,
  management: CogIcon,
  stem: AcademicCapIcon
}

// Tailwind classes for team colors (must be static for purging)
const teamAreaStyles: Record<TeamAreaId, { iconBg: string; iconColor: string; shadow: string }> = {
  design: {
    iconBg: 'bg-team-design/20',
    iconColor: 'text-team-design',
    shadow: 'shadow-[0_0_40px_rgba(236,72,153,0.1),inset_0_0_20px_rgba(255,255,255,0.02)]'
  },
  management: {
    iconBg: 'bg-team-management/20',
    iconColor: 'text-team-management',
    shadow: 'shadow-[0_0_40px_rgba(59,130,246,0.1),inset_0_0_20px_rgba(255,255,255,0.02)]'
  },
  stem: {
    iconBg: 'bg-team-stem/20',
    iconColor: 'text-team-stem',
    shadow: 'shadow-[0_0_40px_rgba(34,197,94,0.1),inset_0_0_20px_rgba(255,255,255,0.02)]'
  }
}

// Skills are now loaded from translations via t(`team.${areaId}.skills`)

export function StoryTeam () {
  const { t } = useTranslation()
  return (
    <section className="relative bg-black py-32">
      {/* Background - Layered nebulas for parallax depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <StarField starCount={60} parallaxEnabled />
        {/* Capa 1 - Fondo profundo */}
        <NebulaOrb
          color="rgba(219, 1, 58, 0.08)"
          size={900}
          position={{ x: '80%', y: '20%' }}
          blur={150}
        />
        {/* Capa 2 - Media */}
        <NebulaOrb
          color="rgba(139, 92, 246, 0.12)"
          size={600}
          position={{ x: '20%', y: '60%' }}
          blur={120}
        />
        {/* Capa 3 - Cercana */}
        <NebulaOrb
          color="rgba(59, 130, 246, 0.1)"
          size={400}
          position={{ x: '70%', y: '80%' }}
          blur={80}
        />
      </div>

      {/* Gradient overlays para transiciones suaves */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <FadeInView direction="up">
            <Badge className="mb-4">{t('team.badge')}</Badge>
          </FadeInView>
          <FadeInView direction="up" delay={0.1}>
            <h2 className="font-montserrat text-3xl font-bold text-white md:text-5xl">
              {t('team.title')}{' '}
              <span className="text-brand">{t('team.titleHighlight')}</span>
            </h2>
          </FadeInView>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {teamAreaIds.map((areaId, index) => {
            const Icon = teamAreaIcons[areaId]
            const styles = teamAreaStyles[areaId]
            const skills = t(`team.${areaId}.skills`, { returnObjects: true }) as string[]

            return (
              <FadeInView key={areaId} direction="up" delay={index * 0.15}>
                <div
                  className={`group h-full rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-black/50 ${styles.shadow}`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${styles.iconBg}`}
                  >
                    <Icon className={`h-6 w-6 ${styles.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-montserrat text-lg font-bold text-white md:text-xl">
                    {t(`team.${areaId}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-sm text-gray-300">{t(`team.${areaId}.description`)}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="skill">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </FadeInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}

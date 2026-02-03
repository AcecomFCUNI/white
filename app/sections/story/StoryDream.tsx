/**
 * StoryDream - Acto 2: El Sueño
 * Parallax section with Earth and narrative text
 */

import { useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { FadeInView } from '~/components/animations/FadeInView'
import { ParallaxLayer } from '~/components/animations/ParallaxLayer'
import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'
import { useTranslation } from 'react-i18next'

export function StoryDream () {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-black py-32"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <StarField starCount={80} parallaxEnabled />
        <NebulaOrb
          color="rgba(59, 130, 246, 0.15)"
          size={500}
          position={{ x: '20%', y: '30%' }}
          blur={100}
        />
        <NebulaOrb
          color="rgba(219, 1, 58, 0.1)"
          size={400}
          position={{ x: '80%', y: '70%' }}
          blur={80}
        />
      </div>

      {/* Earth image placeholder (parallax) */}
      <m.div
        className="absolute right-[-10%] top-1/4 h-[600px] w-[600px] md:h-[800px] md:w-[800px] rounded-full opacity-30"
        style={{
          y: backgroundY,
          background: `
            radial-gradient(circle at 30% 30%,
              rgba(59, 130, 246, 0.4) 0%,
              rgba(34, 197, 94, 0.3) 30%,
              rgba(6, 182, 212, 0.2) 60%,
              transparent 70%
            )
          `,
          boxShadow: 'inset -20px -20px 60px rgba(0,0,0,0.5), 0 0 100px rgba(59, 130, 246, 0.2)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <FadeInView direction="up" className="mb-12 text-center">
          <span className="mb-4 inline-block rounded-full border border-gray-700 px-4 py-2 text-xs uppercase tracking-widest text-gray-300">
            {t('story.badge')}
          </span>
        </FadeInView>

        <FadeInView direction="up" delay={0.2}>
          <h2 className="mb-8 font-montserrat text-4xl font-bold text-white md:text-5xl">
            {t('story.title1')}{' '}
            <span className="text-brand">UNI</span>,
            <br />
            {t('story.title2')}
          </h2>
        </FadeInView>

        <div className="space-y-8 text-lg leading-relaxed text-gray-300">
          <ParallaxLayer speed={0.1}>
            <FadeInView direction="up" delay={0.3}>
              <p>
                {t('story.p1')}
              </p>
            </FadeInView>
          </ParallaxLayer>

          <ParallaxLayer speed={0.15}>
            <FadeInView direction="up" delay={0.4}>
              <p>
                {t('story.p2')}
              </p>
            </FadeInView>
          </ParallaxLayer>

          <ParallaxLayer speed={0.2}>
            <FadeInView direction="up" delay={0.5}>
              <p>
                {t('story.p3')}
              </p>
            </FadeInView>
          </ParallaxLayer>
        </div>

        {/* Stats */}
        <FadeInView direction="up" delay={0.6} className="mt-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '2018', label: t('story.stats.year') },
              { value: '50+', label: t('story.stats.students') },
              { value: '10', label: t('story.stats.subsystems') },
              { value: '1U', label: t('story.stats.size') }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 font-montserrat text-3xl font-bold text-brand md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeInView>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

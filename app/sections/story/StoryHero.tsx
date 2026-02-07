/**
 * StoryHero - Acto 1: Intro
 * Full-screen hero with animated starfield and logo reveal
 */

import { lazy, Suspense, useRef } from 'react'
import { m, useScroll, useTransform } from 'motion/react'
import { StarField } from '~/components/effects/StarField'
import { Nebula } from '~/components/effects/Nebula'
import { FadeInView } from '~/components/animations/FadeInView'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import { GLOBE_CONFIG } from '~/lib/constants'

const GlobeCap = lazy(() =>
  import('~/components/effects/GlobeCap').then(mod => ({ default: mod.GlobeCap }))
)

export function StoryHero () {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <StarField starCount={150} parallaxEnabled />
        <Nebula variant="red" animated />
      </div>

      {/* Content */}
      <m.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-4"
        style={{ opacity, scale, y }}
      >
        {/* Logo */}
        <FadeInView direction="none" duration={1} delay={0.2}>
          <img
            src="/assets/img/chasqui-logo-figma.png"
            alt="Chasqui II"
            className="h-72 w-auto md:h-96 lg:h-[28rem] mb-8 drop-shadow-[0_0_30px_rgba(219,1,58,0.5)]"
          />
        </FadeInView>

        {/* Subtitle */}
        <FadeInView direction="up" delay={0.7}>
          <p className="mb-8 max-w-2xl text-center text-lg text-gray-300 md:text-xl">
            {t('hero.subtitle')}
          </p>
        </FadeInView>

        {/* Tagline */}
        <FadeInView direction="up" delay={0.9}>
          <p className="max-w-xl text-center text-sm text-gray-300">
            {t('hero.tagline')}
          </p>
        </FadeInView>

        {/* Scroll indicator */}
        <FadeInView direction="up" delay={1.2} className="absolute bottom-8">
          <m.div
            className="flex flex-col items-center text-gray-300"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="mb-2 text-xs uppercase tracking-widest">
              {t('hero.scrollCta')}
            </span>
            <ChevronDownIcon className="h-6 w-6" />
          </m.div>
        </FadeInView>
      </m.div>

      {/* Earth arc at bottom - Mobile: simple gradient, Desktop: full globe */}
      {/* Mobile Earth arc - simple gradient effect */}
      <m.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[300px] pointer-events-none md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
      >
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] h-[150vw] rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 40%, transparent 60%)',
            boxShadow: 'inset 0 0 60px rgba(255,255,255,0.1)',
            transform: 'translateX(-50%) translateY(85%)'
          }}
        />
      </m.div>

      {/* Desktop Earth arc - optimized globe cap (renders only visible portion) */}
      <m.div
        className="absolute bottom-0 left-0 right-0 h-[450px] pointer-events-none hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
      >
        <div className="relative w-full h-full">
          <Suspense fallback={null}>
            <GlobeCap
              width={GLOBE_CONFIG.cap.width}
              height={GLOBE_CONFIG.cap.height}
              visibleCapHeight={GLOBE_CONFIG.cap.visibleCapHeight}
              autoRotate={true}
              rotationSpeed={GLOBE_CONFIG.animation.rotationSpeed}
              strokeColor={GLOBE_CONFIG.style.strokeColor}
              strokeWidth={GLOBE_CONFIG.style.strokeWidth}
              fillColor={GLOBE_CONFIG.style.fillColor}
              oceanColor={GLOBE_CONFIG.style.oceanColor}
              showSatellite={true}
              satelliteOrbitSpeed={GLOBE_CONFIG.animation.satelliteOrbitSpeed}
              className="absolute bottom-0 left-1/2 -translate-x-1/2"
            />
          </Suspense>
          {/* Fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        </div>
      </m.div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

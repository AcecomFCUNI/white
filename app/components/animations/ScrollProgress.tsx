/**
 * ScrollProgress component
 * Visual indicator of scroll progress
 *
 * Respects user's prefers-reduced-motion setting:
 * - When reduced motion is enabled, dot animations are simplified
 */

import { m, useScroll, useSpring } from 'motion/react'
import { useReducedMotion } from '~/hooks'

interface ScrollProgressProps {
  variant?: 'bar' | 'dots';
  position?: 'top' | 'left' | 'right';
  color?: string;
  sections?: number;
  className?: string;
}

export function ScrollProgress ({
  variant = 'bar',
  position = 'top',
  color = '#db013a',
  sections = 7,
  className = ''
}: ScrollProgressProps) {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  if (variant === 'bar') {
    const positionClasses = {
      top: 'fixed top-0 left-0 right-0 h-1 z-50',
      left: 'fixed top-0 left-0 bottom-0 w-1 z-50',
      right: 'fixed top-0 right-0 bottom-0 w-1 z-50'
    }

    const transformOrigin =
      position === 'top' ? 'left' : position === 'left' ? 'top' : 'bottom'

    return (
      <m.div
        className={`${positionClasses[position]} ${className}`}
        style={{
          backgroundColor: color,
          scaleX: position === 'top' ? scaleX : undefined,
          scaleY: position !== 'top' ? scaleX : undefined,
          transformOrigin
        }}
      />
    )
  }

  // Dots variant
  return (
    <div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 ${className}`}
    >
      {Array.from({ length: sections }).map((_, i) => (
        <ScrollDot
          key={i}
          color={color}
          reducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  )
}

interface ScrollDotProps {
  color: string;
  reducedMotion?: boolean;
}

function ScrollDot ({ color, reducedMotion }: ScrollDotProps) {
  // Skip animations for reduced motion preference
  if (reducedMotion) {
    return (
      <div
        className="w-2 h-2 rounded-full border border-white/30"
        style={{
          backgroundColor: color,
          opacity: 0.5
        }}
      />
    )
  }

  return (
    <m.div
      className="w-2 h-2 rounded-full border border-white/30 transition-colors duration-300"
      style={{
        backgroundColor: color,
        opacity: 0.3
      }}
      whileInView={{
        opacity: 1,
        scale: 1.2
      }}
    />
  )
}

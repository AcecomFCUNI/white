/**
 * ParallaxLayer component
 * Creates parallax scrolling effect on children
 */

import { useRef, type ReactNode } from 'react'
import { m, useScroll, useTransform, useSpring } from 'motion/react'

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // -1 to 1, negative = slower, positive = faster
  direction?: 'vertical' | 'horizontal';
  className?: string;
  offset?: [string, string];
}

export function ParallaxLayer ({
  children,
  speed = 0.5,
  direction = 'vertical',
  className = '',
  offset = ['start end', 'end start']
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any
  })

  // Calculate movement range based on speed
  const range = 100 * speed

  const rawY = useTransform(scrollYProgress, [0, 1], [range, -range])
  const rawX = useTransform(scrollYProgress, [0, 1], [range, -range])

  const y = useSpring(rawY, { stiffness: 100, damping: 30, mass: 0.5 })
  const x = useSpring(rawX, { stiffness: 100, damping: 30, mass: 0.5 })

  return (
    <m.div
      ref={ref}
      style={direction === 'vertical' ? { y } : { x }}
      className={`relative ${className}`}
    >
      {children}
    </m.div>
  )
}

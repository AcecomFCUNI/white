/**
 * StickySection component
 * Creates a sticky scroll section with content that changes based on scroll
 */

import { useRef, type ReactNode } from 'react'
import { m, useScroll, useTransform, type MotionValue } from 'motion/react'

interface StickySectionProps {
  children: ReactNode;
  height?: string; // CSS height value like "300vh"
  className?: string;
  stickyClassName?: string;
}

export function StickySection ({
  children,
  height = '200vh',
  className = '',
  stickyClassName = ''
}: StickySectionProps) {
  return (
    <section className={`relative ${className}`} style={{ height }}>
      <div
        className={`sticky top-0 h-screen overflow-hidden ${stickyClassName}`}
      >
        {children}
      </div>
    </section>
  )
}

/**
 * Hook for getting scroll progress within a sticky section
 */
export function useStickyProgress () {
  const containerRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  return { containerRef, progress: scrollYProgress }
}

interface StickyContentProps {
  children: ReactNode;
  start?: number; // 0-1 when this content starts appearing
  end?: number; // 0-1 when this content finishes
  progress: MotionValue<number>;
  className?: string;
}

export function StickyContent ({
  children,
  start = 0,
  end = 1,
  progress,
  className = ''
}: StickyContentProps) {
  const opacity = useTransform(
    progress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, 0]
  )

  return (
    <m.div style={{ opacity }} className={className}>
      {children}
    </m.div>
  )
}

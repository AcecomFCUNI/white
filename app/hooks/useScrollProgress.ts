/**
 * Custom hook for tracking scroll progress
 */

import { useScroll, useSpring, type MotionValue } from 'motion/react'
import { useRef } from 'react'

interface ScrollProgressOptions {
  offset?: [string, string];
  smooth?: boolean;
  springConfig?: { stiffness: number; damping: number; mass: number };
}

interface ScrollProgressReturn {
  ref: React.RefObject<HTMLElement>;
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
}

export function useScrollProgress (
  options: ScrollProgressOptions = {}
): ScrollProgressReturn {
  const {
    offset = ['start end', 'end start'],
    smooth = true,
    springConfig = { stiffness: 100, damping: 30, mass: 0.5 }
  } = options

  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any
  })

  const smoothProgress = useSpring(scrollYProgress, springConfig)

  return {
    ref,
    scrollYProgress,
    smoothProgress: smooth ? smoothProgress : scrollYProgress
  }
}

/**
 * Hook for page-level scroll progress (0-1 from top to bottom)
 */
export function usePageScrollProgress () {
  const { scrollYProgress } = useScroll()

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5
  })

  return {
    scrollYProgress,
    smoothProgress
  }
}

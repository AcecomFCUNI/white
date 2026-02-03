/**
 * Motion (Framer Motion) configuration for optimized bundle size
 * Using LazyMotion with domAnimation features (~5KB)
 */

import { domAnimation } from 'motion/react'

export const motionFeatures = domAnimation

// Re-export commonly used utilities
export {
  LazyMotion,
  m,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  useAnimation
} from 'motion/react'

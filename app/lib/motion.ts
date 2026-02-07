/**
 * Motion (Framer Motion) configuration for optimized bundle size
 * Using LazyMotion with async-loaded domAnimation features
 * The features (~29KB) are loaded after initial render, not in the main bundle.
 */

// Async feature loader — not included in initial JS bundle
export const motionFeatures = () =>
  import('motion/react').then((mod) => mod.domAnimation)

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

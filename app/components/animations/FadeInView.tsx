/**
 * FadeInView component
 * Animates children when they enter the viewport
 *
 * Respects user's prefers-reduced-motion setting:
 * - When reduced motion is enabled, content appears instantly
 */

import { type ReactNode } from 'react'
import { m } from 'motion/react'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from '~/hooks'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInViewProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  as?: keyof JSX.IntrinsicElements;
}

const getInitialPosition = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { y: distance, opacity: 0 }
    case 'down':
      return { y: -distance, opacity: 0 }
    case 'left':
      return { x: distance, opacity: 0 }
    case 'right':
      return { x: -distance, opacity: 0 }
    case 'none':
    default:
      return { opacity: 0 }
  }
}

const getFinalPosition = (direction: Direction) => {
  switch (direction) {
    case 'up':
    case 'down':
      return { y: 0, opacity: 1 }
    case 'left':
    case 'right':
      return { x: 0, opacity: 1 }
    case 'none':
    default:
      return { opacity: 1 }
  }
}

export function FadeInView ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  className = '',
  once = true,
  threshold = 0.1,
  as = 'div'
}: FadeInViewProps) {
  const prefersReducedMotion = useReducedMotion()
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: once
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = m[as as keyof typeof m] as React.ComponentType<any>

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    )
  }

  return (
    <Component
      ref={ref}
      initial={getInitialPosition(direction, distance)}
      animate={inView ? getFinalPosition(direction) : getInitialPosition(direction, distance)}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </Component>
  )
}

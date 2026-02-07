/**
 * FadeInView component
 * Animates children when they enter the viewport using CSS transitions.
 * Zero JS animation library dependency — uses IntersectionObserver.
 *
 * Respects user's prefers-reduced-motion setting:
 * - When reduced motion is enabled, content appears instantly
 */

import { useRef, useEffect, useState, type ReactNode, createElement } from 'react'
import { cn } from '~/lib/utils'
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
  as?: string;
}

const getInitialStyles = (direction: Direction, distance: number): React.CSSProperties => {
  switch (direction) {
    case 'up':
      return { opacity: 0, transform: `translateY(${distance}px)` }
    case 'down':
      return { opacity: 0, transform: `translateY(-${distance}px)` }
    case 'left':
      return { opacity: 0, transform: `translateX(${distance}px)` }
    case 'right':
      return { opacity: 0, transform: `translateX(-${distance}px)` }
    case 'none':
    default:
      return { opacity: 0 }
  }
}

const visibleStyles: React.CSSProperties = {
  opacity: 1,
  transform: 'translate(0)',
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
  as: Tag = 'div'
}: FadeInViewProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, prefersReducedMotion])

  if (prefersReducedMotion) {
    return createElement(Tag, { className }, children)
  }

  const style: React.CSSProperties = {
    ...(isVisible ? visibleStyles : getInitialStyles(direction, distance)),
    transition: `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
  }

  return createElement(Tag, { ref, className: cn(className), style }, children)
}

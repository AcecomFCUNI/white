/**
 * FadeInView component
 * Animates children when they enter the viewport using CSS transitions.
 * Zero JS animation library dependency — uses IntersectionObserver + direct DOM.
 *
 * SSR-safe: renders visible content on the server. Animations are applied
 * purely on the client via DOM manipulation (no React state for visibility),
 * avoiding hydration mismatches and race conditions.
 *
 * Respects user's prefers-reduced-motion setting.
 */

import { useRef, useEffect, type ReactNode, createElement } from 'react'
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

function getTransform (direction: Direction, distance: number): string {
  switch (direction) {
    case 'up': return `translateY(${distance}px)`
    case 'down': return `translateY(-${distance}px)`
    case 'left': return `translateX(${distance}px)`
    case 'right': return `translateX(-${distance}px)`
    case 'none':
    default: return 'none'
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
  as: Tag = 'div'
}: FadeInViewProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion) return

    // Apply initial hidden state via DOM (not React state)
    el.style.opacity = '0'
    el.style.transform = getTransform(direction, distance)
    el.style.transition = `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`
    el.style.willChange = 'opacity, transform'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translate(0)'
          el.style.willChange = 'auto'
          if (once) observer.unobserve(el)
        } else if (!once) {
          el.style.opacity = '0'
          el.style.transform = getTransform(direction, distance)
          el.style.willChange = 'opacity, transform'
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      el.style.opacity = ''
      el.style.transform = ''
      el.style.transition = ''
      el.style.willChange = ''
    }
  }, [direction, delay, duration, distance, once, threshold, prefersReducedMotion])

  return createElement(Tag, { ref, className: cn(className) }, children)
}

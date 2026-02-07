/**
 * Hook to detect user's reduced motion preference
 *
 * Returns true if the user has enabled "Reduce Motion" in their
 * system accessibility settings.
 *
 * Usage:
 * const prefersReducedMotion = useReducedMotion()
 * if (prefersReducedMotion) {
 *   // Skip or simplify animations
 * }
 */

import { useState, useEffect } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getInitialState(): boolean {
  // SSR-safe: return false on server
  if (typeof window === 'undefined') return false
  return window.matchMedia(QUERY).matches
}

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState)

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY)

    // Set initial value (handles hydration mismatch)
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    // Legacy browsers (Safari < 14)
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [])

  return prefersReducedMotion
}

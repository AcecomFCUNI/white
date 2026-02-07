/**
 * SmoothScroll component using Lenis
 * Provides smooth scrolling experience throughout the site
 * Only runs on client side to avoid SSR issues
 */

import { useEffect, useRef, type ReactNode } from 'react'
import { useLocation } from '@remix-run/react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll ({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Disable smooth scroll only on small screens (mobile)
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches

    if (prefersReducedMotion || isSmallScreen) {
      return
    }

    // Initialize Lenis with premium feel
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false
    })

    lenisRef.current = lenis

    // RAF loop
    function raf (time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll to top on route change (only when pathname changes, not hash)
  useEffect(() => {
    // If there's a hash in the URL, let the browser handle anchor navigation
    if (location.hash) {
      return
    }

    // Scroll to top
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  return <>{children}</>
}

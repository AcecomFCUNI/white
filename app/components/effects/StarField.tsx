/**
 * StarField component
 * Animated canvas of twinkling stars with parallax effect
 *
 * Respects user's prefers-reduced-motion setting:
 * - When reduced motion is enabled, stars are static (no twinkling)
 */

import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion } from '~/hooks'

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number; // 1-3 for parallax layers
}

interface StarFieldProps {
  starCount?: number;
  className?: string;
  parallaxEnabled?: boolean;
}

export function StarField ({
  starCount = 200,
  className = '',
  parallaxEnabled = true
}: StarFieldProps) {
  const prefersReducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const scrollYRef = useRef(0)
  const animationRef = useRef<number>(0)
  const isVisibleRef = useRef(true)
  const lastFrameTimeRef = useRef(0)
  const frameInterval = 1000 / 30 // 30fps

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = []
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        layer: Math.floor(Math.random() * 3) + 1
      })
    }
    starsRef.current = stars
  }, [starCount])

  const draw = useCallback((ctx: CanvasRenderingContext2D, time: number, reducedMotion: boolean) => {
    const { width, height } = ctx.canvas
    ctx.clearRect(0, 0, width, height)

    const scrollOffset = parallaxEnabled && !reducedMotion ? scrollYRef.current : 0

    starsRef.current.forEach((star) => {
      // Twinkle effect (disabled for reduced motion)
      let currentOpacity = star.opacity
      if (!reducedMotion) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase)
        currentOpacity = star.opacity * (0.5 + twinkle * 0.5)
      }

      // Parallax offset based on layer (disabled for reduced motion)
      let y = star.y
      if (!reducedMotion) {
        const parallaxMultiplier = star.layer * 0.1
        const yOffset = (scrollOffset * parallaxMultiplier) % height
        y = (star.y + yOffset) % height
        if (y < 0) y += height
      }

      // Draw star
      ctx.beginPath()
      ctx.arc(star.x, y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`
      ctx.fill()

      // Add glow effect for larger stars
      if (star.size > 1.5) {
        ctx.beginPath()
        ctx.arc(star.x, y, star.size * 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.2})`
        ctx.fill()
      }
    })
  }, [parallaxEnabled])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      initStars(rect.width, rect.height)
    }

    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Intersection Observer para pausar cuando no es visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    const startTime = performance.now()

    // If reduced motion is enabled, draw once and skip animation loop
    if (prefersReducedMotion) {
      draw(ctx, 0, true)
      return () => {
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('scroll', handleScroll)
        observer.disconnect()
      }
    }

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate)

      // Pausar si no es visible
      if (!isVisibleRef.current) return

      // Throttle a 30fps
      const elapsed = currentTime - lastFrameTimeRef.current
      if (elapsed < frameInterval) return
      lastFrameTimeRef.current = currentTime - (elapsed % frameInterval)

      draw(ctx, (currentTime - startTime) / 1000, false)
    }
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      cancelAnimationFrame(animationRef.current)
    }
  }, [initStars, draw, frameInterval, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}

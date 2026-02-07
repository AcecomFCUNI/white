import { describe, it, expect, vi } from 'vitest'

// Mock motion/react before importing the hook
vi.mock('motion/react', () => {
  const motionValue = { get: () => 0, set: vi.fn(), on: vi.fn() }
  return {
    useScroll: vi.fn(() => ({ scrollYProgress: motionValue })),
    useSpring: vi.fn(() => motionValue),
  }
})

import { renderHook } from '@testing-library/react'
import { useScrollProgress, usePageScrollProgress } from '~/hooks/useScrollProgress'

describe('useScrollProgress', () => {
  it('returns ref, scrollYProgress, and smoothProgress', () => {
    const { result } = renderHook(() => useScrollProgress())

    expect(result.current).toHaveProperty('ref')
    expect(result.current).toHaveProperty('scrollYProgress')
    expect(result.current).toHaveProperty('smoothProgress')
  })

  it('ref is a React ref object', () => {
    const { result } = renderHook(() => useScrollProgress())
    expect(result.current.ref).toHaveProperty('current')
  })

  it('accepts custom options', () => {
    const { result } = renderHook(() =>
      useScrollProgress({
        offset: ['start start', 'end end'],
        smooth: false,
        springConfig: { stiffness: 200, damping: 20, mass: 1 },
      })
    )

    expect(result.current).toHaveProperty('ref')
    expect(result.current).toHaveProperty('scrollYProgress')
    expect(result.current).toHaveProperty('smoothProgress')
  })
})

describe('usePageScrollProgress', () => {
  it('returns scrollYProgress and smoothProgress', () => {
    const { result } = renderHook(() => usePageScrollProgress())

    expect(result.current).toHaveProperty('scrollYProgress')
    expect(result.current).toHaveProperty('smoothProgress')
  })
})

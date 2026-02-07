/**
 * Nebula component
 * CSS-based nebula/gradient effect with subtle animation
 */

import { m, useScroll, useTransform } from 'motion/react'

interface NebulaProps {
  variant?: 'dark' | 'light' | 'red';
  className?: string;
  animated?: boolean;
}

const variants = {
  dark: {
    gradient: `
      radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)
    `
  },
  light: {
    gradient: `
      radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)
    `
  },
  red: {
    gradient: `
      radial-gradient(ellipse at 30% 40%, rgba(219, 1, 58, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 60%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)
    `
  }
}

export function Nebula ({
  variant = 'dark',
  className = '',
  animated = true
}: NebulaProps) {
  const { scrollYProgress } = useScroll()
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const style = variants[variant]

  if (!animated) {
    return (
      <div
        className={`absolute inset-0 pointer-events-none ${className}`}
        style={{ background: style.gradient, contain: 'layout style paint' }}
      />
    )
  }

  return (
    <m.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: style.gradient,
        rotate,
        scale,
        contain: 'layout style paint',
        willChange: 'transform',
      }}
    />
  )
}

/**
 * NebulaOrb - A single floating nebula orb
 */
interface NebulaOrbProps {
  color?: string;
  size?: number;
  position?: { x: string; y: string };
  blur?: number;
  className?: string;
}

export function NebulaOrb ({
  color = 'rgba(219, 1, 58, 0.2)',
  size = 300,
  position = { x: '50%', y: '50%' },
  blur = 80,
  className = ''
}: NebulaOrbProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%) translateZ(0)',
        background: color,
        filter: `blur(${blur}px)`,
        contain: 'layout style paint',
        willChange: 'transform, opacity',
      }}
    />
  )
}

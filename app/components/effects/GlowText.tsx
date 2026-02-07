/**
 * GlowText component
 * Text with customizable glow effect
 */

import { type ReactNode } from 'react'
import { m } from 'motion/react'

interface GlowTextProps {
  children: ReactNode;
  color?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const glowIntensities = {
  low: {
    textShadow: (color: string) =>
      `0 0 10px ${color}40, 0 0 20px ${color}20`
  },
  medium: {
    textShadow: (color: string) =>
      `0 0 10px ${color}60, 0 0 30px ${color}40, 0 0 50px ${color}20`
  },
  high: {
    textShadow: (color: string) =>
      `0 0 10px ${color}80, 0 0 30px ${color}60, 0 0 50px ${color}40, 0 0 70px ${color}20`
  }
}

export function GlowText ({
  children,
  color = '#db013a',
  glowIntensity = 'medium',
  animated = false,
  className = '',
  as = 'span'
}: GlowTextProps) {
  const Component = m[as]
  const intensity = glowIntensities[glowIntensity]

  if (!animated) {
    return (
      <Component
        className={className}
        style={{
          textShadow: intensity.textShadow(color)
        }}
      >
        {children}
      </Component>
    )
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, textShadow: 'none' }}
      animate={{
        opacity: 1,
        textShadow: [
          intensity.textShadow(color),
          glowIntensities.high.textShadow(color),
          intensity.textShadow(color)
        ]
      }}
      transition={{
        opacity: { duration: 0.5 },
        textShadow: {
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse'
        }
      }}
    >
      {children}
    </Component>
  )
}

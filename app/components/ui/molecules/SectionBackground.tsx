/**
 * SectionBackground Molecule
 *
 * Reusable background pattern with StarField, NebulaOrbs, and gradient overlays.
 * Provides preset configurations for different section moods.
 *
 * Usage:
 * <SectionBackground preset="hero" />
 * <SectionBackground preset="team" starCount={80} />
 */

import { StarField } from '~/components/effects/StarField'
import { NebulaOrb } from '~/components/effects/Nebula'

type NebulaConfig = {
  color: string
  size: number
  position: { x: string; y: string }
  blur: number
}

type PresetConfig = {
  nebulas: NebulaConfig[]
  starCount: number
}

// Preset configurations for different section moods
const presets: Record<string, PresetConfig> = {
  hero: {
    starCount: 100,
    nebulas: [
      { color: 'rgba(219, 1, 58, 0.15)', size: 900, position: { x: '80%', y: '20%' }, blur: 150 },
      { color: 'rgba(59, 130, 246, 0.1)', size: 600, position: { x: '10%', y: '60%' }, blur: 100 },
    ]
  },
  story: {
    starCount: 80,
    nebulas: [
      { color: 'rgba(219, 1, 58, 0.12)', size: 700, position: { x: '75%', y: '25%' }, blur: 140 },
      { color: 'rgba(139, 92, 246, 0.1)', size: 500, position: { x: '15%', y: '65%' }, blur: 100 },
    ]
  },
  team: {
    starCount: 100,
    nebulas: [
      { color: 'rgba(219, 1, 58, 0.08)', size: 900, position: { x: '80%', y: '20%' }, blur: 150 },
      { color: 'rgba(139, 92, 246, 0.12)', size: 600, position: { x: '20%', y: '60%' }, blur: 120 },
      { color: 'rgba(59, 130, 246, 0.1)', size: 400, position: { x: '70%', y: '80%' }, blur: 80 },
    ]
  },
  mission: {
    starCount: 120,
    nebulas: [
      { color: 'rgba(219, 1, 58, 0.12)', size: 800, position: { x: '20%', y: '30%' }, blur: 150 },
      { color: 'rgba(59, 130, 246, 0.1)', size: 600, position: { x: '80%', y: '70%' }, blur: 120 },
    ]
  },
  alliances: {
    starCount: 100,
    nebulas: [
      // Top nebula - red to match Mission section's ending colors
      { color: 'rgba(219, 1, 58, 0.08)', size: 600, position: { x: '40%', y: '10%' }, blur: 140 },
      // Middle - transition to purple
      { color: 'rgba(139, 92, 246, 0.1)', size: 700, position: { x: '70%', y: '45%' }, blur: 130 },
      // Bottom accents
      { color: 'rgba(59, 130, 246, 0.08)', size: 400, position: { x: '20%', y: '70%' }, blur: 100 },
    ]
  },
  cta: {
    starCount: 80,
    nebulas: [
      { color: 'rgba(219, 1, 58, 0.15)', size: 900, position: { x: '50%', y: '25%' }, blur: 160 },
      { color: 'rgba(37, 211, 102, 0.08)', size: 500, position: { x: '15%', y: '40%' }, blur: 100 },
      { color: 'rgba(139, 92, 246, 0.1)', size: 450, position: { x: '85%', y: '60%' }, blur: 90 },
      { color: 'rgba(59, 130, 246, 0.08)', size: 350, position: { x: '30%', y: '80%' }, blur: 70 },
    ]
  },
  contact: {
    starCount: 50,
    nebulas: [
      { color: 'rgba(219, 1, 58, 0.1)', size: 700, position: { x: '70%', y: '30%' }, blur: 140 },
      { color: 'rgba(59, 130, 246, 0.08)', size: 400, position: { x: '20%', y: '50%' }, blur: 100 },
      { color: 'rgba(139, 92, 246, 0.08)', size: 300, position: { x: '60%', y: '70%' }, blur: 70 },
    ]
  },
}

interface SectionBackgroundProps {
  /** Preset configuration name */
  preset?: keyof typeof presets
  /** Override star count */
  starCount?: number
  /** Show top gradient overlay */
  gradientTop?: boolean
  /** Show bottom gradient overlay */
  gradientBottom?: boolean
  /** Enable parallax on stars */
  parallaxEnabled?: boolean
  /** Custom class for container */
  className?: string
}

export function SectionBackground({
  preset = 'story',
  starCount,
  gradientTop = true,
  gradientBottom = true,
  parallaxEnabled = true,
  className = ''
}: SectionBackgroundProps) {
  const config = presets[preset]
  const finalStarCount = starCount ?? config.starCount

  return (
    <>
      {/* Stars and Nebulas */}
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
        <StarField starCount={finalStarCount} parallaxEnabled={parallaxEnabled} />
        {config.nebulas.map((nebula, index) => (
          <NebulaOrb
            key={index}
            color={nebula.color}
            size={nebula.size}
            position={nebula.position}
            blur={nebula.blur}
          />
        ))}
      </div>

      {/* Gradient overlays - larger for smoother section transitions */}
      {gradientTop && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-48 bg-gradient-to-b from-black via-black/30 to-transparent" />
      )}
      {gradientBottom && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-black via-black/30 to-transparent" />
      )}
    </>
  )
}

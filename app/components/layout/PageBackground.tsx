/**
 * PageBackground
 *
 * Global page background with a single StarField instance.
 * Use this in the root layout to provide a consistent star background
 * across all pages, instead of having multiple StarField instances.
 *
 * Benefits:
 * - Single canvas instead of multiple (reduces memory usage)
 * - Single animation loop (reduces CPU usage)
 * - Consistent star experience across sections
 *
 * Usage in root.tsx or layout:
 * <PageBackground>
 *   <Outlet />
 * </PageBackground>
 */

import { ReactNode } from 'react'
import { StarField } from '~/components/effects/StarField'

interface PageBackgroundProps {
  children: ReactNode
  starCount?: number
  className?: string
}

export function PageBackground({
  children,
  starCount = 200,
  className = ''
}: PageBackgroundProps) {
  return (
    <div className={`relative min-h-screen bg-black ${className}`}>
      {/* Single global StarField */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <StarField starCount={starCount} parallaxEnabled />
      </div>

      {/* Content with higher z-index */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

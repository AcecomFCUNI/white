/**
 * Skeleton Atom
 *
 * Placeholder component for loading states.
 * Shows a pulsing animation to indicate content is loading.
 *
 * Usage:
 * <Skeleton className="h-4 w-32" /> - Text line
 * <Skeleton className="h-40 w-full" /> - Image placeholder
 * <Skeleton variant="circular" className="h-12 w-12" /> - Avatar
 */

import { cn } from '~/lib/utils'

interface SkeletonProps {
  variant?: 'rectangular' | 'circular' | 'text'
  className?: string
  /** Number of lines for text variant */
  lines?: number
}

export function Skeleton({ variant = 'rectangular', className, lines = 1 }: SkeletonProps) {
  const baseStyles = 'animate-pulse bg-white/10'

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseStyles,
              'h-4 rounded',
              i === lines - 1 ? 'w-3/4' : 'w-full',
              className
            )}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        baseStyles,
        variant === 'circular' ? 'rounded-full' : 'rounded-lg',
        variant === 'text' ? 'h-4 w-full' : '',
        className
      )}
    />
  )
}

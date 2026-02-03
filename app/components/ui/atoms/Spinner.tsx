/**
 * Spinner Atom
 *
 * Loading indicator with multiple sizes.
 * Uses brand colors for the animated spinner.
 */

import { cn } from '~/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** Accessible label for screen readers */
  label?: string
}

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
}

export function Spinner({ size = 'md', className, label = 'Cargando...' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'animate-spin rounded-full border-brand border-t-transparent',
        sizes[size],
        className
      )}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}

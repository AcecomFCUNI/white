import { cn } from '~/lib/utils'

interface CardProps {
  children: React.ReactNode
  variant?: 'glass' | 'solid'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
  as?: 'div' | 'article'
}

/**
 * Card - Glassmorphism card component
 *
 * Variants:
 * - glass: Dark glassmorphism with white/10 border (story sections)
 * - solid: Solid gray-900 background with gray-800 border (pages)
 *
 * Padding:
 * - none: No padding
 * - sm: p-4
 * - md: p-6
 * - lg: p-8
 */
export function Card({
  children,
  variant = 'glass',
  hover = true,
  padding = 'md',
  className,
  as: Component = 'div',
}: CardProps) {
  const variants = {
    glass: 'rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl',
    solid: 'rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm',
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const hoverStyles = hover
    ? 'transition-all hover:border-brand/30 hover:bg-black/50'
    : ''

  return (
    <Component
      className={cn(
        variants[variant],
        paddings[padding],
        hoverStyles,
        className
      )}
    >
      {children}
    </Component>
  )
}

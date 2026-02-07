import { cn } from '~/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'section' | 'category' | 'skill'
  className?: string
}

/**
 * Badge - Versatile badge component for labels and tags
 *
 * Variants:
 * - section: Dark glassmorphism style for section headers (uppercase, tracking-widest)
 * - category: Brand-colored badge for categories
 * - skill: Small subtle badge for skills/tags
 */
export function Badge({
  children,
  variant = 'section',
  className,
}: BadgeProps) {
  const variants = {
    section: 'inline-block rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-4 py-2 text-xs uppercase tracking-widest text-gray-300',
    category: 'rounded-full bg-brand/20 px-3 py-1 text-xs font-medium text-brand',
    skill: 'rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300',
  }

  return (
    <span className={cn(variants[variant], className)}>
      {children}
    </span>
  )
}

import { cn } from '~/lib/utils'
import { forwardRef } from 'react'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'outline' | 'solid' | 'social'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  'aria-label': string
}

interface IconLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'ghost' | 'outline' | 'solid' | 'social'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  href: string
  'aria-label': string
}

const baseStyles = 'inline-flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-brand/50'

const variants = {
  ghost: 'text-gray-300 hover:text-white hover:bg-white/10',
  outline: 'border border-gray-700 text-gray-300 hover:border-brand hover:bg-brand hover:text-white',
  solid: 'bg-gray-100 text-gray-800 hover:bg-brand hover:text-white',
  social: 'bg-gray-100 text-gray-800 hover:bg-brand hover:text-white',
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
}

/**
 * IconButton - Button component for icon-only actions
 *
 * Variants:
 * - ghost: Transparent background with hover
 * - outline: Border with fill on hover
 * - solid: Light background (for light themes)
 * - social: For social media icons (same as solid)
 *
 * Always requires aria-label for accessibility
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'ghost', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
IconButton.displayName = 'IconButton'

/**
 * IconLink - Icon button styled as a link
 * Use for social media links or icon-only navigation
 */
export function IconLink({
  variant = 'social',
  size = 'lg',
  className,
  children,
  href,
  ...props
}: IconLinkProps) {
  return (
    <a
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  )
}

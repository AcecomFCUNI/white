import { cn } from '~/lib/utils'
import { forwardRef } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  href: string
}

const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-brand/50 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30',
  outline: 'border border-brand text-white hover:bg-brand hover:text-white',
  ghost: 'text-gray-300 hover:text-white hover:bg-white/10',
  whatsapp: 'bg-whatsapp text-white shadow-lg shadow-whatsapp/30 hover:bg-brand hover:text-white hover:shadow-xl hover:shadow-brand/40',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-lg',
}

/**
 * Button - Versatile button component
 *
 * Variants:
 * - primary: Brand red background
 * - outline: Transparent with brand border
 * - ghost: Transparent with subtle hover
 * - whatsapp: WhatsApp green with shadow effects
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
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
Button.displayName = 'Button'

/**
 * LinkButton - Button styled as a link
 * Use for navigation or external links that should look like buttons
 */
export function LinkButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: LinkButtonProps) {
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

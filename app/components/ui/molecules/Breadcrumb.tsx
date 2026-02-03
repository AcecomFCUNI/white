/**
 * Breadcrumb Molecule
 *
 * Navigation breadcrumb component with:
 * - Semantic HTML (nav + ol)
 * - ARIA attributes for accessibility
 * - Optional icons
 * - Customizable separator
 *
 * Usage:
 * <Breadcrumb items={[
 *   { label: 'Home', href: '/' },
 *   { label: 'Products', href: '/products' },
 *   { label: 'Current Page' }
 * ]} />
 */

import { type ReactNode } from 'react'
import { Link } from '@remix-run/react'
import { cn } from '~/lib/utils'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'

export interface BreadcrumbItem {
  /** Display label for the breadcrumb item */
  label: string
  /** Optional href - if not provided, item is rendered as current page */
  href?: string
  /** Optional icon to display before label */
  icon?: ReactNode
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[]
  /** Custom separator element (default: ChevronRight) */
  separator?: ReactNode
  /** Show home icon for first item */
  showHomeIcon?: boolean
  /** Additional class names */
  className?: string
}

export function Breadcrumb({
  items,
  separator,
  showHomeIcon = false,
  className,
}: BreadcrumbProps) {
  if (items.length === 0) return null

  const defaultSeparator = (
    <ChevronRightIcon className="h-4 w-4 text-gray-600" aria-hidden="true" />
  )

  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isFirst = index === 0

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {/* Separator (except for first item) */}
              {index > 0 && (
                <span className="mx-1" aria-hidden="true">
                  {separator || defaultSeparator}
                </span>
              )}

              {/* Breadcrumb item */}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1.5 text-gray-400 transition-colors hover:text-white"
                >
                  {isFirst && showHomeIcon && (
                    <HomeIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  {item.icon && !showHomeIcon && (
                    <span aria-hidden="true">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1.5',
                    isLast ? 'font-medium text-white' : 'text-gray-400'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isFirst && showHomeIcon && (
                    <HomeIcon className="h-4 w-4" aria-hidden="true" />
                  )}
                  {item.icon && !showHomeIcon && (
                    <span aria-hidden="true">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

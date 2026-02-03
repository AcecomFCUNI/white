/**
 * EmptyState Molecule
 *
 * Display component for empty/no-data states with:
 * - Optional icon
 * - Title and description
 * - Optional action button
 *
 * Usage:
 * <EmptyState
 *   icon={<FolderIcon className="h-12 w-12" />}
 *   title="No projects yet"
 *   description="Create your first project to get started"
 *   action={{ label: 'Create Project', onClick: () => {} }}
 * />
 */

import { type ReactNode } from 'react'
import { cn } from '~/lib/utils'
import { Button } from '../atoms/Button'
import { InboxIcon } from '@heroicons/react/24/outline'

export interface EmptyStateAction {
  /** Button label */
  label: string
  /** Click handler */
  onClick: () => void
  /** Button variant */
  variant?: 'primary' | 'outline' | 'ghost' | 'whatsapp'
}

export interface EmptyStateProps {
  /** Optional icon to display (default: InboxIcon) */
  icon?: ReactNode
  /** Title text */
  title: string
  /** Optional description text */
  description?: string
  /** Optional action button */
  action?: EmptyStateAction
  /** Additional class names */
  className?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: {
    container: 'py-8',
    icon: 'h-10 w-10',
    title: 'text-base',
    description: 'text-sm',
  },
  md: {
    container: 'py-12',
    icon: 'h-12 w-12',
    title: 'text-lg',
    description: 'text-sm',
  },
  lg: {
    container: 'py-16',
    icon: 'h-16 w-16',
    title: 'text-xl',
    description: 'text-base',
  },
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  size = 'md',
}: EmptyStateProps) {
  const sizes = sizeClasses[size]

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        sizes.container,
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4 text-gray-500">
        {icon || <InboxIcon className={sizes.icon} />}
      </div>

      {/* Title */}
      <h3
        className={cn(
          'font-montserrat font-semibold text-white',
          sizes.title
        )}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className={cn('mt-2 max-w-md text-gray-400', sizes.description)}>
          {description}
        </p>
      )}

      {/* Action */}
      {action && (
        <div className="mt-6">
          <Button
            variant={action.variant || 'primary'}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  )
}

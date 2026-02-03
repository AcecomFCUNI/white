/**
 * Tooltip Molecule
 *
 * Accessible tooltip component with:
 * - Multiple positions (top, bottom, left, right)
 * - Keyboard accessibility
 * - Reduced motion support
 * - ARIA attributes
 *
 * Usage:
 * <Tooltip content="Helpful info">
 *   <button>Hover me</button>
 * </Tooltip>
 */

import { useState, useRef, type ReactNode, type ReactElement } from 'react'
import { cn } from '~/lib/utils'
import { useReducedMotion } from '~/hooks'

export interface TooltipProps {
  /** Text content to display in tooltip */
  content: string
  /** Position of tooltip relative to trigger */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Element that triggers the tooltip */
  children: ReactElement
  /** Delay before showing tooltip (ms) */
  delay?: number
  /** Additional class names for the tooltip */
  className?: string
}

const positionClasses = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowClasses = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent',
}

const animationClasses = {
  top: 'animate-in fade-in slide-in-from-bottom-1 duration-150',
  bottom: 'animate-in fade-in slide-in-from-top-1 duration-150',
  left: 'animate-in fade-in slide-in-from-right-1 duration-150',
  right: 'animate-in fade-in slide-in-from-left-1 duration-150',
}

export function Tooltip({
  content,
  position = 'top',
  children,
  delay = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).substr(2, 9)}`)
  const prefersReducedMotion = useReducedMotion()

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  return (
    <div className="relative inline-block">
      {/* Trigger element with ARIA attributes */}
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        aria-describedby={isVisible ? tooltipId.current : undefined}
      >
        {children}
      </div>

      {/* Tooltip */}
      {isVisible && (
        <div
          id={tooltipId.current}
          role="tooltip"
          className={cn(
            'absolute z-50 whitespace-nowrap rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white shadow-lg',
            positionClasses[position],
            !prefersReducedMotion && animationClasses[position],
            className
          )}
        >
          {content}
          {/* Arrow */}
          <div
            className={cn(
              'absolute h-0 w-0 border-4',
              arrowClasses[position]
            )}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}

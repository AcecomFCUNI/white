/**
 * Pagination Molecule
 *
 * Navigation component for paginated content with:
 * - Page numbers with ellipsis for large page counts
 * - Previous/Next buttons
 * - ARIA attributes for accessibility
 * - Keyboard navigation
 *
 * Usage:
 * <Pagination
 *   currentPage={1}
 *   totalPages={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 */

import { useMemo } from 'react'
import { cn } from '~/lib/utils'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export interface PaginationProps {
  /** Current active page (1-indexed) */
  currentPage: number
  /** Total number of pages */
  totalPages: number
  /** Callback when page changes */
  onPageChange: (page: number) => void
  /** Number of page buttons to show on each side of current (default: 1) */
  siblingCount?: number
  /** Show first/last page buttons */
  showFirstLast?: boolean
  /** Additional class names */
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className,
}: PaginationProps) {
  // Generate array of page numbers to display
  const pages = useMemo(() => {
    const range = (start: number, end: number) => {
      const length = end - start + 1
      return Array.from({ length }, (_, idx) => start + idx)
    }

    // Total page numbers to show (excluding ellipsis)
    const totalPageNumbers = siblingCount * 2 + 3 + 2 // siblings + first + last + current + 2 boundaries

    // If we have fewer pages than we'd show, display all
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    // No left dots, show right dots
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, 'ellipsis-right', totalPages]
    }

    // Show left dots, no right dots
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPages - rightItemCount + 1, totalPages)
      return [firstPageIndex, 'ellipsis-left', ...rightRange]
    }

    // Show both dots
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, 'ellipsis-left', ...middleRange, 'ellipsis-right', lastPageIndex]
    }

    return range(1, totalPages)
  }, [currentPage, totalPages, siblingCount])

  if (totalPages <= 1) return null

  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      {/* Previous button */}
      <button
        type="button"
        onClick={() => canGoPrevious && onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 transition-colors',
          canGoPrevious
            ? 'text-gray-300 hover:border-brand hover:text-white'
            : 'cursor-not-allowed text-gray-600'
        )}
        aria-label="Página anterior"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (typeof page === 'string') {
          // Ellipsis
          return (
            <span
              key={page}
              className="flex h-9 w-9 items-center justify-center text-gray-500"
              aria-hidden="true"
            >
              ...
            </span>
          )
        }

        const isActive = page === currentPage

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              'flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors',
              isActive
                ? 'border-brand bg-brand/20 text-white'
                : 'border-gray-700 text-gray-300 hover:border-brand hover:text-white'
            )}
            aria-label={`Página ${page}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* Next button */}
      <button
        type="button"
        onClick={() => canGoNext && onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 transition-colors',
          canGoNext
            ? 'text-gray-300 hover:border-brand hover:text-white'
            : 'cursor-not-allowed text-gray-600'
        )}
        aria-label="Página siguiente"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  )
}

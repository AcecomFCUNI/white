/**
 * Modal/Dialog Molecule
 *
 * Accessible modal component with:
 * - Focus trap (keeps focus inside modal)
 * - Escape key to close
 * - Click outside to close
 * - ARIA attributes for screen readers
 * - Reduced motion support
 * - Multiple sizes
 *
 * Usage:
 * <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="My Modal">
 *   <p>Modal content here</p>
 * </Modal>
 */

import { useEffect, useRef, useCallback, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '~/lib/utils'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useReducedMotion } from '~/hooks'

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean
  /** Callback when modal should close */
  onClose: () => void
  /** Optional title displayed in header */
  title?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Modal content */
  children: ReactNode
  /** Additional class names for the modal panel */
  className?: string
  /** Whether clicking outside closes the modal (default: true) */
  closeOnOverlayClick?: boolean
  /** Whether pressing Escape closes the modal (default: true) */
  closeOnEscape?: boolean
  /** Show close button in header (default: true) */
  showCloseButton?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]',
}

export function Modal({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
  className,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  // Handle escape key
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose()
      }
    },
    [closeOnEscape, onClose]
  )

  // Focus trap - get all focusable elements
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return []
    return modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  }, [])

  // Handle tab key for focus trap
  const handleTabKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift + Tab: go to last element if on first
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: go to first element if on last
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    },
    [getFocusableElements]
  )

  // Setup event listeners and focus management
  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement

      // Add event listeners
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keydown', handleTabKey)

      // Prevent body scroll
      document.body.style.overflow = 'hidden'

      // Focus first focusable element in modal
      const focusableElements = getFocusableElements()
      if (focusableElements.length > 0) {
        // Small delay to ensure modal is rendered
        requestAnimationFrame(() => {
          focusableElements[0].focus()
        })
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keydown', handleTabKey)
        document.body.style.overflow = ''

        // Restore focus to previous element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus()
        }
      }
    }
  }, [isOpen, handleKeyDown, handleTabKey, getFocusableElements])

  // Handle overlay click
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose()
    }
  }

  // Don't render if not open
  if (!isOpen) return null

  // Use portal to render at document body level
  // Check if we're in browser (for SSR safety)
  if (typeof document === 'undefined') return null

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        !prefersReducedMotion && 'animate-in fade-in duration-200'
      )}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn(
          'relative w-full rounded-xl border border-gray-800 bg-gray-900/95 shadow-2xl backdrop-blur-xl',
          !prefersReducedMotion && 'animate-in zoom-in-95 duration-200',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
            {title && (
              <h2
                id="modal-title"
                className="font-montserrat text-lg font-semibold text-white"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white',
                  !title && 'ml-auto'
                )}
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

// Optional: Export a simple hook for modal state management
export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return { isOpen, open, close, toggle }
}

// Need to import useState for the hook
import { useState } from 'react'

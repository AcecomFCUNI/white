/**
 * Toast Molecule
 *
 * Notification component with variants:
 * - success: Green with checkmark
 * - error: Red with X icon
 * - warning: Yellow with warning icon
 * - info: Blue with info icon
 *
 * Usage with ToastProvider:
 * const { addToast } = useToast()
 * addToast({ message: 'Success!', variant: 'success' })
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { cn } from '~/lib/utils'
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

// Types
interface Toast {
  id: string
  message: string
  variant: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

// Context
const ToastContext = createContext<ToastContextValue | null>(null)

// Hook
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Provider
interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }

    setToasts((prev) => [...prev, newToast])

    // Auto-remove after duration (default 5 seconds)
    const duration = toast.duration ?? 5000
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

// Toast Container
interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

// Individual Toast
interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

const variants = {
  success: {
    bg: 'bg-green-500/10 border-green-500/50',
    icon: CheckCircleIcon,
    iconColor: 'text-green-500',
  },
  error: {
    bg: 'bg-red-500/10 border-red-500/50',
    icon: XCircleIcon,
    iconColor: 'text-red-500',
  },
  warning: {
    bg: 'bg-yellow-500/10 border-yellow-500/50',
    icon: ExclamationTriangleIcon,
    iconColor: 'text-yellow-500',
  },
  info: {
    bg: 'bg-blue-500/10 border-blue-500/50',
    icon: InformationCircleIcon,
    iconColor: 'text-blue-500',
  },
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const { bg, icon: Icon, iconColor } = variants[toast.variant]

  return (
    <div
      role="alert"
      className={cn(
        'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg backdrop-blur-xl animate-in slide-in-from-right-full duration-300',
        bg
      )}
    >
      <Icon className={cn('h-5 w-5 flex-shrink-0', iconColor)} />
      <p className="text-sm text-white">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-2 flex-shrink-0 rounded-full p-1 text-gray-300 hover:bg-white/10 hover:text-white"
        aria-label="Cerrar notificación"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

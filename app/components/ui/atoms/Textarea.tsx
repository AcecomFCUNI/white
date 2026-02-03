/**
 * Textarea Atom
 *
 * Multi-line text input with variants:
 * - default: Standard textarea with border
 * - error: Red border for validation errors
 * - success: Green border for valid state
 *
 * Follows the space theme with dark background and brand accent.
 */

import { forwardRef } from 'react'
import { cn } from '~/lib/utils'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error' | 'success'
  label?: string
  error?: string
  helperText?: string
}

const baseStyles =
  'w-full rounded-lg border bg-black/40 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50 resize-y min-h-[120px]'

const variants = {
  default: 'border-white/10 focus:border-brand focus:ring-brand/50',
  error: 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
  success: 'border-green-500 focus:border-green-500 focus:ring-green-500/50',
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'default', label, error, helperText, className, id, ...props }, ref) => {
    const textareaId = id || props.name
    const effectiveVariant = error ? 'error' : variant

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(baseStyles, variants[effectiveVariant], className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

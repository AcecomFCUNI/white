/**
 * Input Atom
 *
 * Text input field with multiple variants:
 * - default: Standard input with border
 * - error: Red border for validation errors
 * - success: Green border for valid state
 *
 * Follows the space theme with dark background and brand accent.
 */

import { forwardRef } from 'react'
import { cn } from '~/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error' | 'success'
  label?: string
  error?: string
  helperText?: string
}

const baseStyles =
  'w-full rounded-lg border bg-black/40 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  default: 'border-white/10 focus:border-brand focus:ring-brand/50',
  error: 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
  success: 'border-green-500 focus:border-green-500 focus:ring-green-500/50',
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || props.name
    const effectiveVariant = error ? 'error' : variant

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(baseStyles, variants[effectiveVariant], className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

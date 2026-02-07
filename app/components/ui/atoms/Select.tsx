/**
 * Select Atom
 *
 * Dropdown select with variants:
 * - default: Standard select with border
 * - error: Red border for validation errors
 * - success: Green border for valid state
 *
 * Follows the space theme with dark background and brand accent.
 */

import { forwardRef } from 'react'
import { cn } from '~/lib/utils'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  variant?: 'default' | 'error' | 'success'
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

const baseStyles =
  'w-full appearance-none rounded-lg border bg-black/40 px-4 py-3 pr-10 text-white backdrop-blur-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:cursor-not-allowed disabled:opacity-50'

const variants = {
  default: 'border-white/10 focus:border-brand focus:ring-brand/50',
  error: 'border-red-500 focus:border-red-500 focus:ring-red-500/50',
  success: 'border-green-500 focus:border-green-500 focus:ring-green-500/50',
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant = 'default', label, error, helperText, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || props.name
    const effectiveVariant = error ? 'error' : variant

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(baseStyles, variants[effectiveVariant], className)}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-gray-900 text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300" />
        </div>
        {error && (
          <p id={`${selectId}-error`} className="mt-2 text-sm text-red-500">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="mt-2 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

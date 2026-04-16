'use client'

import * as React from 'react'
import { Input as UIInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/**
 * AppInput
 * Design system controlled input primitive
 * 
 * ENTRY POINT for all text input usage
 * Wraps ui/input with design system styling
 * 
 * @example
 * import { AppInput } from '@/components/primitives'
 * 
 * <AppInput placeholder="Enter text" />
 */

interface AppInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  icon?: React.ComponentType<{ className?: string }>
  iconPosition?: 'left' | 'right'
}

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, error, icon: Icon, iconPosition = 'left', ...props }, ref) => {
    const containerClass = Icon ? 'relative' : ''
    const inputPaddingClass = Icon
      ? iconPosition === 'left'
        ? 'pl-10'
        : 'pr-10'
      : ''

    return (
      <div className={containerClass}>
        {Icon && (
          <Icon
            className={cn(
              'absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none',
              iconPosition === 'left' ? 'left-3' : 'right-3'
            )}
          />
        )}
        <UIInput
          ref={ref}
          className={cn(
            // Design system colors
            'bg-white text-slate-900 placeholder-slate-400',
            'border border-slate-300',
            'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
            // Dark mode
            'dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500',
            'dark:border-slate-700',
            'dark:focus:border-blue-400 dark:focus:ring-blue-400/20',
            // Error state
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            // Icon padding
            inputPaddingClass,
            // Spacing: 4px grid per design system
            'h-9 px-3 py-2 text-sm',
            // Disabled state
            'disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed',
            'dark:disabled:bg-slate-900 dark:disabled:text-slate-600',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

AppInput.displayName = 'AppInput'

export { AppInput }
export type { AppInputProps }

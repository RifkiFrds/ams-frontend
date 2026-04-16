'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

/**
 * AppButton
 * Design system controlled button primitive
 * 
 * ENTRY POINT for all button usage in the app
 * Wraps ui/button with design system styling and behavior
 * 
 * @example
 * import { AppButton } from '@/components/primitives'
 * 
 * <AppButton variant="primary" loading>Submit</AppButton>
 */

const appButtonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        // Primary - brand blue theme per design system
        primary:
          'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus-visible:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:active:bg-blue-700',

        // Secondary - neutral gray
        secondary:
          'bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400 focus-visible:ring-slate-400 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:active:bg-slate-500',

        // Outline - bordered
        outline:
          'border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950 dark:active:bg-blue-900',

        // Danger - red theme for destructive actions
        danger:
          'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 dark:bg-red-500 dark:hover:bg-red-600 dark:active:bg-red-700',

        // Ghost - transparent background
        ghost:
          'text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700',
      },
      size: {
        // Compact - 36px height (touch minimum 44px with padding)
        sm: 'h-8 px-3 gap-2 text-xs',
        md: 'h-9 px-4 gap-2 text-sm',
        lg: 'h-10 px-5 gap-2 text-base',
        // Icon only
        icon: 'h-9 w-9 p-0',
        icon_sm: 'h-8 w-8 p-0',
        icon_lg: 'h-10 w-10 p-0',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appButtonVariants> {
  loading?: boolean
  icon?: React.ComponentType<{ className?: string }>
  iconPosition?: 'left' | 'right'
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      icon: Icon,
      iconPosition = 'left',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          appButtonVariants({ variant, size, fullWidth }),
          'relative',
          className
        )}
        {...props}
      >
        {/* Loading spinner overlay */}
        {loading && (
          <Loader2 className="absolute h-full w-full animate-spin" />
        )}

        {/* Content - fade when loading */}
        <span className={cn('flex items-center gap-2', loading && 'invisible')}>
          {Icon && iconPosition === 'left' && (
            <Icon className={size?.startsWith('icon') ? 'h-4 w-4' : 'h-4 w-4'} />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon className={size?.startsWith('icon') ? 'h-4 w-4' : 'h-4 w-4'} />
          )}
        </span>
      </button>
    )
  }
)

AppButton.displayName = 'AppButton'

export { AppButton, appButtonVariants }
export type { AppButtonProps }

'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

/**
 * AppBadge
 * Design system controlled badge primitive
 * 
 * ENTRY POINT for all badge/tag usage
 * Design system status indicators
 * 
 * @example
 * import { AppBadge } from '@/components/primitives'
 * 
 * <AppBadge variant="success">Active</AppBadge>
 */

const appBadgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-all',
  {
    variants: {
      variant: {
        // Status colors per design system
        success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
        warning: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
        danger: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300',
        info: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
        neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300',
      },
      style: {
        solid: '',
        outline: 'border-2',
        dot: '',
      },
    },
    compoundVariants: [
      {
        variant: 'success',
        style: 'outline',
        className: 'border-emerald-300 bg-transparent dark:border-emerald-700',
      },
      {
        variant: 'warning',
        style: 'outline',
        className: 'border-amber-300 bg-transparent dark:border-amber-700',
      },
      {
        variant: 'danger',
        style: 'outline',
        className: 'border-red-300 bg-transparent dark:border-red-700',
      },
      {
        variant: 'info',
        style: 'outline',
        className: 'border-blue-300 bg-transparent dark:border-blue-700',
      },
      {
        variant: 'neutral',
        style: 'outline',
        className: 'border-slate-300 bg-transparent dark:border-slate-700',
      },
    ],
    defaultVariants: {
      variant: 'neutral',
      style: 'solid',
    },
  }
)

interface AppBadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "style">,
    VariantProps<typeof appBadgeVariants> {
  removable?: boolean
  onRemove?: () => void
  icon?: React.ComponentType<{ className?: string }>
}

const AppBadge = React.forwardRef<HTMLSpanElement, AppBadgeProps>(
  (
    { className, variant, style, removable, onRemove, icon: Icon, children, ...props },
    ref
  ) => (
    <span
      ref={ref}
      className={cn(appBadgeVariants({ variant, style }), className)}
      {...props}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70"
          aria-label="Remove"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  )
)

AppBadge.displayName = 'AppBadge'

export { AppBadge, appBadgeVariants }
export type { AppBadgeProps }

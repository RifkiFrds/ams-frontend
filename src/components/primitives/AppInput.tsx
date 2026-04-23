'use client'

import * as React from 'react'
import { Input as UIInput } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  icon?: React.ComponentType<{ className?: string }>
  iconPosition?: 'left' | 'right'
}

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, error, icon: Icon, iconPosition = 'left', ...props }, ref) => {
    return (
      <div className={Icon ? 'relative' : ''}>
        {Icon && (
          <Icon
            className={cn(
              'absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none',
              iconPosition === 'left' ? 'left-3' : 'right-3'
            )}
          />
        )}
        <UIInput
          ref={ref}
          className={cn(
            'bg-input border-border text-foreground placeholder:text-muted-foreground',
            'focus:border-primary focus:ring-1 focus:ring-primary',
            'h-10 px-3 py-2 text-sm rounded-lg',
            error && 'border-destructive focus:border-destructive focus:ring-destructive',
            Icon && (iconPosition === 'left' ? 'pl-10' : 'pr-10'),
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    )
  }
)
AppInput.displayName = 'AppInput'
export { AppInput }
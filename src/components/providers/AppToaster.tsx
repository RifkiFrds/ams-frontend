'use client'

import { Toaster } from 'sonner'
import { useTheme } from 'next-themes'

/**
 * AppToaster Component
 * Custom wrapper for Sonner that integrates with our Design System CSS Variables.
 */

export function AppToaster() {
  const { theme = 'dark' } = useTheme()

  return (
    <Toaster
      theme={theme as 'light' | 'dark' | 'system'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          success: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-success',
          error: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-destructive',
          info: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-secondary',
          warning: 'group-[.toaster]:border-l-4 group-[.toaster]:border-l-warning',
        },
      }}
      position="top-right"
      expand={true}
      richColors={false} // We use our own custom styling for richness
      closeButton
    />
  )
}

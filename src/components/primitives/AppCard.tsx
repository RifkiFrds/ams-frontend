'use client'

import * as React from 'react'
import { Card as UICard } from '@/components/ui/card'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * AppCard
 * Design system controlled card primitive
 * 
 * ENTRY POINT for all card usage
 * Wraps ui/card with design system styling
 * 
 * @example
 * import { AppCard } from '@/components/primitives'
 * 
 * <AppCard>
 *   <AppCard.Header>
 *     <AppCard.Title>Title</AppCard.Title>
 *   </AppCard.Header>
 *   <AppCard.Content>Content</AppCard.Content>
 * </AppCard>
 */

const appCardVariants = cva(
  'rounded-lg border transition-all',
  {
    variants: {
      variant: {
        // Default - neutral card
        default:
          'bg-white border-slate-200 shadow-sm hover:shadow-md dark:bg-slate-950 dark:border-slate-800',

        // Elevated - with shadow
        elevated:
          'bg-white border-slate-200 shadow-md dark:bg-slate-950 dark:border-slate-800',

        // Alert - left border accent
        alert:
          'bg-white border-slate-200 border-l-4 border-l-blue-500 shadow-sm dark:bg-slate-950 dark:border-slate-800 dark:border-l-blue-400',

        // Success variant
        success:
          'bg-emerald-50 border-emerald-200 shadow-sm dark:bg-emerald-950/20 dark:border-emerald-900',

        // Warning variant
        warning:
          'bg-amber-50 border-amber-200 shadow-sm dark:bg-amber-950/20 dark:border-amber-900',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      interactive: false,
    },
  }
)

interface AppCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appCardVariants> {}

const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
  ({ className, variant, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(appCardVariants({ variant, interactive }), className)}
      {...props}
    />
  )
)
AppCard.displayName = 'AppCard'

interface AppCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const AppCardHeader = React.forwardRef<HTMLDivElement, AppCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 border-b border-slate-200 p-4 dark:border-slate-800', className)}
      {...props}
    />
  )
)
AppCardHeader.displayName = 'AppCardHeader'

interface AppCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AppCardTitle = React.forwardRef<HTMLParagraphElement, AppCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100',
        className
      )}
      {...props}
    />
  )
)
AppCardTitle.displayName = 'AppCardTitle'

interface AppCardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const AppCardDescription = React.forwardRef<
  HTMLParagraphElement,
  AppCardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-slate-600 dark:text-slate-400', className)}
    {...props}
  />
))
AppCardDescription.displayName = 'AppCardDescription'

interface AppCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AppCardContent = React.forwardRef<HTMLDivElement, AppCardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-4', className)} {...props} />
  )
)
AppCardContent.displayName = 'AppCardContent'

interface AppCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const AppCardFooter = React.forwardRef<HTMLDivElement, AppCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between border-t border-slate-200 p-4 dark:border-slate-800',
        className
      )}
      {...props}
    />
  )
)
AppCardFooter.displayName = 'AppCardFooter'

export {
  AppCard,
  AppCardHeader,
  AppCardTitle,
  AppCardDescription,
  AppCardContent,
  AppCardFooter,
  appCardVariants,
}
export type { AppCardProps }

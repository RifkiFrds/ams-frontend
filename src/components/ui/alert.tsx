/**
 * Alert Component
 * Status alert with icon, title, description, and optional action
 *
 * Types: info, success, warning, danger
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  X,
} from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current",
  {
    variants: {
      variant: {
        info: "border-blue-500/30 bg-blue-500/10 text-blue-900 dark:border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-200",
        success:
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-emerald-200",
        warning:
          "border-amber-500/30 bg-amber-500/10 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/20 dark:text-amber-200",
        danger:
          "border-red-500/30 bg-red-500/10 text-red-900 dark:border-red-500/40 dark:bg-red-500/20 dark:text-red-200",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof alertVariants> {
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
}

const iconMap = {
  info: AlertCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertOctagon,
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "info",
      title,
      description,
      action,
      dismissible,
      onDismiss,
      ...props
    },
    ref
  ) => {
    const Icon = iconMap[variant as keyof typeof iconMap]
    const [isDismissed, setIsDismissed] = React.useState(false)

    if (isDismissed) return null

    const handleDismiss = () => {
      setIsDismissed(true)
      onDismiss?.()
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        <Icon className="h-4 w-4" />
        <div className="ml-7 flex flex-col gap-2">
          <h5 className="font-medium leading-tight">{title}</h5>
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
          {action && <div className="mt-1">{action}</div>}
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="absolute right-4 top-4 inline-flex rounded-md p-1 opacity-70 hover:opacity-100"
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

export { Alert, alertVariants }
export type { AlertProps }

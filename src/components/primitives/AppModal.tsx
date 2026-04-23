'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogPortal,
  DialogOverlay,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface AppModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  showCloseButton?: boolean
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  full: 'max-w-[95vw]',
}

/**
 * AppModal Primitive
 * Base dialog component with project's design system tokens.
 */
export function AppModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  size = 'md',
  showCloseButton = true,
}: AppModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 fixed inset-0 z-50" />
        <DialogContent 
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full translate-x-[-50%] translate-y-[-50%]",
            "bg-card border border-border shadow-2xl rounded-xl p-0 overflow-hidden outline-none",
            "animate-in fade-in zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-48 duration-200",
            sizeClasses[size],
            className
          )}
        >
          {/* Header */}
          <DialogHeader className="p-6 pb-2 relative">
            <DialogTitle className="text-lg font-bold text-foreground pr-8">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                {description}
              </DialogDescription>
            )}
            
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-all outline-none"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            )}
          </DialogHeader>
          
          {/* Content */}
          <div className="p-6 pt-2">
            {children}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

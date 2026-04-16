'use client'

import * as React from 'react'
import {
  Select as UISelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

/**
 * AppSelect
 * Design system controlled select primitive
 * 
 * ENTRY POINT for all select usage
 * Wraps ui/select with design system styling
 * 
 * @example
 * import { AppSelect } from '@/components/primitives'
 * 
 * <AppSelect
 *   options={[{ value: 'a', label: 'Option A' }]}
 *   onChange={setSelected}
 * />
 */

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectGroupOption {
  label: string
  options: SelectOption[]
}

interface AppSelectProps {
  value?: string
  onValueChange?: (value: string) => void
  options?: (SelectOption | SelectGroupOption)[]
  placeholder?: string
  error?: string
  disabled?: boolean
}

function isGroup(
  option: SelectOption | SelectGroupOption
): option is SelectGroupOption {
  return 'options' in option
}

const AppSelect = React.forwardRef<HTMLButtonElement, AppSelectProps>(
  (
    {
      value,
      onValueChange,
      options = [],
      placeholder = 'Select option',
      error,
      disabled,
    },
    ref
  ) => {
    return (
      <div>
        <UISelect value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            className={cn(
              // Design system colors
              'bg-white text-slate-900',
              'border border-slate-300',
              'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
              // Dark mode
              'dark:bg-slate-950 dark:text-slate-100',
              'dark:border-slate-700',
              'dark:focus:border-blue-400 dark:focus:ring-blue-400/20',
              // Error state
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              // Spacing
              'h-9 px-3',
              // Disabled
              'disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed',
              'dark:disabled:bg-slate-900 dark:disabled:text-slate-600'
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, idx) => {
              if (isGroup(option)) {
                return (
                  <div key={idx}>
                    <div className="py-1.5 pl-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {option.label}
                    </div>
                    {option.options.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </div>
                )
              }

              return (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </UISelect>
        {error && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

AppSelect.displayName = 'AppSelect'

export { AppSelect }
export type { AppSelectProps, SelectOption, SelectGroupOption }

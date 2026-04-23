'use client'

import * as React from 'react'
import { Select as UISelect, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export interface SelectOption { value: string; label: string; disabled?: boolean }
export interface SelectGroupOption { label: string; options: SelectOption[] }

export interface AppSelectProps {
  value?: string; 
  onValueChange?: (value: string) => void;
  options?: (SelectOption | SelectGroupOption)[]; 
  placeholder?: string; 
  error?: string; 
  disabled?: boolean;
}

const AppSelect = React.forwardRef<HTMLButtonElement, AppSelectProps>(
  ({ value, onValueChange, options = [], placeholder = 'Select category', error, disabled }, ref) => {
    return (
      <div>
        <UISelect value={value} onValueChange={onValueChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            className={cn(
              'bg-input border-border text-foreground',
              'focus:border-primary focus:ring-1 focus:ring-primary',
              'h-10 px-3 rounded-lg',
              error && 'border-destructive focus:border-destructive focus:ring-destructive',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="bg-card border-border text-foreground">
            {options.map((option, idx) => {
              if ('options' in option) {
                return (
                  <SelectGroup key={`group-${idx}`}>
                    <SelectLabel>{option.label}</SelectLabel>
                    {option.options.map((subOption) => (
                      <SelectItem 
                        key={subOption.value} 
                        value={subOption.value} 
                        disabled={subOption.disabled}
                        className="focus:bg-muted"
                      >
                        {subOption.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                )
              }
              return (
                <SelectItem 
                  key={option.value} 
                  value={option.value} 
                  disabled={option.disabled} 
                  className="focus:bg-muted"
                >
                  {option.label}
                </SelectItem>
              )
            })}
          </SelectContent>
        </UISelect>
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    )
  }
)
AppSelect.displayName = 'AppSelect'
export { AppSelect }
/**
 * Form Select Component
 * Select dropdown integrated with form field system
 */

import * as React from "react"
import { AppSelect } from "@/components/primitives"
import { cn } from "@/lib/utils"

interface FormSelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface FormSelectGroupOption {
  label: string
  options: FormSelectOption[]
}

interface FormSelectProps extends Omit<React.ComponentPropsWithoutRef<"button">, "value"> {
  value?: string
  onValueChange?: (value: string) => void
  options?: (FormSelectOption | FormSelectGroupOption)[]
  placeholder?: string
  error?: string
}

/**
 * FormSelect
 * Select component with form integration
 * Supports grouped options
 */
const FormSelect = React.forwardRef<
  HTMLButtonElement,
  FormSelectProps
>(
  (
    {
      value,
      onValueChange,
      options = [],
      placeholder = "Select an option",
      error,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <AppSelect
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        options={options}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
        {...props}
      />
    )
  }
)

FormSelect.displayName = "FormSelect"

export { FormSelect }
export type { FormSelectProps, FormSelectOption, FormSelectGroupOption }

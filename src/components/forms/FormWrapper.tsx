'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Base Form Component
 *
 * Wrapper for React Hook Form
 * DO NOT use GraphQL queries directly in this component.
 *
 * Usage:
 * <FormWrapper onSubmit={handleSubmit}>
 *   <FormField label="Name" {...register('name')} />
 *   <FormButton>Submit</FormButton>
 * </FormWrapper>
 */

interface FormWrapperProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  isLoading?: boolean;
  error?: string;
  children: React.ReactNode;
}

export const FormWrapper = React.forwardRef<HTMLFormElement, FormWrapperProps>(
  ({ isLoading = false, error, children, className, ...props }, ref) => (
    <form
      ref={ref}
      className={cn('space-y-6', className)}
      {...props}
    >
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}
      {children}
    </form>
  )
);
FormWrapper.displayName = 'FormWrapper';

/**
 * Form Field Component
 *
 * Wrapper for form inputs with label and error message
 */

interface FormFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, containerClassName, className, ...props }, ref) => (
    <div className={cn('space-y-2', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm',
          'placeholder-gray-400',
          'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
          'dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {helperText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  )
);
FormField.displayName = 'FormField';

/**
 * Form Textarea Component
 */

interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FormTextareaProps
>(({ label, error, helperText, containerClassName, className, ...props }, ref) => (
  <div className={cn('space-y-2', containerClassName)}>
    {label && (
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {props.required && <span className="text-red-500">*</span>}
      </label>
    )}
    <textarea
      ref={ref}
      className={cn(
        'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm',
        'placeholder-gray-400',
        'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
        'dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500',
        error && 'border-red-500 focus:ring-red-500',
        className
      )}
      {...props}
    />
    {helperText && !error && (
      <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
    )}
    {error && (
      <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
    )}
  </div>
));
FormTextarea.displayName = 'FormTextarea';

/**
 * Form Select Component
 */

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
  containerClassName?: string;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, options, containerClassName, className, ...props }, ref) => (
    <div className={cn('space-y-2', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm',
          'focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
          'dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        <option value="">Select an option...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  )
);
FormSelect.displayName = 'FormSelect';

/**
 * Form Button Component
 */

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const FormButton = React.forwardRef<HTMLButtonElement, FormButtonProps>(
  ({ isLoading = false, variant = 'primary', className, ...props }, ref) => (
    <button
      ref={ref}
      disabled={isLoading || props.disabled}
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        {
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:focus:ring-offset-gray-900':
            variant === 'primary',
          'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600':
            variant === 'secondary',
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500':
            variant === 'danger',
        },
        isLoading && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {props.children}
    </button>
  )
);
FormButton.displayName = 'FormButton';

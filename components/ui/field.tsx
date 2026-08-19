'use client'

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

/* ==========================================================================
   Form field primitives.
   Label, hint, error wiring and focus styling live here so every form on the
   site is accessible by construction rather than by remembering to do it.
   ========================================================================== */

const controlClasses = [
  'w-full rounded-input border bg-elevated px-4 py-3',
  'font-sans text-base text-ink placeholder:text-ink-subtle',
  'transition-[border-color,box-shadow] duration-[var(--t-duration-fast)]',
  'focus:outline-none focus:border-primary focus:shadow-ring',
  'disabled:cursor-not-allowed disabled:bg-surface disabled:opacity-60',
]

type FieldShellProps = {
  label: string
  hint?: string
  error?: string
  required?: boolean
  /** Hides the label visually while keeping it for screen readers. */
  hideLabel?: boolean
  className?: string
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
}

function FieldShell({ label, hint, error, required, hideLabel, className, children }: FieldShellProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={id}
        className={cn(
          'font-sans text-sm font-semibold text-ink',
          hideLabel && 'sr-only',
        )}
      >
        {label}
        {required ? (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {children({ id, describedBy, invalid: Boolean(error) })}

      {hint && !error ? (
        <p id={hintId} className="text-sm text-ink-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export type InputFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> & {
  label: string
  hint?: string
  error?: string
  hideLabel?: boolean
  className?: string
  /** Rendered inside the control, on the left. */
  leadingIcon?: ReactNode
}

export function InputField({
  label,
  hint,
  error,
  hideLabel,
  className,
  leadingIcon,
  required,
  ...props
}: InputFieldProps) {
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      hideLabel={hideLabel}
      className={className}
    >
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          {leadingIcon ? (
            <span
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-ink-subtle [&>svg]:size-5"
              aria-hidden="true"
            >
              {leadingIcon}
            </span>
          ) : null}
          <input
            id={id}
            required={required}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn(
              controlClasses,
              invalid ? 'border-danger' : 'border-border',
              leadingIcon && 'pl-12',
            )}
            {...props}
          />
        </div>
      )}
    </FieldShell>
  )
}

export type TextareaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'> & {
  label: string
  hint?: string
  error?: string
  hideLabel?: boolean
  className?: string
}

export function TextareaField({
  label,
  hint,
  error,
  hideLabel,
  className,
  required,
  rows = 5,
  ...props
}: TextareaFieldProps) {
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      hideLabel={hideLabel}
      className={className}
    >
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          rows={rows}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(controlClasses, 'resize-y', invalid ? 'border-danger' : 'border-border')}
          {...props}
        />
      )}
    </FieldShell>
  )
}

export type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'className'> & {
  label: string
  hint?: string
  error?: string
  hideLabel?: boolean
  className?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function SelectField({
  label,
  hint,
  error,
  hideLabel,
  className,
  options,
  placeholder,
  required,
  ...props
}: SelectFieldProps) {
  return (
    <FieldShell
      label={label}
      hint={hint}
      error={error}
      required={required}
      hideLabel={hideLabel}
      className={className}
    >
      {({ id, describedBy, invalid }) => (
        <select
          id={id}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(
            controlClasses,
            'appearance-none bg-[length:1.25rem] bg-[right_0.9rem_center] bg-no-repeat pr-11',
            "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill%3D%22none%22%20stroke%3D%22%237c8992%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')]",
            invalid ? 'border-danger' : 'border-border',
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  )
}

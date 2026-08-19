import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names, resolving Tailwind conflicts so the *last* class wins.
 * Every component accepts a `className` prop and passes it through `cn()`,
 * which is what makes the primitives safely overridable at call sites.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

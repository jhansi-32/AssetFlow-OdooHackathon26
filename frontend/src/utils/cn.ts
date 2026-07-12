import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind class names safely, resolving conflicting utility classes.
 * Use this everywhere instead of raw template strings for className composition.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

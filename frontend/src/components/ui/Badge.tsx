import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'
import type { BadgeVariant } from '@/types'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-sidebar text-text border border-border',
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning border border-warning/20',
  danger: 'bg-danger/10 text-danger border border-danger/20',
  accent: 'bg-accent/10 text-accent border border-accent/20',
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium leading-4',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

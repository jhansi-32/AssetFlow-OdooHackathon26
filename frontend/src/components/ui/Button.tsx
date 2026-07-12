import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover shadow-soft active:scale-[0.98]',
  secondary:
    'bg-secondary/40 text-heading hover:bg-secondary/60 active:scale-[0.98]',
  outline:
    'border border-border bg-surface text-heading hover:bg-sidebar active:scale-[0.98]',
  ghost: 'text-text hover:bg-sidebar hover:text-heading',
  danger: 'bg-danger text-white hover:bg-danger/90 active:scale-[0.98]',
}

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
  icon: 'h-10 w-10 shrink-0',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-[var(--radius-md)] font-medium',
          'transition-all duration-150 ease-out',
          'disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

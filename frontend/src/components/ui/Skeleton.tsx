import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('shimmer-bg animate-shimmer rounded-[var(--radius-md)]', className)}
      {...props}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-soft">
      <Skeleton className="h-4 w-24 mb-4" />
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-40" />
    </div>
  )
}

export function SkeletonTableRow({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-border">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  )
}

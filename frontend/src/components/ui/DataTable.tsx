import { ChevronUp, ChevronDown, Inbox } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/utils/cn'
import type { TableColumn } from '@/types'
import { SkeletonTableRow } from './Skeleton'

interface DataTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  emptyLabel?: string
  getRowId: (row: T) => string
  onRowClick?: (row: T) => void
}

export function DataTable<T extends object>({
  data,
  columns,
  loading,
  emptyLabel = 'No records yet',
  getRowId,
  onRowClick,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortAsc, setSortAsc] = useState(true)

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        if (av === bv) return 0
        const result = av > bv ? 1 : -1
        return sortAsc ? result : -result
      })
    : data

  function toggleSort(key: keyof T) {
    if (sortKey === key) {
      setSortAsc((a) => !a)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-sidebar/60">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  style={{ width: col.width }}
                  className={cn(
                    'select-none whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center'
                  )}
                >
                  <button
                    className="inline-flex items-center gap-1 hover:text-heading transition-colors"
                    onClick={() => toggleSort(col.key)}
                  >
                    {col.header}
                    {sortKey === col.key &&
                      (sortAsc ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td colSpan={columns.length}>
                    <SkeletonTableRow columns={columns.length} />
                  </td>
                </tr>
              ))}

            {!loading && sorted.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-text">
                    <Inbox className="h-8 w-8 text-border" />
                    <p className="text-sm">{emptyLabel}</p>
                  </div>
                </td>
              </tr>
            )}

            {!loading &&
              sorted.map((row) => (
                <tr
                  key={getRowId(row)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'border-b border-border last:border-0 transition-colors',
                    onRowClick && 'cursor-pointer hover:bg-sidebar/50'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={String(col.key)}
                      className={cn(
                        'px-5 py-4 text-heading',
                        col.align === 'right' && 'text-right',
                        col.align === 'center' && 'text-center'
                      )}
                    >
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, ArrowRight, Boxes, ClipboardList, Users, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

const SUGGESTIONS = [
  { label: 'Go to Dashboard', href: '/', icon: ArrowRight },
  { label: 'View all Assets', href: '/assets', icon: Boxes },
  { label: 'View Requests', href: '/requests', icon: ClipboardList },
  { label: 'Manage People', href: '/people', icon: Users },
  { label: 'Open Settings', href: '/settings', icon: Settings },
]

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const filtered = SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()))

  function go(href: string) {
    navigate(href)
    onClose()
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-heading/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-soft-lg"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <Search className="h-4 w-4 text-text" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search assets, requests, people..."
                className="w-full bg-transparent text-sm text-heading placeholder:text-text/60 outline-none"
              />
              <kbd className="rounded border border-border bg-sidebar px-1.5 py-0.5 text-[10px] font-medium text-text">
                Esc
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-text">No results for "{query}"</p>
              )}
              {filtered.map((item) => (
                <button
                  key={item.href}
                  onClick={() => go(item.href)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-sm text-heading',
                    'hover:bg-sidebar transition-colors'
                  )}
                >
                  <item.icon className="h-4 w-4 text-text" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

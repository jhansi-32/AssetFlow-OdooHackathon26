import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from './Button'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  side?: 'left' | 'right'
  children: ReactNode
  className?: string
}

export function Drawer({ open, onClose, title, side = 'right', children, className }: DrawerProps) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-heading/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: side === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'right' ? '100%' : '-100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            className={cn(
              'relative z-10 flex h-full w-full max-w-md flex-col bg-surface shadow-soft-lg',
              side === 'right' ? 'ml-auto' : 'mr-auto',
              className
            )}
          >
            <div className="flex items-center justify-between border-b border-border p-5">
              {title && <h2 className="text-lg font-semibold text-heading">{title}</h2>}
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close panel">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

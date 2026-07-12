import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-heading/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            className={cn(
              'relative z-10 w-full max-w-lg rounded-[var(--radius-xl)] border border-border bg-surface p-6 shadow-soft-lg',
              className
            )}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                {title && (
                  <h2 id="modal-title" className="text-lg font-semibold text-heading">
                    {title}
                  </h2>
                )}
                {description && <p className="text-sm text-text mt-1">{description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close dialog">
                <X className="h-4 w-4" />
              </Button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

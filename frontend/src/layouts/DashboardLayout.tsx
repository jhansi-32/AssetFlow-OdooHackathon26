import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      {isDesktop && <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />}

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {!isDesktop && mobileOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-heading/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative z-10 h-full w-[280px]"
            >
              <Sidebar collapsed={false} onToggle={() => {}} mobile />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-md bg-white text-heading shadow-soft"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onMobileMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] p-4 sm:p-6 lg:p-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

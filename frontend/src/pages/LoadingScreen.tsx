import { motion } from 'framer-motion'
import { Layers } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-primary text-white shadow-soft"
      >
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        >
          <Layers className="h-6 w-6" />
        </motion.span>
      </motion.div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-medium text-heading">Loading AssetFlow</p>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-sidebar">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CompassIcon, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-secondary/30 text-primary">
          <CompassIcon className="h-8 w-8" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Error 404</p>
          <h1 className="mt-2 text-3xl font-bold text-heading">This page took a detour.</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-text">
            The page you're looking for doesn't exist, may have been moved, or the link might be outdated.
          </p>
        </div>
        <Link to="/">
          <Button variant="primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}

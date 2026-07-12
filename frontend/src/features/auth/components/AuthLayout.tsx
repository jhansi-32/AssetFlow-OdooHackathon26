import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex flex-col justify-between bg-primary text-white p-12">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <div className="w-8 h-8 rounded-[10px] bg-white/15 flex items-center justify-center">AF</div>
          AssetFlow
        </div>
        <div>
          <h2 className="text-3xl font-semibold leading-snug max-w-md">
            Every asset, every allocation, every audit — in one place.
          </h2>
          <p className="mt-4 text-white/70 max-w-sm">Built for teams who manage assets at scale.</p>
        </div>
        <p className="text-white/50 text-sm">© {new Date().getFullYear()} AssetFlow</p>
      </div>
      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          <h1 className="text-2xl font-semibold text-heading">{title}</h1>
          <p className="mt-1.5 text-sm text-text">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

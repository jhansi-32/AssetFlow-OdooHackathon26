import { Construction } from 'lucide-react'

interface PlaceholderPageProps {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[var(--radius-xl)] border border-dashed border-border bg-surface py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-secondary/30 text-primary">
        <Construction className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-semibold text-heading">{title} module</h2>
      <p className="max-w-sm text-sm text-text">
        This is a scaffolded route ready for the {title.toLowerCase()} feature. Build it out under{' '}
        <code className="rounded bg-sidebar px-1.5 py-0.5 text-xs">src/features/{title.toLowerCase()}</code>.
      </p>
    </div>
  )
}

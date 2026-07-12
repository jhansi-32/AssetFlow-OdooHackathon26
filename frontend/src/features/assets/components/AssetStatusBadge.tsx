import type { AssetStatus } from '@/types/asset.types';

const STYLES: Record<AssetStatus, string> = {
  Available: 'bg-accent/15 text-accent',
  Allocated: 'bg-primary/15 text-primary',
  'In Maintenance': 'bg-secondary/40 text-heading',
  Retired: 'bg-border text-text',
  Missing: 'bg-orange-100 text-orange-600',
  Damaged: 'bg-red-100 text-red-500',
};

export function AssetStatusBadge({ status }: { status: AssetStatus }) {
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${STYLES[status]}`}>{status}</span>
  );
}

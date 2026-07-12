import { PackagePlus, ArrowRightLeft, Wrench, ClipboardCheck, RefreshCcw, Undo2 } from 'lucide-react';
import { useAssetTimeline } from '@/features/assets/hooks/useAssets';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import type { AssetTimelineEvent } from '@/types/asset.types';

const ICONS: Record<AssetTimelineEvent['type'], React.ElementType> = {
  created: PackagePlus,
  allocated: ArrowRightLeft,
  returned: Undo2,
  maintenance: Wrench,
  audit: ClipboardCheck,
  status_change: RefreshCcw,
};

export function AssetTimeline({ assetId }: { assetId: string }) {
  const { data, isLoading, isError, refetch } = useAssetTimeline(assetId);

  if (isLoading) return <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>;
  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (!data || data.length === 0) {
    return <EmptyState icon={<PackagePlus size={20} />} title="No history yet" description="Timeline events will appear as this asset is used." />;
  }

  return (
    <ol className="relative border-l border-border ml-3">
      {data.map((event) => {
        const Icon = ICONS[event.type];
        return (
          <li key={event.id} className="mb-6 ml-6">
            <span className="absolute -left-[13px] flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
              <Icon size={13} />
            </span>
            <p className="text-sm text-heading">{event.description}</p>
            <p className="text-xs text-text mt-0.5">{event.actor} · {event.timestamp}</p>
          </li>
        );
      })}
    </ol>
  );
}

import { Activity } from 'lucide-react';
import { useRecentActivity } from '@/features/dashboard/hooks/useDashboardData';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';

export function RecentActivityFeed() {
  const { data, isLoading, isError, refetch } = useRecentActivity();

  return (
    <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm h-full">
      <h3 className="text-sm font-semibold text-heading">Recent activity</h3>
      <p className="text-xs text-text mt-0.5">Live feed across the organization</p>

      <div className="mt-4 space-y-4 max-h-72 overflow-y-auto pr-1">
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && (!data || data.length === 0) && (
          <EmptyState icon={<Activity size={20} />} title="No activity yet" description="Actions across AssetFlow will show up here in real time." />
        )}
        {!isLoading &&
          !isError &&
          data?.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-8 h-8 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                {item.actor.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-sm text-heading leading-snug">
                  <span className="font-medium">{item.actor}</span> {item.action}{' '}
                  <span className="font-medium">{item.target}</span>
                </p>
                <p className="text-xs text-text mt-0.5">{item.timestamp}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

import { Bell, CheckCheck } from 'lucide-react';
import { useNotifications, useNotificationActions } from '@/features/notifications/hooks/useNotifications';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';

const PRIORITY_DOT: Record<string, string> = { low: 'bg-border', normal: 'bg-accent', high: 'bg-red-400' };

export default function NotificationsPage() {
  const { data, isLoading, isError, refetch } = useNotifications();
  const { markAsRead, markAllAsRead } = useNotificationActions();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-heading">Notifications</h1>
          <p className="text-sm text-text mt-1">Everything that needs your attention.</p>
        </div>
        <button
          onClick={() => markAllAsRead.mutate()}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <CheckCheck size={15} /> Mark all as read
        </button>
      </div>

      <div className="rounded-[14px] bg-surface border border-border shadow-sm">
        {isLoading && <div className="p-4 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && data?.length === 0 && (
          <EmptyState icon={<Bell size={20} />} title="You're all caught up" description="New notifications will appear here." />
        )}
        {!isLoading && !isError && data && data.length > 0 && (
          <ul className="divide-y divide-border">
            {data.map((n) => (
              <li
                key={n.id}
                onClick={() => !n.read && markAsRead.mutate(n.id)}
                className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer hover:bg-background transition-colors ${!n.read ? 'bg-primary/5' : ''}`}
              >
                <span className={`w-2 h-2 rounded-full mt-1.5 ${PRIORITY_DOT[n.priority]}`} />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-heading">{n.title}</p>
                  <p className="text-sm text-text mt-0.5">{n.message}</p>
                  <p className="text-xs text-text mt-1">{n.createdAt}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

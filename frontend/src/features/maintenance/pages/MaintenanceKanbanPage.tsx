import { Wrench, MessageCircle } from 'lucide-react';
import { useMaintenanceRequests, useMaintenanceActions } from '@/features/maintenance/hooks/useMaintenance';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import type { MaintenanceRequest, MaintenanceStatus } from '@/types/maintenance.types';

const COLUMNS: MaintenanceStatus[] = ['Open', 'In Progress', 'On Hold', 'Resolved'];

const PRIORITY_STYLES: Record<MaintenanceRequest['priority'], string> = {
  Low: 'bg-border text-text',
  Medium: 'bg-secondary/40 text-heading',
  High: 'bg-orange-100 text-orange-600',
  Critical: 'bg-red-100 text-red-500',
};

function Card({ req }: { req: MaintenanceRequest }) {
  const { updateStatus } = useMaintenanceActions();
  const currentIndex = COLUMNS.indexOf(req.status);

  return (
    <div
      draggable
      onDragEnd={() => {
        const next = COLUMNS[Math.min(currentIndex + 1, COLUMNS.length - 1)];
        if (next !== req.status) updateStatus.mutate({ id: req.id, status: next });
      }}
      className="rounded-[14px] bg-surface border border-border p-3.5 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_STYLES[req.priority]}`}>{req.priority}</span>
        <span className="text-xs text-text flex items-center gap-1"><MessageCircle size={12} /> {req.commentCount}</span>
      </div>
      <p className="mt-2 text-sm font-medium text-heading">{req.title}</p>
      <p className="text-xs text-text mt-0.5">{req.assetName} · {req.assetTag}</p>
      {req.assignedTechnician && (
        <p className="text-xs text-primary mt-2 font-medium">{req.assignedTechnician}</p>
      )}
    </div>
  );
}

export default function MaintenanceKanbanPage() {
  const { data, isLoading, isError, refetch } = useMaintenanceRequests();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-heading">Maintenance</h1>
        <p className="text-sm text-text mt-1">Drag a card to advance its status.</p>
      </div>

      {isLoading && <div className="grid grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}</div>}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && (
        <EmptyState icon={<Wrench size={20} />} title="No maintenance requests" description="Raise a request to see it tracked here." />
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {COLUMNS.map((col) => {
            const items = data.filter((r) => r.status === col);
            return (
              <div key={col} className="rounded-[14px] bg-background border border-border p-3">
                <div className="flex items-center justify-between px-1 mb-3">
                  <h3 className="text-sm font-semibold text-heading">{col}</h3>
                  <span className="text-xs text-text bg-surface border border-border rounded-full px-2 py-0.5">{items.length}</span>
                </div>
                <div className="space-y-3">
                  {items.map((req) => <Card key={req.id} req={req} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

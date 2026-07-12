import { ClipboardCheck, AlertTriangle, XCircle } from 'lucide-react';
import { useAuditRuns } from '@/features/audit/hooks/useAudit';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';

export default function AuditDashboardPage() {
  const { data, isLoading, isError, refetch } = useAuditRuns();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-heading">Audit</h1>
          <p className="text-sm text-text mt-1">Physical verification runs across departments.</p>
        </div>
        <button className="flex items-center gap-2 rounded-[14px] bg-primary text-white px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">
          <ClipboardCheck size={16} /> Start audit
        </button>
      </div>

      {isLoading && <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}</div>}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.length === 0 && (
        <EmptyState icon={<ClipboardCheck size={20} />} title="No audits yet" description="Start your first verification run to track missing or damaged assets." />
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {data.map((run) => (
            <div key={run.id} className="rounded-[14px] bg-surface border border-border p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-heading">{run.name}</h3>
              <p className="text-xs text-text mt-0.5">{run.department} · started {run.startedAt}</p>

              <div className="mt-4 h-1.5 rounded-full bg-border overflow-hidden">
                <div className="h-full rounded-full bg-primary" style={{ width: `${run.progressPct}%` }} />
              </div>
              <p className="text-xs text-text mt-1.5">{run.progressPct}% complete</p>

              <div className="mt-4 flex gap-4 text-xs">
                <span className="flex items-center gap-1 text-accent"><ClipboardCheck size={13} /> {run.verifiedAssets} verified</span>
                <span className="flex items-center gap-1 text-orange-600"><AlertTriangle size={13} /> {run.missingAssets} missing</span>
                <span className="flex items-center gap-1 text-red-500"><XCircle size={13} /> {run.damagedAssets} damaged</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

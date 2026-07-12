import { AlertTriangle, Check, Undo2, X } from 'lucide-react';
import { useAllocations, useAllocationActions } from '@/features/allocation/hooks/useAllocations';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import type { AllocationStatus } from '@/types/allocation.types';

const STATUS_STYLES: Record<AllocationStatus, string> = {
  'Pending Approval': 'bg-secondary/40 text-heading',
  Approved: 'bg-accent/15 text-accent',
  Active: 'bg-primary/15 text-primary',
  Returned: 'bg-border text-text',
  Rejected: 'bg-red-100 text-red-500',
};

export default function AllocationPage() {
  const { data, isLoading, isError, refetch } = useAllocations();
  const { approve, reject, returnAsset } = useAllocationActions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-heading">Allocation</h1>
        <p className="text-sm text-text mt-1">Requests, transfers, and returns across your fleet.</p>
      </div>

      <div className="rounded-[14px] bg-surface border border-border shadow-sm">
        {isLoading && <div className="p-4 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}</div>}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && data?.length === 0 && (
          <EmptyState icon={<Check size={20} />} title="No allocation requests" description="New allocation and transfer requests will show up here." />
        )}
        {!isLoading && !isError && data && data.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text border-b border-border">
                <th className="px-4 py-2.5 font-medium">Asset</th>
                <th className="px-4 py-2.5 font-medium">Employee</th>
                <th className="px-4 py-2.5 font-medium">Department</th>
                <th className="px-4 py-2.5 font-medium">Dates</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a.id} className="border-b border-border last:border-0 hover:bg-background transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-heading font-medium">{a.assetName}</p>
                    <p className="text-xs text-text">{a.assetTag}</p>
                  </td>
                  <td className="px-4 py-3 text-text">{a.employeeName}</td>
                  <td className="px-4 py-3 text-text">{a.department}</td>
                  <td className="px-4 py-3 text-text">
                    {a.startDate} {a.endDate ? `→ ${a.endDate}` : ''}
                    {a.hasConflict && (
                      <span className="ml-2 inline-flex items-center gap-1 text-orange-600 text-xs">
                        <AlertTriangle size={12} /> Conflict
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_STYLES[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {a.status === 'Pending Approval' && (
                        <>
                          <button onClick={() => approve.mutate(a.id)} className="w-7 h-7 rounded-[8px] bg-accent/15 text-accent flex items-center justify-center hover:bg-accent/25">
                            <Check size={14} />
                          </button>
                          <button onClick={() => reject.mutate(a.id)} className="w-7 h-7 rounded-[8px] bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200">
                            <X size={14} />
                          </button>
                        </>
                      )}
                      {a.status === 'Active' && (
                        <button onClick={() => returnAsset.mutate(a.id)} className="flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                          <Undo2 size={13} /> Return
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

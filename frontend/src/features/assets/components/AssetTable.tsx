import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Boxes, Upload, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '@/features/assets/hooks/useAssets';
import { AssetStatusBadge } from '@/features/assets/components/AssetStatusBadge';
import { AssetHealthScore } from '@/features/assets/components/AssetHealthScore';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import type { AssetStatus } from '@/types/asset.types';

const STATUS_OPTIONS: AssetStatus[] = ['Available', 'Allocated', 'In Maintenance', 'Retired', 'Missing', 'Damaged'];

export function AssetTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<AssetStatus | undefined>(undefined);
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { data, isLoading, isError, refetch } = useAssets({ search, status, page, pageSize });

  return (
    <div className="rounded-[14px] bg-surface border border-border shadow-sm">
      <div className="p-4 border-b border-border flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, tag, category…"
            className="w-full rounded-[12px] border border-border bg-background pl-9 pr-3 py-2 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={status ?? ''}
          onChange={(e) => { setStatus((e.target.value || undefined) as AssetStatus | undefined); setPage(1); }}
          className="rounded-[12px] border border-border bg-background px-3 py-2 text-sm text-heading"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button className="flex items-center gap-1.5 text-sm text-text border border-border rounded-[12px] px-3 py-2 hover:bg-background">
          <SlidersHorizontal size={14} /> More filters
        </button>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1.5 text-sm text-text border border-border rounded-[12px] px-3 py-2 hover:bg-background">
            <Upload size={14} /> Bulk import
          </button>
          <button className="flex items-center gap-1.5 text-sm text-text border border-border rounded-[12px] px-3 py-2 hover:bg-background">
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="p-4 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      )}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.items.length === 0 && (
        <EmptyState icon={<Boxes size={20} />} title="No assets found" description="Try a different search or add your first asset." />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text border-b border-border">
                <th className="px-4 py-2.5 font-medium">Asset</th>
                <th className="px-4 py-2.5 font-medium">Category</th>
                <th className="px-4 py-2.5 font-medium">Department</th>
                <th className="px-4 py-2.5 font-medium">Health</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => navigate(`/assets/${asset.id}`)}
                  className="border-b border-border last:border-0 hover:bg-background transition-colors cursor-pointer"
                >
                  <td className="px-4 py-3">
                    <p className="text-heading font-medium">{asset.name}</p>
                    <p className="text-xs text-text">{asset.assetTag}</p>
                  </td>
                  <td className="px-4 py-3 text-text">{asset.category}</td>
                  <td className="px-4 py-3 text-text">{asset.department}</td>
                  <td className="px-4 py-3"><AssetHealthScore score={asset.healthScore} /></td>
                  <td className="px-4 py-3"><AssetStatusBadge status={asset.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-text">
              Page {data.page} of {Math.max(1, Math.ceil(data.total / data.pageSize))} · {data.total} assets
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-[10px] border border-border flex items-center justify-center disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page * pageSize >= data.total}
                className="w-8 h-8 rounded-[10px] border border-border flex items-center justify-center disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

import { FileBarChart, Download, FileText } from 'lucide-react';
import { useReports, useReportFilters } from '@/features/reports/hooks/useReports';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import type { ReportSummary } from '@/types/reports.types';

const CATEGORIES: ReportSummary['category'][] = ['Department', 'Maintenance', 'Booking', 'Asset'];

export default function ReportsPage() {
  const { filters, setFilters } = useReportFilters();
  const { data, isLoading, isError, refetch } = useReports(filters);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-heading">Reports</h1>
          <p className="text-sm text-text mt-1">Analytics and exports across every module.</p>
        </div>
        <button className="flex items-center gap-2 rounded-[14px] bg-primary text-white px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">
          <FileBarChart size={16} /> Generate report
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilters({})}
          className={`text-sm px-3.5 py-1.5 rounded-full border ${!filters.category ? 'bg-primary text-white border-primary' : 'border-border text-text'}`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilters({ ...filters, category: c })}
            className={`text-sm px-3.5 py-1.5 rounded-full border ${filters.category === c ? 'bg-primary text-white border-primary' : 'border-border text-text'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="rounded-[14px] bg-surface border border-border shadow-sm">
        {isLoading && <div className="p-4 space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && data?.length === 0 && (
          <EmptyState icon={<FileText size={20} />} title="No reports yet" description="Generate your first report to see it listed here." />
        )}
        {!isLoading && !isError && data && data.length > 0 && (
          <ul className="divide-y divide-border">
            {data.map((r) => (
              <li key={r.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-heading">{r.title}</p>
                  <p className="text-xs text-text mt-0.5">{r.category} · {r.generatedAt} · {r.format}</p>
                </div>
                <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                  <Download size={14} /> Download
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

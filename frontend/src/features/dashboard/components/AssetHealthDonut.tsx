import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useAssetHealth } from '@/features/dashboard/hooks/useDashboardData';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { PieChart as PieIcon } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  Excellent: '#2F6B5F',
  Good: '#7A9E7E',
  Fair: '#D9C7A3',
  'Needs Attention': '#E0A458',
  Critical: '#D9534F',
};

export function AssetHealthDonut() {
  const { data, isLoading, isError, refetch } = useAssetHealth();

  return (
    <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm h-full">
      <h3 className="text-sm font-semibold text-heading">Asset health</h3>
      <p className="text-xs text-text mt-0.5">Fleet-wide condition breakdown</p>

      <div className="mt-4 h-64">
        {isLoading && <Skeleton className="h-full w-full" />}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && (!data || data.length === 0) && (
          <EmptyState icon={<PieIcon size={20} />} title="No health data yet" description="Assets will appear here once condition audits are logged." />
        )}
        {!isLoading && !isError && data && data.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="count" nameKey="status" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {data.map((entry) => (
                  <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? '#7A9E7E'} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #E7E2D8', fontSize: 13 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from 'recharts';
import { useMaintenanceTrends } from '@/features/dashboard/hooks/useDashboardData';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';

export function MaintenanceTrendsChart() {
  const { data, isLoading, isError, refetch } = useMaintenanceTrends();

  return (
    <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm h-full">
      <h3 className="text-sm font-semibold text-heading">Maintenance trends</h3>
      <p className="text-xs text-text mt-0.5">Scheduled vs. completed vs. overdue</p>

      <div className="mt-4 h-64">
        {isLoading && <Skeleton className="h-full w-full" />}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && data && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E2D8" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5E6B67' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#5E6B67' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7E2D8', fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="scheduled" stroke="#7A9E7E" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="completed" stroke="#2F6B5F" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="overdue" stroke="#D9534F" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

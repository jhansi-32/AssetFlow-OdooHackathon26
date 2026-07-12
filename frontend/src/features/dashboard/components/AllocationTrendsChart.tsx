import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from 'recharts';
import { useAllocationTrends } from '@/features/dashboard/hooks/useDashboardData';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';

export function AllocationTrendsChart() {
  const { data, isLoading, isError, refetch } = useAllocationTrends();

  return (
    <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm h-full">
      <h3 className="text-sm font-semibold text-heading">Allocation trends</h3>
      <p className="text-xs text-text mt-0.5">Assets allocated vs. returned per month</p>

      <div className="mt-4 h-64">
        {isLoading && <Skeleton className="h-full w-full" />}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && data && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="allocatedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2F6B5F" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2F6B5F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="returnedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D9C7A3" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#D9C7A3" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E2D8" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5E6B67' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#5E6B67' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7E2D8', fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="allocated" stroke="#2F6B5F" fill="url(#allocatedGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="returned" stroke="#D9C7A3" fill="url(#returnedGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

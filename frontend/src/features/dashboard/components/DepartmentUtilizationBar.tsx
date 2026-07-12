import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { useDepartmentUtilization } from '@/features/dashboard/hooks/useDashboardData';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';

export function DepartmentUtilizationBar() {
  const { data, isLoading, isError, refetch } = useDepartmentUtilization();

  return (
    <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm h-full">
      <h3 className="text-sm font-semibold text-heading">Department utilization</h3>
      <p className="text-xs text-text mt-0.5">Assigned assets vs. capacity</p>

      <div className="mt-4 h-64">
        {isLoading && <Skeleton className="h-full w-full" />}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {!isLoading && !isError && data && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E2D8" vertical={false} />
              <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#5E6B67' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#5E6B67' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E7E2D8', fontSize: 13 }} />
              <Bar dataKey="utilizationPct" fill="#2F6B5F" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

import { ArrowDownRight, ArrowRight, ArrowUpRight, Boxes, Wrench, Users, CalendarClock } from 'lucide-react';
import { useKpis } from '@/features/dashboard/hooks/useDashboardData';
import { AnimatedCounter } from '@/components/shared/AnimatedCounter';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';

const ICONS: Record<string, React.ElementType> = {
  totalAssets: Boxes,
  activeMaintenance: Wrench,
  employeesAssigned: Users,
  pendingBookings: CalendarClock,
};

export function KpiCardGrid() {
  const { data, isLoading, isError, refetch } = useKpis();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {data?.map((kpi) => {
        const Icon = ICONS[kpi.id] ?? Boxes;
        const TrendIcon = kpi.trend === 'up' ? ArrowUpRight : kpi.trend === 'down' ? ArrowDownRight : ArrowRight;
        const trendColor =
          kpi.trend === 'up' ? 'text-primary' : kpi.trend === 'down' ? 'text-red-500' : 'text-text';

        return (
          <div
            key={kpi.id}
            className="rounded-[14px] bg-surface border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-[10px] bg-accent/15 flex items-center justify-center text-accent">
                <Icon size={18} />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-medium ${trendColor}`}>
                <TrendIcon size={13} />
                {Math.abs(kpi.deltaPct)}%
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-heading">
              <AnimatedCounter value={kpi.value} suffix={kpi.unit ?? ''} />
            </p>
            <p className="mt-1 text-sm text-text">{kpi.label}</p>
          </div>
        );
      })}
    </div>
  );
}

import { KpiCardGrid } from '@/features/dashboard/components/KpiCardGrid';
import { AssetHealthDonut } from '@/features/dashboard/components/AssetHealthDonut';
import { DepartmentUtilizationBar } from '@/features/dashboard/components/DepartmentUtilizationBar';
import { MaintenanceTrendsChart } from '@/features/dashboard/components/MaintenanceTrendsChart';
import { BookingHeatmap } from '@/features/dashboard/components/BookingHeatmap';
import { AllocationTrendsChart } from '@/features/dashboard/components/AllocationTrendsChart';
import { RecentActivityFeed } from '@/features/dashboard/components/RecentActivityFeed';
import { QuickActions } from '@/features/dashboard/components/QuickActions';
import { useAuth } from '@/hooks/useAuth';

export default function ExecutiveDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-heading">Welcome back, {firstName}</h1>
        <p className="text-sm text-text mt-1">Here's what's happening across your assets today.</p>
      </div>

      <KpiCardGrid />

      <QuickActions />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AssetHealthDonut />
        <DepartmentUtilizationBar />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <MaintenanceTrendsChart />
        <AllocationTrendsChart />
      </div>

      <BookingHeatmap />

      <div className="grid grid-cols-1">
        <RecentActivityFeed />
      </div>
    </div>
  );
}

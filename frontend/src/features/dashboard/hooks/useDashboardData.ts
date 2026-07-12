import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

export function useKpis() {
  return useQuery({ queryKey: ['dashboard', 'kpis'], queryFn: dashboardService.getKpis });
}
export function useAssetHealth() {
  return useQuery({ queryKey: ['dashboard', 'asset-health'], queryFn: dashboardService.getAssetHealth });
}
export function useDepartmentUtilization() {
  return useQuery({
    queryKey: ['dashboard', 'department-utilization'],
    queryFn: dashboardService.getDepartmentUtilization,
  });
}
export function useMaintenanceTrends() {
  return useQuery({
    queryKey: ['dashboard', 'maintenance-trends'],
    queryFn: dashboardService.getMaintenanceTrends,
  });
}
export function useBookingHeatmap() {
  return useQuery({ queryKey: ['dashboard', 'booking-heatmap'], queryFn: dashboardService.getBookingHeatmap });
}
export function useAllocationTrends() {
  return useQuery({
    queryKey: ['dashboard', 'allocation-trends'],
    queryFn: dashboardService.getAllocationTrends,
  });
}
export function useRecentActivity() {
  return useQuery({ queryKey: ['dashboard', 'recent-activity'], queryFn: dashboardService.getRecentActivity });
}

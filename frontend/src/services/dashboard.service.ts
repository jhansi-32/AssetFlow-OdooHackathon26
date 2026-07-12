import { axiosClient } from '@/services/api/axiosClient';
import type {
  KpiMetric,
  AssetHealthSlice,
  DepartmentUtilization,
  MaintenanceTrendPoint,
  BookingHeatmapCell,
  AllocationTrendPoint,
  RecentActivity,
} from '@/types/dashboard.types';

export const dashboardService = {
  async getKpis(): Promise<KpiMetric[]> {
    const { data } = await axiosClient.get('/dashboard/kpis');
    return data;
  },
  async getAssetHealth(): Promise<AssetHealthSlice[]> {
    const { data } = await axiosClient.get('/dashboard/asset-health');
    return data;
  },
  async getDepartmentUtilization(): Promise<DepartmentUtilization[]> {
    const { data } = await axiosClient.get('/dashboard/department-utilization');
    return data;
  },
  async getMaintenanceTrends(): Promise<MaintenanceTrendPoint[]> {
    const { data } = await axiosClient.get('/dashboard/maintenance-trends');
    return data;
  },
  async getBookingHeatmap(): Promise<BookingHeatmapCell[]> {
    const { data } = await axiosClient.get('/dashboard/booking-heatmap');
    return data;
  },
  async getAllocationTrends(): Promise<AllocationTrendPoint[]> {
    const { data } = await axiosClient.get('/dashboard/allocation-trends');
    return data;
  },
  async getRecentActivity(): Promise<RecentActivity[]> {
    const { data } = await axiosClient.get('/dashboard/recent-activity');
    return data;
  },
};

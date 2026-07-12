export interface KpiMetric {
  id: string;
  label: string;
  value: number;
  unit?: string;
  deltaPct: number; // positive = improvement
  trend: 'up' | 'down' | 'flat';
}

export interface AssetHealthSlice {
  status: 'Excellent' | 'Good' | 'Fair' | 'Needs Attention' | 'Critical';
  count: number;
}

export interface DepartmentUtilization {
  department: string;
  utilizationPct: number;
  assetsAssigned: number;
}

export interface MaintenanceTrendPoint {
  month: string;
  scheduled: number;
  completed: number;
  overdue: number;
}

export interface BookingHeatmapCell {
  day: string; // Mon..Sun
  hour: number; // 0-23
  bookings: number;
}

export interface AllocationTrendPoint {
  month: string;
  allocated: number;
  returned: number;
}

export interface RecentActivity {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
}

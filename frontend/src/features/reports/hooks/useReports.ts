import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { reportsService } from '@/services/reports.service';
import type { ReportFilters } from '@/types/reports.types';

export function useReports(filters: ReportFilters) {
  return useQuery({ queryKey: ['reports', filters], queryFn: () => reportsService.getReports(filters) });
}

export function useReportFilters() {
  const [filters, setFilters] = useState<ReportFilters>({});
  return { filters, setFilters };
}

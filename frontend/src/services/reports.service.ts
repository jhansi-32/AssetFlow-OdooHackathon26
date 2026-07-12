import { axiosClient } from '@/services/api/axiosClient';
import type { ReportSummary, ReportFilters } from '@/types/reports.types';

export const reportsService = {
  async getReports(filters: ReportFilters): Promise<ReportSummary[]> {
    const { data } = await axiosClient.get('/reports', { params: filters });
    return data;
  },
  async generateReport(filters: ReportFilters): Promise<ReportSummary> {
    const { data } = await axiosClient.post('/reports/generate', filters);
    return data;
  },
  async downloadReport(id: string): Promise<Blob> {
    const { data } = await axiosClient.get(`/reports/${id}/download`, { responseType: 'blob' });
    return data;
  },
};

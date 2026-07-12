import { axiosClient } from '@/services/api/axiosClient';
import type { MaintenanceRequest, MaintenanceStatus } from '@/types/maintenance.types';

export const maintenanceService = {
  async getRequests(): Promise<MaintenanceRequest[]> {
    const { data } = await axiosClient.get('/maintenance/requests');
    return data;
  },
  async updateStatus(id: string, status: MaintenanceStatus): Promise<void> {
    await axiosClient.patch(`/maintenance/requests/${id}/status`, { status });
  },
  async assignTechnician(id: string, technicianId: string): Promise<void> {
    await axiosClient.patch(`/maintenance/requests/${id}/assign`, { technicianId });
  },
};

import { axiosClient } from '@/services/api/axiosClient';
import type { AuditRun, AuditItem } from '@/types/audit.types';

export const auditService = {
  async getRuns(): Promise<AuditRun[]> {
    const { data } = await axiosClient.get('/audit/runs');
    return data;
  },
  async getRunItems(runId: string): Promise<AuditItem[]> {
    const { data } = await axiosClient.get(`/audit/runs/${runId}/items`);
    return data;
  },
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { maintenanceService } from '@/services/maintenance.service';
import type { MaintenanceStatus } from '@/types/maintenance.types';
import { toast } from 'sonner';

export function useMaintenanceRequests() {
  return useQuery({ queryKey: ['maintenance', 'requests'], queryFn: maintenanceService.getRequests });
}

export function useMaintenanceActions() {
  const qc = useQueryClient();
  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: MaintenanceStatus }) =>
      maintenanceService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['maintenance', 'requests'] });
      toast.success('Status updated');
    },
  });
  return { updateStatus };
}

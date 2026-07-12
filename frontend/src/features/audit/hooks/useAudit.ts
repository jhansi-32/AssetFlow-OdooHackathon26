import { useQuery } from '@tanstack/react-query';
import { auditService } from '@/services/audit.service';

export function useAuditRuns() {
  return useQuery({ queryKey: ['audit', 'runs'], queryFn: auditService.getRuns });
}

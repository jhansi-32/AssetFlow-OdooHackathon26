import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { allocationService } from '@/services/allocation.service';
import { toast } from 'sonner';

export function useAllocations() {
  return useQuery({ queryKey: ['allocations'], queryFn: allocationService.getAllocations });
}

export function useBookings() {
  return useQuery({ queryKey: ['allocations', 'bookings'], queryFn: allocationService.getBookings });
}

export function useAllocationActions() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['allocations'] });

  const approve = useMutation({
    mutationFn: allocationService.approve,
    onSuccess: () => { invalidate(); toast.success('Allocation approved'); },
  });
  const reject = useMutation({
    mutationFn: allocationService.reject,
    onSuccess: () => { invalidate(); toast.success('Allocation rejected'); },
  });
  const returnAsset = useMutation({
    mutationFn: allocationService.returnAsset,
    onSuccess: () => { invalidate(); toast.success('Asset marked as returned'); },
  });

  return { approve, reject, returnAsset };
}

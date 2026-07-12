import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/services/notification.service';

export function useNotifications() {
  return useQuery({ queryKey: ['notifications'], queryFn: notificationService.getNotifications });
}

export function useNotificationActions() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['notifications'] });
  const markAsRead = useMutation({ mutationFn: notificationService.markAsRead, onSuccess: invalidate });
  const markAllAsRead = useMutation({ mutationFn: notificationService.markAllAsRead, onSuccess: invalidate });
  return { markAsRead, markAllAsRead };
}

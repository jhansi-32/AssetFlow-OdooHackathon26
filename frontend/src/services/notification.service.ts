import { axiosClient } from '@/services/api/axiosClient';
import type { AppNotification } from '@/types/notification.types';

export const notificationService = {
  async getNotifications(): Promise<AppNotification[]> {
    const { data } = await axiosClient.get('/notifications');
    return data;
  },
  async markAsRead(id: string): Promise<void> {
    await axiosClient.patch(`/notifications/${id}/read`);
  },
  async markAllAsRead(): Promise<void> {
    await axiosClient.post('/notifications/read-all');
  },
};

export type NotificationPriority = 'low' | 'normal' | 'high';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  read: boolean;
  createdAt: string;
}

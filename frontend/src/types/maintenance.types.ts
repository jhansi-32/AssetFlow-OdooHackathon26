export type MaintenancePriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type MaintenanceStatus = 'Open' | 'In Progress' | 'On Hold' | 'Resolved';

export interface MaintenanceRequest {
  id: string;
  assetName: string;
  assetTag: string;
  title: string;
  description: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  assignedTechnician?: string;
  createdAt: string;
  dueDate?: string;
  commentCount: number;
}

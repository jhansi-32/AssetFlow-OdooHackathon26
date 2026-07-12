export type AllocationStatus = 'Pending Approval' | 'Approved' | 'Active' | 'Returned' | 'Rejected';

export interface Allocation {
  id: string;
  assetName: string;
  assetTag: string;
  employeeName: string;
  department: string;
  status: AllocationStatus;
  requestedAt: string;
  startDate: string;
  endDate?: string;
  hasConflict: boolean;
}

export interface BookingSlot {
  id: string;
  assetName: string;
  employeeName: string;
  date: string;
  startHour: number;
  endHour: number;
}

export type AssetStatus = 'Available' | 'Allocated' | 'In Maintenance' | 'Retired' | 'Missing' | 'Damaged';

export interface AssetVendor {
  name: string;
  contact: string;
  email: string;
}

export interface AssetDocument {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export interface AssetTimelineEvent {
  id: string;
  type: 'created' | 'allocated' | 'returned' | 'maintenance' | 'audit' | 'status_change';
  description: string;
  actor: string;
  timestamp: string;
}

export interface Asset {
  id: string;
  assetTag: string;
  name: string;
  category: string;
  department: string;
  assignedTo?: string;
  status: AssetStatus;
  healthScore: number; // 0-100
  purchaseDate: string;
  purchasePrice: number;
  warrantyExpiry?: string;
  vendor?: AssetVendor;
  images: string[];
  tags: string[];
  documents: AssetDocument[];
  createdAt: string;
}

export interface AssetFilters {
  search?: string;
  category?: string;
  department?: string;
  status?: AssetStatus;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

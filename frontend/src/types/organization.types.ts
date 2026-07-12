export interface Department {
  id: string;
  name: string;
  parentId: string | null;
  managerName: string;
  employeeCount: number;
  assetCount: number;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  avatarUrl?: string;
  assetsAssigned: number;
  status: 'Active' | 'Inactive';
}

export interface EmployeeFilters {
  search?: string;
  department?: string;
  status?: Employee['status'];
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

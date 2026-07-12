import { axiosClient } from '@/services/api/axiosClient';
import type { Department, Employee, EmployeeFilters, PaginatedResult } from '@/types/organization.types';

export const organizationService = {
  async getDepartments(): Promise<Department[]> {
    const { data } = await axiosClient.get('/organization/departments');
    return data;
  },
  async getDepartment(id: string): Promise<Department> {
    const { data } = await axiosClient.get(`/organization/departments/${id}`);
    return data;
  },
  async createDepartment(payload: Partial<Department>): Promise<Department> {
    const { data } = await axiosClient.post('/organization/departments', payload);
    return data;
  },
  async updateDepartment(id: string, payload: Partial<Department>): Promise<Department> {
    const { data } = await axiosClient.put(`/organization/departments/${id}`, payload);
    return data;
  },
  async deleteDepartment(id: string): Promise<void> {
    await axiosClient.delete(`/organization/departments/${id}`);
  },

  async getEmployees(filters: EmployeeFilters): Promise<PaginatedResult<Employee>> {
    const { data } = await axiosClient.get('/organization/employees', { params: filters });
    return data;
  },
  async getEmployee(id: string): Promise<Employee> {
    const { data } = await axiosClient.get(`/organization/employees/${id}`);
    return data;
  },
  async createEmployee(payload: Partial<Employee>): Promise<Employee> {
    const { data } = await axiosClient.post('/organization/employees', payload);
    return data;
  },
  async updateEmployee(id: string, payload: Partial<Employee>): Promise<Employee> {
    const { data } = await axiosClient.put(`/organization/employees/${id}`, payload);
    return data;
  },
  async deleteEmployee(id: string): Promise<void> {
    await axiosClient.delete(`/organization/employees/${id}`);
  },
};

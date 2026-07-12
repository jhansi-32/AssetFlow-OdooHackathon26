import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { organizationService } from '@/services/organization.service';
import type { Department, Employee, EmployeeFilters } from '@/types/organization.types';
import { toast } from 'sonner';

export function useDepartments() {
  return useQuery({ queryKey: ['organization', 'departments'], queryFn: organizationService.getDepartments });
}

export function useEmployees(filters: EmployeeFilters) {
  return useQuery({
    queryKey: ['organization', 'employees', filters],
    queryFn: () => organizationService.getEmployees(filters),
    placeholderData: (prev) => prev,
  });
}

export function useDepartmentMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['organization', 'departments'] });

  const create = useMutation({
    mutationFn: (payload: Partial<Department>) => organizationService.createDepartment(payload),
    onSuccess: () => {
      invalidate();
      toast.success('Department created');
    },
  });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Department> }) =>
      organizationService.updateDepartment(id, payload),
    onSuccess: () => {
      invalidate();
      toast.success('Department updated');
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => organizationService.deleteDepartment(id),
    onSuccess: () => {
      invalidate();
      toast.success('Department removed');
    },
  });

  return { create, update, remove };
}

export function useEmployeeMutations() {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: ['organization', 'employees'] });

  const create = useMutation({
    mutationFn: (payload: Partial<Employee>) => organizationService.createEmployee(payload),
    onSuccess: () => {
      invalidate();
      toast.success('Employee added');
    },
  });
  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Employee> }) =>
      organizationService.updateEmployee(id, payload),
    onSuccess: () => {
      invalidate();
      toast.success('Employee updated');
    },
  });
  const remove = useMutation({
    mutationFn: (id: string) => organizationService.deleteEmployee(id),
    onSuccess: () => {
      invalidate();
      toast.success('Employee removed');
    },
  });

  return { create, update, remove };
}

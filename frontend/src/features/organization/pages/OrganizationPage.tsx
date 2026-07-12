import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useDepartments } from '@/features/organization/hooks/useOrganization';
import { DepartmentTree } from '@/features/organization/components/DepartmentTree';
import { EmployeeTable } from '@/features/organization/components/EmployeeTable';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';

export default function OrganizationPage() {
  const { data: departments, isLoading, isError, refetch } = useDepartments();
  const [selectedDept, setSelectedDept] = useState<string | undefined>(undefined);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-heading">Organization</h1>
          <p className="text-sm text-text mt-1">Departments and employees across AssetFlow.</p>
        </div>
        <button className="flex items-center gap-2 rounded-[14px] bg-primary text-white px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus size={16} /> Add employee
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <h2 className="text-sm font-semibold text-heading mb-3">Departments</h2>
          {isLoading && <Skeleton className="h-64 w-full" />}
          {isError && <ErrorState onRetry={() => refetch()} />}
          {!isLoading && !isError && departments && <DepartmentTree departments={departments} />}
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-heading mb-3">Employees</h2>
          <EmployeeTable department={selectedDept} />
        </div>
      </div>
    </div>
  );
}

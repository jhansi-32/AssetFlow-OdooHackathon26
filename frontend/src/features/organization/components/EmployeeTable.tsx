import { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Boxes } from 'lucide-react';
import { useEmployees } from '@/features/organization/hooks/useOrganization';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';

export function EmployeeTable({ department }: { department?: string }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { data, isLoading, isError, refetch } = useEmployees({ search, department, page, pageSize });

  return (
    <div className="rounded-[14px] bg-surface border border-border shadow-sm">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search employees…"
            className="w-full rounded-[12px] border border-border bg-background pl-9 pr-3 py-2 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {isLoading && (
        <div className="p-4 space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      )}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {!isLoading && !isError && data?.items.length === 0 && (
        <EmptyState icon={<Boxes size={20} />} title="No employees found" description="Try adjusting your search or add a new employee." />
      )}

      {!isLoading && !isError && data && data.items.length > 0 && (
        <>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text border-b border-border">
                <th className="px-4 py-2.5 font-medium">Name</th>
                <th className="px-4 py-2.5 font-medium">Department</th>
                <th className="px-4 py-2.5 font-medium">Role</th>
                <th className="px-4 py-2.5 font-medium">Assets</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((emp) => (
                <tr key={emp.id} className="border-b border-border last:border-0 hover:bg-background transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                        {emp.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="text-heading font-medium">{emp.name}</p>
                        <p className="text-xs text-text">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text">{emp.department}</td>
                  <td className="px-4 py-3 text-text">{emp.role}</td>
                  <td className="px-4 py-3 text-text">{emp.assetsAssigned}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        emp.status === 'Active' ? 'bg-accent/15 text-accent' : 'bg-border text-text'
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-4 py-3 border-t border-border">
            <p className="text-xs text-text">
              Page {data.page} of {Math.max(1, Math.ceil(data.total / data.pageSize))}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-[10px] border border-border flex items-center justify-center disabled:opacity-40"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page * pageSize >= data.total}
                className="w-8 h-8 rounded-[10px] border border-border flex items-center justify-center disabled:opacity-40"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

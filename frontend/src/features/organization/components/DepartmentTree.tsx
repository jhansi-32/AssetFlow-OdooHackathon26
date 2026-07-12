import { useMemo, useState } from 'react';
import { ChevronRight, Users, Boxes } from 'lucide-react';
import type { Department } from '@/types/organization.types';

function buildTree(departments: Department[], parentId: string | null): Department[] {
  return departments.filter((d) => d.parentId === parentId);
}

function TreeNode({ department, all, depth }: { department: Department; all: Department[]; depth: number }) {
  const [expanded, setExpanded] = useState(depth === 0);
  const children = buildTree(all, department.id);

  return (
    <div>
      <div
        className="flex items-center gap-2 py-2 px-2 rounded-[10px] hover:bg-background cursor-pointer"
        style={{ paddingLeft: depth * 20 + 8 }}
        onClick={() => children.length > 0 && setExpanded((e) => !e)}
      >
        {children.length > 0 ? (
          <ChevronRight
            size={14}
            className={`text-text transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        ) : (
          <span className="w-3.5" />
        )}
        <span className="text-sm font-medium text-heading">{department.name}</span>
        <span className="text-xs text-text ml-auto flex items-center gap-3">
          <span className="flex items-center gap-1"><Users size={12} /> {department.employeeCount}</span>
          <span className="flex items-center gap-1"><Boxes size={12} /> {department.assetCount}</span>
        </span>
      </div>
      {expanded &&
        children.map((child) => (
          <TreeNode key={child.id} department={child} all={all} depth={depth + 1} />
        ))}
    </div>
  );
}

export function DepartmentTree({ departments }: { departments: Department[] }) {
  const roots = useMemo(() => buildTree(departments, null), [departments]);
  return (
    <div className="rounded-[14px] bg-surface border border-border p-3 shadow-sm">
      {roots.map((root) => (
        <TreeNode key={root.id} department={root} all={departments} depth={0} />
      ))}
    </div>
  );
}

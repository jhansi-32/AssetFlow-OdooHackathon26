import { PackagePlus, Wrench, ClipboardCheck, FileBarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ACTIONS = [
  { label: 'Add asset', icon: PackagePlus, path: '/assets/new' },
  { label: 'Raise maintenance', icon: Wrench, path: '/maintenance/new' },
  { label: 'Start audit', icon: ClipboardCheck, path: '/audit/new' },
  { label: 'Generate report', icon: FileBarChart, path: '/reports' },
];

export function QuickActions() {
  const navigate = useNavigate();
  return (
    <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-heading">Quick actions</h3>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {ACTIONS.map(({ label, icon: Icon, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-2 rounded-[14px] border border-border py-4 hover:bg-background hover:border-primary/30 transition-colors"
          >
            <div className="w-9 h-9 rounded-[10px] bg-primary/10 text-primary flex items-center justify-center">
              <Icon size={17} />
            </div>
            <span className="text-xs font-medium text-heading text-center">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

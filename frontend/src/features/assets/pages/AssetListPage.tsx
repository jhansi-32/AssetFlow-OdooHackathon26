import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AssetTable } from '@/features/assets/components/AssetTable';

export default function AssetListPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-heading">Assets</h1>
          <p className="text-sm text-text mt-1">Every asset in your organization, in one registry.</p>
        </div>
        <button
          onClick={() => navigate('/assets/new')}
          className="flex items-center gap-2 rounded-[14px] bg-primary text-white px-4 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} /> Add asset
        </button>
      </div>
      <AssetTable />
    </div>
  );
}

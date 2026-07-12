import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, ShieldCheck, Building2, Tag } from 'lucide-react';
import { useAsset } from '@/features/assets/hooks/useAssets';
import { AssetStatusBadge } from '@/features/assets/components/AssetStatusBadge';
import { AssetHealthScore } from '@/features/assets/components/AssetHealthScore';
import { AssetTimeline } from '@/features/assets/components/AssetTimeline';
import { AssetQrPassport } from '@/features/assets/components/AssetQrPassport';
import { Skeleton } from '@/components/shared/Skeleton';
import { ErrorState } from '@/components/shared/ErrorState';

const TABS = ['Overview', 'Timeline', 'Documents'] as const;

export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: asset, isLoading, isError, refetch } = useAsset(id!);
  const [tab, setTab] = useState<(typeof TABS)[number]>('Overview');

  if (isLoading) return <Skeleton className="h-96 w-full" />;
  if (isError || !asset) return <ErrorState onRetry={() => refetch()} />;

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-text hover:text-heading">
        <ArrowLeft size={15} /> Back to assets
      </button>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-heading">{asset.name}</h1>
            <AssetStatusBadge status={asset.status} />
          </div>
          <p className="text-sm text-text mt-1 font-mono">{asset.assetTag}</p>
        </div>
        <AssetHealthScore score={asset.healthScore} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-[14px] bg-surface border border-border p-1.5 shadow-sm inline-flex">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 text-sm font-medium rounded-[10px] transition-colors ${
                  tab === t ? 'bg-primary text-white' : 'text-text hover:bg-background'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === 'Overview' && (
            <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-start gap-3">
                <Building2 size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-text">Department</p>
                  <p className="text-sm text-heading font-medium">{asset.department}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-text">Purchased</p>
                  <p className="text-sm text-heading font-medium">{asset.purchaseDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-text">Warranty</p>
                  <p className="text-sm text-heading font-medium">{asset.warrantyExpiry ?? 'No warranty on file'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Tag size={16} className="text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-text">Tags</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {asset.tags.map((t) => (
                      <span key={t} className="text-xs bg-border/50 text-text px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === 'Timeline' && (
            <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm">
              <AssetTimeline assetId={asset.id} />
            </div>
          )}

          {tab === 'Documents' && (
            <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm">
              {asset.documents.length === 0 ? (
                <p className="text-sm text-text">No documents uploaded for this asset.</p>
              ) : (
                <ul className="space-y-2">
                  {asset.documents.map((doc) => (
                    <li key={doc.id} className="flex items-center justify-between text-sm text-heading border border-border rounded-[10px] px-3 py-2">
                      {doc.name}
                      <span className="text-xs text-text">{doc.uploadedAt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div>
          <AssetQrPassport asset={asset} />
        </div>
      </div>
    </div>
  );
}

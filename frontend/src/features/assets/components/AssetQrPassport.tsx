import QRCode from 'react-qr-code';
import { Download } from 'lucide-react';
import type { Asset } from '@/types/asset.types';

export function AssetQrPassport({ asset }: { asset: Asset }) {
  const passportUrl = `${window.location.origin}/assets/passport/${asset.id}`;

  return (
    <div className="rounded-[14px] bg-surface border border-border p-6 shadow-sm text-center">
      <h3 className="text-sm font-semibold text-heading">Asset passport</h3>
      <p className="text-xs text-text mt-0.5">Scan to view live asset details</p>

      <div className="mt-5 inline-block p-4 bg-white rounded-[14px] border border-border">
        <QRCode value={passportUrl} size={140} fgColor="#24332F" bgColor="#FFFFFF" />
      </div>

      <p className="mt-3 text-xs text-text font-mono">{asset.assetTag}</p>

      <button className="mt-4 mx-auto flex items-center gap-2 text-sm font-medium text-primary hover:underline">
        <Download size={14} /> Download passport card
      </button>
    </div>
  );
}

export type AuditItemStatus = 'Verified' | 'Missing' | 'Damaged' | 'Pending';

export interface AuditRun {
  id: string;
  name: string;
  department: string;
  startedAt: string;
  progressPct: number;
  totalAssets: number;
  verifiedAssets: number;
  missingAssets: number;
  damagedAssets: number;
}

export interface AuditItem {
  id: string;
  assetName: string;
  assetTag: string;
  status: AuditItemStatus;
  verifiedAt?: string;
  verifiedBy?: string;
}

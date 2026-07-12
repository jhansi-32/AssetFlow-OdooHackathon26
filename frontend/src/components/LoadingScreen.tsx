import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin text-primary" size={28} />
        <p className="text-sm text-text">Loading AssetFlow…</p>
      </div>
    </div>
  );
}

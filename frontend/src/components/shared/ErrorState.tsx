import { AlertTriangle, RotateCw } from 'lucide-react';

export function ErrorState({
  message = "We couldn't load this data.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-6">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
        <AlertTriangle size={20} />
      </div>
      <p className="mt-4 text-sm text-text max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <RotateCw size={14} /> Try again
        </button>
      )}
    </div>
  );
}

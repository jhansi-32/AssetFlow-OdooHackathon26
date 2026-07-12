import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function SessionExpiredPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-sm">
        <div className="mx-auto w-14 h-14 rounded-full bg-secondary/25 flex items-center justify-center">
          <Clock className="text-heading" size={24} />
        </div>
        <h1 className="mt-5 text-xl font-semibold text-heading">Your session has expired</h1>
        <p className="mt-2 text-sm text-text">Sign in again to keep working where you left off.</p>
        <button
          onClick={() => navigate('/login', { replace: true })}
          className="mt-6 rounded-[14px] bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Sign in again
        </button>
      </div>
    </div>
  );
}

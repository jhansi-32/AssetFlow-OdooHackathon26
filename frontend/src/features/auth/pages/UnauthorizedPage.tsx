import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-sm">
        <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
          <ShieldAlert className="text-red-500" size={24} />
        </div>
        <h1 className="mt-5 text-xl font-semibold text-heading">You don't have access to this page</h1>
        <p className="mt-2 text-sm text-text">Contact your administrator if you think this is a mistake.</p>
        <button
          onClick={() => navigate('/dashboard', { replace: true })}
          className="mt-6 rounded-[14px] bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  );
}

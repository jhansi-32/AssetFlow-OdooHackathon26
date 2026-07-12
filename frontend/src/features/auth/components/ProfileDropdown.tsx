import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function ProfileDropdown() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  if (!user) return null;
  const initials = user.name.split(' ').map((n) => n[0]).slice(0, 2).join('');

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-[14px] px-2 py-1.5 hover:bg-border/40 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-full bg-primary text-white text-xs font-medium flex items-center justify-center">
          {initials}
        </div>
        <span className="hidden sm:block text-sm text-heading font-medium">{user.name}</span>
        <ChevronDown size={16} className="text-text" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 rounded-[14px] bg-surface border border-border shadow-lg py-1.5 z-50"
        >
          <div className="px-3.5 py-2 border-b border-border">
            <p className="text-sm font-medium text-heading truncate">{user.name}</p>
            <p className="text-xs text-text truncate">{user.email}</p>
          </div>
          <button
            role="menuitem"
            onClick={() => navigate('/settings/profile')}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-sm text-text hover:bg-background transition-colors"
          >
            <User size={15} /> My profile
          </button>
          <button
            role="menuitem"
            onClick={() => navigate('/settings')}
            className="w-full flex items-center gap-2 px-3.5 py-2 text-sm text-text hover:bg-background transition-colors"
          >
            <Settings size={15} /> Settings
          </button>
          <div className="border-t border-border mt-1 pt-1">
            <button
              role="menuitem"
              onClick={() => logout()}
              className="w-full flex items-center gap-2 px-3.5 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} /> Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

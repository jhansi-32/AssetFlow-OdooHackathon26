import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const TABS = ['Profile', 'Preferences', 'Notifications'] as const;

export default function SettingsPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<(typeof TABS)[number]>('Profile');

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-heading">Settings</h1>
        <p className="text-sm text-text mt-1">Manage your profile, theme, and notification preferences.</p>
      </div>

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

      {tab === 'Profile' && (
        <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium text-heading">Full name</label>
            <input
              defaultValue={user?.name}
              className="mt-1.5 w-full rounded-[14px] border border-border bg-background px-3.5 py-2.5 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-heading">Email</label>
            <input
              defaultValue={user?.email}
              className="mt-1.5 w-full rounded-[14px] border border-border bg-background px-3.5 py-2.5 text-sm text-heading focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button className="rounded-[14px] bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors">
            Save changes
          </button>
        </div>
      )}

      {tab === 'Preferences' && (
        <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm space-y-4">
          <label className="flex items-center justify-between text-sm text-heading">
            Dark mode
            <input type="checkbox" className="accent-primary w-4 h-4" />
          </label>
        </div>
      )}

      {tab === 'Notifications' && (
        <div className="rounded-[14px] bg-surface border border-border p-5 shadow-sm space-y-4">
          <label className="flex items-center justify-between text-sm text-heading">
            Email notifications
            <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
          </label>
          <label className="flex items-center justify-between text-sm text-heading">
            Push notifications
            <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
          </label>
          <label className="flex items-center justify-between text-sm text-heading">
            Weekly digest email
            <input type="checkbox" className="accent-primary w-4 h-4" />
          </label>
        </div>
      )}
    </div>
  );
}

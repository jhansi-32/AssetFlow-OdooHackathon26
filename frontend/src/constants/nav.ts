import type { NavSection } from '@/types'

export const NAV_SECTIONS: NavSection[] = [
  {
    id: 'main',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
      { id: 'assets', label: 'Assets', href: '/assets', icon: 'Boxes', badge: 128 },
      { id: 'requests', label: 'Requests', href: '/requests', icon: 'ClipboardList', badge: 5 },
      { id: 'maintenance', label: 'Maintenance', href: '/maintenance', icon: 'Wrench' },
    ],
  },
  {
    id: 'organization',
    title: 'Organization',
    items: [
      { id: 'departments', label: 'Departments', href: '/departments', icon: 'Building2' },
      { id: 'people', label: 'People', href: '/people', icon: 'Users' },
      { id: 'reports', label: 'Reports', href: '/reports', icon: 'BarChart3' },
    ],
  },
  {
    id: 'system',
    title: 'System',
    items: [{ id: 'settings', label: 'Settings', href: '/settings', icon: 'Settings' }],
  },
]

export interface NavItem {
  id: string
  label: string
  href: string
  icon: LucideIconName
  badge?: string | number
}

export interface NavSection {
  id: string
  title?: string
  items: NavItem[]
}

// Kept as a string union so we don't import the full lucide-react icon type surface here.
export type LucideIconName =
  | 'LayoutDashboard'
  | 'Boxes'
  | 'ClipboardList'
  | 'Wrench'
  | 'Users'
  | 'BarChart3'
  | 'Settings'
  | 'Building2'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  role: string
}

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'accent'

export interface TableColumn<T> {
  key: keyof T
  header: string
  render?: (row: T) => React.ReactNode
  align?: 'left' | 'right' | 'center'
  width?: string
}

import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell, Menu, Moon, Sun, Search, Plus, LogOut, User as UserIcon, Settings } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Dropdown, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { useDisclosure } from '@/hooks/useDisclosure'

interface NavbarProps {
  onMobileMenuToggle: () => void
}

function useBreadcrumb() {
  const location = useLocation()
  const segments = location.pathname.split('/').filter(Boolean)
  if (segments.length === 0) return [{ label: 'Dashboard', href: '/' }]
  return [
    { label: 'Dashboard', href: '/' },
    ...segments.map((seg, i) => ({
      label: seg.charAt(0).toUpperCase() + seg.slice(1),
      href: '/' + segments.slice(0, i + 1).join('/'),
    })),
  ]
}

export function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const breadcrumb = useBreadcrumb()
  const palette = useDisclosure(false)

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        palette.toggle()
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-surface px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMobileMenuToggle}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-1.5 text-sm sm:flex">
          {breadcrumb.map((crumb, i) => (
            <span key={crumb.href} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-border">/</span>}
              <Link
                to={crumb.href}
                className={
                  i === breadcrumb.length - 1
                    ? 'font-medium text-heading'
                    : 'text-text hover:text-heading transition-colors'
                }
              >
                {crumb.label}
              </Link>
            </span>
          ))}
        </nav>

        {/* Search trigger */}
        <button
          onClick={palette.open}
          className="ml-auto flex h-9 w-full max-w-xs items-center gap-2 rounded-[var(--radius-md)] border border-border bg-background px-3 text-sm text-text hover:border-secondary transition-colors sm:ml-4"
        >
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">Search AssetFlow...</span>
          <kbd className="ml-auto hidden rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium sm:inline">
            ⌘K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
          <Button variant="primary" size="sm" className="hidden sm:inline-flex">
            <Plus className="h-4 w-4" />
            New Asset
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
          </Button>

          <Dropdown
            trigger={
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger" />
              </Button>
            }
          >
            <div className="px-3 py-2">
              <p className="text-sm font-semibold text-heading">Notifications</p>
            </div>
            <DropdownSeparator />
            <div className="flex flex-col gap-1 px-1">
              <div className="rounded-[8px] px-2.5 py-2 hover:bg-sidebar transition-colors">
                <p className="text-sm text-heading">Maintenance request approved</p>
                <p className="text-xs text-text mt-0.5">2 minutes ago</p>
              </div>
              <div className="rounded-[8px] px-2.5 py-2 hover:bg-sidebar transition-colors">
                <p className="text-sm text-heading">Asset #A-1042 due for inspection</p>
                <p className="text-xs text-text mt-0.5">1 hour ago</p>
              </div>
            </div>
          </Dropdown>

          <Dropdown
            trigger={
              <button className="flex items-center gap-2 rounded-[var(--radius-md)] p-1 pr-2 hover:bg-sidebar transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                  {user?.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-medium text-heading leading-none">{user?.name}</p>
                  <p className="text-[11px] text-text mt-0.5">{user?.role}</p>
                </div>
              </button>
            }
          >
            <DropdownItem>
              <UserIcon className="h-4 w-4" /> My Profile
            </DropdownItem>
            <DropdownItem>
              <Settings className="h-4 w-4" /> Preferences
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem onClick={logout} className="text-danger hover:text-danger">
              <LogOut className="h-4 w-4" /> Sign out
            </DropdownItem>
          </Dropdown>
        </div>
      </header>

      <CommandPalette open={palette.isOpen} onClose={palette.close} />
    </>
  )
}

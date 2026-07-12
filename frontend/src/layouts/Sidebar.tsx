import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronsLeft, Layers } from 'lucide-react'
import { cn } from '@/utils/cn'
import { NAV_SECTIONS } from '@/constants/nav'
import { ICON_MAP } from '@/components/icon-map'
import { Badge } from '@/components/ui/Badge'
import { Tooltip } from '@/components/ui/Tooltip'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  /** When true, renders as a mobile drawer panel (no fixed positioning quirks). */
  mobile?: boolean
}

export function Sidebar({ collapsed, onToggle, mobile = false }: SidebarProps) {
  return (
    <aside
      className={cn(
        'flex h-full flex-col border-r border-border bg-sidebar transition-[width] duration-200 ease-out',
        mobile ? 'w-full' : collapsed ? 'w-[76px]' : 'w-[264px]'
      )}
    >
      {/* Brand */}
      <div
        className={cn(
          'flex h-16 shrink-0 items-center border-b border-border px-4',
          collapsed && !mobile ? 'justify-center' : 'justify-between'
        )}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-primary text-white shadow-soft">
            <Layers className="h-4.5 w-4.5" />
          </div>
          {(!collapsed || mobile) && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-nowrap text-[15px] font-semibold text-heading"
            >
              AssetFlow
            </motion.span>
          )}
        </div>
        {!mobile && (
          <button
            onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-md text-text hover:bg-white hover:text-heading transition-colors',
              collapsed && 'hidden'
            )}
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && !mobile && (
        <button
          onClick={onToggle}
          aria-label="Expand sidebar"
          className="mx-auto mt-2 flex h-7 w-7 items-center justify-center rounded-md text-text hover:bg-white hover:text-heading transition-colors"
        >
          <ChevronsLeft className="h-4 w-4 rotate-180" />
        </button>
      )}

      {/* Nav sections */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.id}>
            {section.title && (!collapsed || mobile) && (
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-text/70">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = ICON_MAP[item.icon]
                const linkContent = (
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      cn(
                        'group relative flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors',
                        collapsed && !mobile && 'justify-center px-0',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text hover:bg-white hover:text-heading'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="active-nav-indicator"
                            className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-primary"
                          />
                        )}
                        <Icon className="h-[18px] w-[18px] shrink-0" />
                        {(!collapsed || mobile) && <span className="truncate">{item.label}</span>}
                        {(!collapsed || mobile) && item.badge && (
                          <Badge
                            variant={isActive ? 'accent' : 'default'}
                            className="ml-auto"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </NavLink>
                )

                return (
                  <li key={item.id}>
                    {collapsed && !mobile ? (
                      <Tooltip content={item.label} side="right">
                        {linkContent}
                      </Tooltip>
                    ) : (
                      linkContent
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={cn('border-t border-border p-4', collapsed && !mobile && 'flex justify-center')}>
        {!collapsed || mobile ? (
          <div className="rounded-[var(--radius-md)] bg-white p-3 shadow-soft">
            <p className="text-xs font-semibold text-heading">Storage</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sidebar">
              <div className="h-full w-[62%] rounded-full bg-accent" />
            </div>
            <p className="mt-1.5 text-[11px] text-text">6.2 GB of 10 GB used</p>
          </div>
        ) : (
          <div className="h-2 w-2 rounded-full bg-accent" />
        )}
      </div>
    </aside>
  )
}

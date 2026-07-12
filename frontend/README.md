# AssetFlow — Enterprise Frontend Foundation

A premium, production-ready frontend scaffold for AssetFlow, built for the Odoo Hackathon.
This is the **foundation layer only** — layout, navigation, design system, and reusable
UI primitives. No business modules are implemented yet, by design.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · React Router · TanStack Query · Axios ·
React Hook Form + Zod · Framer Motion · Recharts · Lucide React · Sonner

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks + production build
npm run preview  # preview the production build
```

## Design system

Colors, radii, and shadows are defined once as CSS variables / Tailwind v4 theme tokens
in `src/index.css` (`@theme` block) — never hardcode hex values in components, reference
the tokens (`bg-primary`, `text-heading`, `rounded-[var(--radius-md)]`, etc.) instead.

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#2F6B5F` | Primary actions, active states |
| `primary-hover` | `#25574D` | Hover state for primary |
| `secondary` | `#D9C7A3` | Secondary accents, progress fills |
| `accent` | `#7A9E7E` | Highlights, positive deltas |
| `background` | `#F8F7F4` | App background |
| `surface` | `#FFFFFF` | Cards, panels, modals |
| `sidebar` | `#F3F1EB` | Sidebar, subtle section backgrounds |
| `border` | `#E7E2D8` | All borders/dividers |
| `heading` | `#24332F` | Headings, high-emphasis text |
| `text` | `#5E6B67` | Body / secondary text |
| `success` / `warning` / `danger` | `#2E7D32` / `#D97706` / `#C0392B` | Status semantics |

## Folder structure

```
src/
  app/          — providers (React Query, Theme, Auth composed together)
  components/   — shared UI primitives (Button, Card, Modal, DataTable, ...)
  layouts/      — Sidebar, Navbar, DashboardLayout
  features/     — feature-based modules (business logic lives here, not in pages/)
  pages/        — route-level compositions (thin — delegate to features/)
  hooks/        — shared hooks (useDisclosure, useDebounce, useMediaQuery)
  services/     — axios instance + interceptors
  contexts/     — ThemeContext, AuthContext
  routes/       — ProtectedRoute
  types/        — shared TypeScript types
  constants/    — nav config, etc.
```

## What's included

- Collapsible, animated **Sidebar** with section grouping, active indicator, and
  tooltip-on-collapse for icon-only mode
- **Navbar** with breadcrumb, global search trigger, **Command Palette** (⌘K / Ctrl+K),
  notifications dropdown, theme toggle, and profile menu
- **DashboardLayout** — responsive: sidebar becomes a slide-in drawer below `lg`
- **ProtectedRoute**, **ErrorBoundary**, animated **LoadingScreen**, and a designed
  **404 page**
- Reusable primitives: `Button`, `Badge`, `Card`, `Modal`, `Drawer`, `Tooltip`,
  `Dropdown`, sortable `DataTable` (with loading/empty states), `Skeleton` loaders
- `DashboardPage` demonstrates the system end-to-end (KPI cards, status badges,
  sortable table) — treat it as a reference, not a fixed template

## Next steps

Build out business modules under `src/features/<name>/` (Assets, Requests, Maintenance,
Departments, People, Reports) following the pattern documented in
`src/features/dashboard/README.md`, then wire their routes into `src/App.tsx`.

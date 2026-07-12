# Dashboard feature

Feature-based module boundary. Business logic for the dashboard (widgets, KPIs,
activity feed) lives here — not in `pages/`. `pages/DashboardPage.tsx` should stay a
thin composition layer that imports from this folder.

- `components/` — dashboard-only UI (widgets, charts, cards)
- `hooks/` — data-fetching and state hooks (e.g. `useDashboardStats`)
- `api/` — TanStack Query functions calling `services/api.ts`
- `types/` — feature-local types not shared elsewhere

import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Auth (Module 2)
import LoginPage from '@/features/auth/pages/LoginPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';
import ResetPasswordPage from '@/features/auth/pages/ResetPasswordPage';
import SessionExpiredPage from '@/features/auth/pages/SessionExpiredPage';
import UnauthorizedPage from '@/features/auth/pages/UnauthorizedPage';

// Dashboard (Module 3)
import ExecutiveDashboardPage from '@/features/dashboard/pages/ExecutiveDashboardPage';

// Organization (Module 4)
import OrganizationPage from '@/features/organization/pages/OrganizationPage';

// Assets (Module 5)
import AssetListPage from '@/features/assets/pages/AssetListPage';
import AssetDetailPage from '@/features/assets/pages/AssetDetailPage';

// Allocation (Module 6)
import AllocationPage from '@/features/allocation/pages/AllocationPage';

// Maintenance (Module 7)
import MaintenanceKanbanPage from '@/features/maintenance/pages/MaintenanceKanbanPage';

// Audit (Module 8)
import AuditDashboardPage from '@/features/audit/pages/AuditDashboardPage';

// Reports (Module 9)
import ReportsPage from '@/features/reports/pages/ReportsPage';

// Notifications (Module 10)
import NotificationsPage from '@/features/notifications/pages/NotificationsPage';

// Settings (Module 11)
import SettingsPage from '@/features/settings/pages/SettingsPage';

// Existing shell (Module 1 — already implemented, imported not recreated)
// import { DashboardLayout } from '@/layouts/DashboardLayout';
// import NotFoundPage from '@/pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/session-expired" element={<SessionExpiredPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected app routes — wrap with the existing DashboardLayout from Module 1 */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<ExecutiveDashboardPage />} />

        <Route path="/organization" element={<OrganizationPage />} />

        <Route path="/assets" element={<AssetListPage />} />
        <Route path="/assets/:id" element={<AssetDetailPage />} />

        <Route path="/allocation" element={<AllocationPage />} />

        <Route path="/maintenance" element={<MaintenanceKanbanPage />} />

        <Route path="/audit" element={<AuditDashboardPage />} />

        <Route path="/reports" element={<ReportsPage />} />

        <Route path="/notifications" element={<NotificationsPage />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/profile" element={<SettingsPage />} />
      </Route>

      {/* 404 — existing page from Module 1, not recreated here */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

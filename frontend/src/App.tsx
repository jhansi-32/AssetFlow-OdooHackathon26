import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { AppProviders } from '@/app/providers'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { LoadingScreen } from '@/pages/LoadingScreen'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { DashboardPage } from '@/pages/DashboardPage'

// Lazy-loaded route-level pages keep the initial bundle lean.
// Add feature pages here as they're built out (Assets, Requests, Maintenance, etc.)
const PlaceholderPage = lazy(() => import('@/pages/PlaceholderPage'))

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="assets" element={<PlaceholderPage title="Assets" />} />
                <Route path="requests" element={<PlaceholderPage title="Requests" />} />
                <Route path="maintenance" element={<PlaceholderPage title="Maintenance" />} />
                <Route path="departments" element={<PlaceholderPage title="Departments" />} />
                <Route path="people" element={<PlaceholderPage title="People" />} />
                <Route path="reports" element={<PlaceholderPage title="Reports" />} />
                <Route path="settings" element={<PlaceholderPage title="Settings" />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  )
}

export default App

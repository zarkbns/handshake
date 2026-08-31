import { Navigate, Route, Routes } from 'react-router-dom'

import { ConnectPage } from './pages/ConnectPage'
import { DashboardLayout } from './pages/DashboardLayout'
import { DevelopersLayout } from './pages/DevelopersLayout'
import { ApiKeysPage } from './pages/ApiKeysPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { DocsPage } from './pages/DocsPage'
import { LandingPage } from './pages/LandingPage'
import { OverviewPage } from './pages/OverviewPage'
import { SettlementDetailPage } from './pages/SettlementDetailPage'
import { SettlementsPage } from './pages/SettlementsPage'
import { SdkPage } from './pages/SdkPage'
import { WebhooksPage } from './pages/WebhooksPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/connect" element={<ConnectPage />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="settlements" element={<SettlementsPage />} />
        <Route path="settlements/:id" element={<SettlementDetailPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="docs" element={<DocsPage />} />
        <Route path="developers" element={<DevelopersLayout />}>
          <Route index element={<Navigate to="/dashboard/developers/api-keys" replace />} />
          <Route path="api-keys" element={<ApiKeysPage />} />
          <Route path="sdk" element={<SdkPage />} />
          <Route path="webhooks" element={<WebhooksPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

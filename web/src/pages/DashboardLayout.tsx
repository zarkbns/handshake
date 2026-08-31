import { Outlet } from 'react-router-dom'

import { DashboardHeader } from '@/components/dashboard/header'

/**
 * Dashboard shell.
 *
 * Top header navigation only, at every breakpoint. The landing and auth screens
 * at `/` keep their own full-bleed layout and are unaffected by this route group.
 */
export function DashboardLayout() {
  return (
    <div className="ds-root">
      <div className="ds-shell">
        <DashboardHeader />
        <main className="ds-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

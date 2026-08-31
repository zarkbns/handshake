import { Outlet } from 'react-router-dom'

import { PageHeader } from '@/components/dashboard/page-header'

import { DeveloperTabs } from './DeveloperTabs'

/**
 * Developers section.
 *
 * Sub-navigation is contextual tabs inside the page, not a sidebar, and not
 * extra top-level header entries.
 */
export function DevelopersLayout() {
  return (
    <>
      <PageHeader
        eyebrow="Developers"
        title="Integration"
        lede="Credentials, SDK surface, and event delivery for driving Handshake settlements from your own infrastructure."
      />
      <div style={{ marginTop: 22 }}>
        <DeveloperTabs />
        <Outlet />
      </div>
    </>
  )
}
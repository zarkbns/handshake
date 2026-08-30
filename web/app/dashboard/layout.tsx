import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { DashboardHeader } from '@/components/dashboard/header'

export const metadata: Metadata = {
  title: 'Handshake — Settlement Dashboard',
  description:
    'Monitor cross-chain DvP settlements, Attestcoin proof verification, and recovery state on Creditcoin.',
}

/**
 * Dashboard shell.
 *
 * Top header navigation only, at every breakpoint. The landing and auth screens
 * at `/` keep their own full-bleed layout and are unaffected by this route group.
 */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ds-root">
      <div className="ds-shell">
        <DashboardHeader />
        <main className="ds-main">{children}</main>
      </div>
    </div>
  )
}

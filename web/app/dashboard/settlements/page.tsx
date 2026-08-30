import { Suspense } from 'react'

import { PageHeader } from '@/components/dashboard/page-header'
import { TableSkeleton } from '@/components/dashboard/states'

import { SettlementsView } from './settlements-view'

/**
 * The list view reads `?status=` to support the header dropdown deep links,
 * which requires a Suspense boundary so the shell can prerender statically.
 */
export default function SettlementsPage() {
  return (
    <Suspense
      fallback={
        <>
          <PageHeader
            eyebrow="Settlements"
            title="All settlements"
            lede="Every settlement the coordinator has registered, with proof coverage and recovery state."
          />
          <div className="ds-section">
            <TableSkeleton rows={8} />
          </div>
        </>
      }
    >
      <SettlementsView />
    </Suspense>
  )
}

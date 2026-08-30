'use client'

import { ActivityChart, ChartSkeleton } from '@/components/dashboard/activity-chart'
import { MetricCard, MetricGrid, MetricGridSkeleton } from '@/components/dashboard/metric-card'
import { PageHeader } from '@/components/dashboard/page-header'
import { OriginBadge, Panel, SectionHeading } from '@/components/dashboard/primitives'
import { RouteCell } from '@/components/dashboard/settlement-table'
import { EmptyState, ErrorState, Notice, TableSkeleton } from '@/components/dashboard/states'
import { Segmented } from '@/components/dashboard/tabs'
import { formatCount, formatDuration, formatPercent } from '@/lib/handshake/format'
import { ACTIVITY_WINDOWS } from '@/lib/handshake/navigation'
import { metricsService } from '@/lib/handshake/services'
import type { ActivityWindow } from '@/lib/handshake/types'
import { useAsync } from '@/lib/handshake/use-async'
import { useState } from 'react'

export default function AnalyticsPage() {
  const [activityWindow, setActivityWindow] = useState<ActivityWindow>('30D')

  const metrics = useAsync(() => metricsService.snapshot(), [])
  const series = useAsync(() => metricsService.activitySeries(activityWindow), [activityWindow])
  const routes = useAsync(() => metricsService.routes(), [])

  const snapshot = metrics.data?.data

  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="Infrastructure performance"
        lede="Operational health of the settlement path: how much reaches SETTLED, how much falls back to HELD, and how long verification takes."
      />

      {metrics.data?.notice ? (
        <div style={{ marginTop: 20 }}>
          <Notice title="Aggregates are not live">{metrics.data.notice}</Notice>
        </div>
      ) : null}

      <section className="ds-section">
        <SectionHeading
          title="Settlement outcomes"
          action={snapshot ? <OriginBadge origin={snapshot.origin} /> : null}
        />
        {metrics.loading ? (
          <MetricGridSkeleton />
        ) : metrics.error ? (
          <ErrorState description="Unable to load analytics." onRetry={metrics.reload} />
        ) : snapshot ? (
          <>
            <MetricGrid>
              <MetricCard label="Total settlements" value={snapshot.totalSettlements} />
              <MetricCard
                label="Success rate"
                value={formatPercent(snapshot.successRate)}
                tone="settled"
                ratio={snapshot.successRate}
                meta={`${formatCount(snapshot.settled)} settled`}
              />
              <MetricCard
                label="Held rate"
                value={formatPercent(snapshot.heldRate)}
                tone="held"
                ratio={snapshot.heldRate}
                meta={`${formatCount(snapshot.held)} recovered via timeout`}
              />
              <MetricCard
                label="Avg settlement time"
                value={formatDuration(snapshot.averageSettlementSeconds)}
                meta="PREPARE to SETTLED"
              />
            </MetricGrid>

            <div style={{ marginTop: -1 }}>
              <MetricGrid>
                <MetricCard
                  label="Proofs verified"
                  value={snapshot.proofsVerified}
                  meta="Attestcoin + native state checks"
                />
                <MetricCard
                  label="Unverified legs"
                  value={snapshot.proofVerificationFailures}
                  tone="held"
                  meta="Legs never accepted by the coordinator"
                />
                <MetricCard
                  label="In flight"
                  value={snapshot.inFlight}
                  meta="PREPARE, READY, or COMMIT"
                />
                <MetricCard
                  label="Irreversible commits"
                  value={snapshot.settled}
                  meta="COMMIT executed on Creditcoin"
                />
              </MetricGrid>
            </div>
          </>
        ) : null}
      </section>

      <section className="ds-section">
        <SectionHeading
          title="Settlement volume over time"
          action={
            <Segmented
              options={ACTIVITY_WINDOWS}
              active={activityWindow}
              onChange={setActivityWindow}
              label="Analytics window"
            />
          }
        />
        <Panel>
          {series.loading ? (
            <ChartSkeleton />
          ) : series.error ? (
            <ErrorState description="Unable to load the volume series." onRetry={series.reload} />
          ) : series.data && series.data.data.length > 0 ? (
            <ActivityChart points={series.data.data} />
          ) : (
            <EmptyState
              title="No volume in this window."
              description="Extend the range to see settlement throughput."
            />
          )}
        </Panel>
      </section>

      <section className="ds-section">
        <SectionHeading
          title="Chain routes"
          note="Handshake is two-leg: the Ethereum Sepolia asset leg is proven through Attestcoin, the Creditcoin payment leg is read natively. Direction indicates which leg initiates."
        />
        {routes.loading ? (
          <TableSkeleton rows={2} columns={5} />
        ) : routes.error ? (
          <ErrorState description="Unable to load route breakdown." onRetry={routes.reload} />
        ) : routes.data && routes.data.data.length > 0 ? (
          <div className="ds-table-wrap">
            <table className="ds-table">
              <thead>
                <tr>
                  <th scope="col">Route</th>
                  <th scope="col">Total</th>
                  <th scope="col">Settled</th>
                  <th scope="col">Held</th>
                  <th scope="col">Success rate</th>
                  <th scope="col">Avg time</th>
                </tr>
              </thead>
              <tbody>
                {routes.data.data.map((route) => (
                  <tr key={`${route.sourceChain.key}-${route.destinationChain.key}`}>
                    <td className="ds-cell-strong">
                      <RouteCell source={route.sourceChain} destination={route.destinationChain} />
                    </td>
                    <td className="ds-cell-numeric">{formatCount(route.total)}</td>
                    <td className="ds-cell-numeric">{formatCount(route.settled)}</td>
                    <td className="ds-cell-numeric">{formatCount(route.held)}</td>
                    <td className="ds-cell-numeric">
                      {formatPercent(route.total > 0 ? route.settled / route.total : 0)}
                    </td>
                    <td className="ds-cell-numeric">
                      {formatDuration(route.averageSettlementSeconds)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState
            title="No routes recorded."
            description="Route statistics appear once settlements complete on at least one chain pair."
          />
        )}
      </section>
    </>
  )
}

import { ArrowUpRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { ActivityChart, ChartSkeleton } from '@/components/dashboard/activity-chart'
import { ActivityStream, LiveIndicator } from '@/components/dashboard/activity-stream'
import { MetricCard, MetricGrid, MetricGridSkeleton } from '@/components/dashboard/metric-card'
import { PageHeader } from '@/components/dashboard/page-header'
import { OriginBadge, Panel, SectionHeading } from '@/components/dashboard/primitives'
import { SettlementTable } from '@/components/dashboard/settlement-table'
import { EmptyState, ErrorState, Notice, PanelSkeleton, TableSkeleton } from '@/components/dashboard/states'
import { Segmented } from '@/components/dashboard/tabs'
import { formatPercent } from '@/lib/handshake/format'
import { ACTIVITY_WINDOWS } from '@/lib/handshake/navigation'
import { metricsService, settlementService } from '@/lib/handshake/services'
import type { ActivityWindow } from '@/lib/handshake/types'
import { useAsync } from '@/lib/handshake/use-async'

export function OverviewPage() {
  const [activityWindow, setActivityWindow] = useState<ActivityWindow>('7D')

  const metrics = useAsync(() => metricsService.snapshot(), [])
  const series = useAsync(() => metricsService.activitySeries(activityWindow), [activityWindow])
  const recent = useAsync(() => settlementService.recent(6), [])
  const feed = useAsync(() => metricsService.feed(8), [])

  const snapshot = metrics.data?.data
  const sampleBacked = metrics.data?.origin === 'sample'

  return (
    <>
      <PageHeader
        eyebrow="Cross-chain settlement infrastructure"
        title="Settlement operations"
        lede="Monitor verified settlement state, Attestcoin proof coverage, and recovery exposure across Creditcoin and Ethereum Sepolia."
        action={
          <Link className="ds-button" to="/dashboard/settlements">
            <Plus size={11} /> New settlement
          </Link>
        }
      />

      {sampleBacked && metrics.data?.notice ? (
        <div style={{ marginTop: 20 }}>
          <Notice title="Aggregate views are not live">{metrics.data.notice}</Notice>
        </div>
      ) : null}

      <section className="ds-section">
        <SectionHeading
          title="Settlement totals"
          action={snapshot ? <OriginBadge origin={snapshot.origin} /> : null}
        />
        {metrics.loading ? (
          <MetricGridSkeleton />
        ) : metrics.error ? (
          <ErrorState
            description="Unable to load settlement metrics."
            onRetry={metrics.reload}
          />
        ) : snapshot ? (
          <MetricGrid>
            <MetricCard
              label="Total settlements"
              value={snapshot.totalSettlements}
              meta={`${snapshot.inFlight} in flight`}
            />
            <MetricCard
              label="Settled"
              value={snapshot.settled}
              tone="settled"
              ratio={snapshot.successRate}
              meta={`${formatPercent(snapshot.successRate)} success rate`}
            />
            <MetricCard
              label="Held"
              value={snapshot.held}
              tone="held"
              ratio={snapshot.heldRate}
              meta={`${formatPercent(snapshot.heldRate)} held rate`}
            />
            <MetricCard
              label="Proofs verified"
              value={snapshot.proofsVerified}
              meta={`${snapshot.proofVerificationFailures} unverified legs`}
            />
          </MetricGrid>
        ) : null}
      </section>

      <section className="ds-section">
        <SectionHeading
          title="Settlement activity"
          action={
            <Segmented
              options={ACTIVITY_WINDOWS}
              active={activityWindow}
              onChange={setActivityWindow}
              label="Activity window"
            />
          }
        />
        <Panel>
          {series.loading ? (
            <ChartSkeleton />
          ) : series.error ? (
            <ErrorState description="Unable to load activity series." onRetry={series.reload} />
          ) : series.data && series.data.data.length > 0 ? (
            <ActivityChart points={series.data.data} />
          ) : (
            <EmptyState
              title="No activity in this window."
              description="Settled and held counts appear here once settlements complete inside the selected range."
            />
          )}
        </Panel>
      </section>

      <div className="ds-grid-2 ds-section">
        <div>
          <SectionHeading
            title="Recent settlements"
            action={
              <Link className="ds-back" to="/dashboard/settlements">
                View all <ArrowUpRight size={10} />
              </Link>
            }
          />
          {recent.loading ? (
            <TableSkeleton rows={6} />
          ) : recent.error ? (
            <ErrorState
              description="Unable to load settlements."
              onRetry={recent.reload}
            />
          ) : recent.data && recent.data.data.length > 0 ? (
            <SettlementTable rows={recent.data.data} timestampFormat="relative" />
          ) : (
            <EmptyState
              title="No settlements yet."
              description="Create your first settlement to start monitoring cross-chain activity."
            />
          )}
        </div>

        <div>
          <SectionHeading title="Activity stream" action={<LiveIndicator live={false} />} />
          <Panel padded={false}>
            {feed.loading ? (
              <div style={{ padding: 14 }}>
                <PanelSkeleton lines={6} />
              </div>
            ) : feed.error ? (
              <ErrorState description="Unable to load the activity stream." onRetry={feed.reload} />
            ) : feed.data && feed.data.data.length > 0 ? (
              <ActivityStream entries={feed.data.data} live={false} />
            ) : (
              <EmptyState
                title="Nothing to stream."
                description="Coordinator events appear here as settlements progress."
              />
            )}
          </Panel>
          <p className="ds-section-note" style={{ marginTop: 10 }}>
            Real-time delivery is not attached. The coordinator emits an event for every
            transition, but the public testnet RPC cannot serve the log subscription a stream
            requires. The component consumes an event array, so an indexer or WebSocket provider
            can drive it without UI changes.
          </p>
        </div>
      </div>
    </>
  )
}

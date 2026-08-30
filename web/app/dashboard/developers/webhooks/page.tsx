'use client'

import { Webhook } from 'lucide-react'

import { CodeBlock } from '@/components/dashboard/code-block'
import { Panel, SectionHeading } from '@/components/dashboard/primitives'
import { ToneBadge } from '@/components/dashboard/status-badge'
import { EmptyState, ErrorState, Notice, PanelSkeleton } from '@/components/dashboard/states'
import { COORDINATOR_EVENT_DESCRIPTIONS } from '@/lib/handshake/abi'
import { formatDateTime, formatRelative } from '@/lib/handshake/format'
import { webhookService } from '@/lib/handshake/services'
import { useAsync } from '@/lib/handshake/use-async'

const POLL_EXAMPLE = `// Until a dispatcher exists, poll the coordinator for the settlements you care
// about. getHandshake is a cheap view call and needs no credential.
const { createCoordinatorClient } = require('./scripts/coordinator-client')

const coordinator = createCoordinatorClient(provider, process.env.HANDSHAKE_ASC_ADDRESS)

setInterval(async () => {
  const state = await coordinator.state(settlementId)
  if (state !== lastSeen) {
    lastSeen = state
    await notify({ settlementId, state })
  }
}, 15_000)`

export default function WebhooksPage() {
  const endpoints = useAsync(() => webhookService.list(), [])
  const deliveryAvailable = webhookService.deliveryAvailable()

  return (
    <div style={{ paddingTop: 22 }}>
      <SectionHeading
        title="Webhooks"
        note="Push delivery of coordinator state transitions to your own infrastructure."
        action={
          <button
            type="button"
            className="ds-button"
            data-size="sm"
            disabled={!deliveryAvailable}
            title={
              deliveryAvailable
                ? 'Add an endpoint'
                : 'No webhook dispatcher exists in this deployment'
            }
          >
            Add endpoint
          </button>
        }
      />

      {!deliveryAvailable ? (
        <div style={{ marginBottom: 14 }}>
          <Notice title="Delivery is not implemented">
            There is no webhook dispatcher in this repository — no HTTP server, no event listener, no
            retry queue. The interface below is structural only, so registering an endpoint would
            silently never fire. The coordinator does emit an event for every transition, so a
            dispatcher can be built against those logs; until one exists, poll instead.
          </Notice>
        </div>
      ) : null}

      {endpoints.data?.notice ? (
        <div style={{ marginBottom: 14 }}>
          <Notice title="Sample endpoint">{endpoints.data.notice}</Notice>
        </div>
      ) : null}

      {endpoints.loading ? (
        <Panel>
          <PanelSkeleton lines={4} />
        </Panel>
      ) : endpoints.error ? (
        <ErrorState description="Unable to load webhook endpoints." onRetry={endpoints.reload} />
      ) : endpoints.data && endpoints.data.data.length > 0 ? (
        <Panel padded={false}>
          {endpoints.data.data.map((endpoint) => (
            <div className="ds-key-row" key={endpoint.id}>
              <div>
                <p className="ds-key-name">{endpoint.url}</p>
                <p className="ds-key-meta">
                  {endpoint.events.join(' · ')} — created {formatDateTime(endpoint.createdAt)}
                  {endpoint.lastDeliveryAt
                    ? ` · last delivery ${formatRelative(endpoint.lastDeliveryAt)}`
                    : ' · never delivered'}
                </p>
              </div>
              <div className="ds-inline">
                <ToneBadge tone={endpoint.status === 'ACTIVE' ? 'verified' : 'pending'}>
                  {endpoint.status}
                </ToneBadge>
                <button
                  type="button"
                  className="ds-button"
                  data-variant="outline"
                  data-size="sm"
                  disabled={!deliveryAvailable}
                >
                  Disable
                </button>
              </div>
            </div>
          ))}
        </Panel>
      ) : (
        <EmptyState
          icon={<Webhook size={14} />}
          title="No endpoints configured."
          description="Add an endpoint to receive settlement state transitions as they happen."
        />
      )}

      <div className="ds-section">
        <SectionHeading
          title="Events a dispatcher would deliver"
          note="These are the events HandshakeASC actually emits. Every state transition emits exactly one."
        />
        <Panel padded={false}>
          <div className="ds-table-wrap" style={{ border: 0 }}>
            <table className="ds-table">
              <thead>
                <tr>
                  <th scope="col">Event</th>
                  <th scope="col">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(COORDINATOR_EVENT_DESCRIPTIONS).map(([name, description]) => (
                  <tr key={name}>
                    <td className="ds-cell-strong">{name}</td>
                    <td style={{ whiteSpace: 'normal', maxWidth: 520 }}>{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <div className="ds-section">
        <SectionHeading title="Interim approach: poll the coordinator" />
        <CodeBlock code={POLL_EXAMPLE} filename="poll.js" />
      </div>
    </div>
  )
}

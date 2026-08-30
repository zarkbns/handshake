'use client'

import { formatTime } from '@/lib/handshake/format'
import type { ActivityEntry } from '@/lib/handshake/types'

import { StatusBadge, ToneBadge } from './status-badge'

/**
 * Activity stream.
 *
 * `live` reflects whether a real-time transport is actually attached. None is
 * today — the coordinator emits an event for every transition, but the public
 * Creditcoin RPC rejects the log subscription a stream would need. When a
 * WebSocket provider or indexer is wired up, pass fresh `entries` and set
 * `live`; the list then announces new entries to assistive technology. No other
 * change is required.
 */
export function ActivityStream({
  entries,
  live = false,
}: {
  entries: ActivityEntry[]
  live?: boolean
}) {
  return (
    <ul className="ds-feed" aria-live={live ? 'polite' : 'off'} aria-relevant="additions">
      {entries.map((entry) => (
        <li key={entry.id}>
          <span className="ds-feed-time">{formatTime(entry.timestamp)}</span>
          <div>
            <p className="ds-feed-title">{entry.title}</p>
            <p className="ds-feed-detail">{entry.detail}</p>
          </div>
          {entry.status === 'VERIFIED' || entry.status === 'PENDING' ? (
            <ToneBadge tone={entry.status === 'VERIFIED' ? 'verified' : 'pending'}>
              {entry.status}
            </ToneBadge>
          ) : (
            <StatusBadge state={entry.status} />
          )}
        </li>
      ))}
    </ul>
  )
}

export function LiveIndicator({ live }: { live: boolean }) {
  return (
    <span className="ds-live-head">
      <span className="ds-live-dot" data-idle={!live || undefined} aria-hidden="true" />
      {live ? 'Live' : 'Not streaming'}
    </span>
  )
}

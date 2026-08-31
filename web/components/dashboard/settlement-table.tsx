import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { formatDateTime, formatDuration, formatRelative } from '@/lib/handshake/format'
import type { SettlementSummary } from '@/lib/handshake/types'

import { ProofCount, StatusBadge } from './status-badge'

export function RouteCell({
  source,
  destination,
}: {
  source: { shortName: string }
  destination: { shortName: string }
}) {
  return (
    <span className="ds-route">
      {source.shortName}
      <ArrowRight size={10} aria-hidden="true" />
      {destination.shortName}
    </span>
  )
}

/**
 * Settlement table.
 *
 * `timestampFormat` switches between the relative form used on the Overview
 * ("2m ago") and the absolute form used on the full list ("Aug 30, 14:32").
 */
export function SettlementTable({
  rows,
  timestampFormat = 'absolute',
}: {
  rows: SettlementSummary[]
  timestampFormat?: 'absolute' | 'relative'
}) {
  const navigate = useNavigate()

  /**
   * Sample rows have no bytes32 id, so they route by display reference. A chain
   * row routes by its real settlement id. The detail page resolves both.
   */
  const hrefFor = (row: SettlementSummary) =>
    `/dashboard/settlements/${encodeURIComponent(row.settlementId ?? row.reference)}`

  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            <th scope="col">Settlement</th>
            <th scope="col">Route</th>
            <th scope="col">Status</th>
            <th scope="col">Proofs</th>
            <th scope="col">Created</th>
            <th scope="col">Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.reference}
              data-clickable="true"
              tabIndex={0}
              role="link"
              onClick={() => navigate(hrefFor(row))}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  navigate(hrefFor(row))
                }
              }}
            >
              <td className="ds-cell-strong">{row.reference}</td>
              <td>
                <RouteCell source={row.sourceChain} destination={row.destinationChain} />
              </td>
              <td>
                <StatusBadge state={row.state} />
              </td>
              <td>
                <ProofCount
                  verified={row.proofsVerified}
                  required={row.proofsRequired}
                  tone={row.state === 'HELD' ? 'held' : 'settled'}
                />
              </td>
              <td className="ds-cell-numeric">
                {timestampFormat === 'relative'
                  ? formatRelative(row.createdAt)
                  : formatDateTime(row.createdAt)}
              </td>
              <td className="ds-cell-numeric">{formatDuration(row.durationSeconds)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

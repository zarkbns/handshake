import type { ReactNode } from 'react'

import { STATE_DESCRIPTIONS, STATE_LABELS } from '@/lib/handshake/format'
import type { SettlementState } from '@/lib/handshake/types'

/** Coordinator state badge. Colours are desaturated and consistent app-wide. */
export function StatusBadge({ state }: { state: SettlementState }) {
  return (
    <span className="ds-badge" data-state={state} title={STATE_DESCRIPTIONS[state]}>
      {STATE_LABELS[state]}
    </span>
  )
}

export function ToneBadge({
  tone,
  children,
}: {
  tone: 'verified' | 'pending' | 'absent' | 'danger'
  children: ReactNode
}) {
  return (
    <span className="ds-badge" data-tone={tone}>
      {children}
    </span>
  )
}

/**
 * Proof progress, e.g. `2/2`.
 *
 * Ticks fill only for proofs the source actually reports as verified.
 */
export function ProofCount({
  verified,
  required,
  tone = 'settled',
}: {
  verified: number
  required: number
  tone?: 'settled' | 'held'
}) {
  return (
    <span className="ds-proof-count">
      <span className="ds-proof-bar" aria-hidden="true">
        {Array.from({ length: required }, (_, index) => (
          <span
            key={index}
            className="ds-proof-tick"
            data-filled={index < verified || undefined}
            data-tone={tone === 'held' ? 'held' : undefined}
          />
        ))}
      </span>
      <span>
        {verified}/{required}
      </span>
    </span>
  )
}

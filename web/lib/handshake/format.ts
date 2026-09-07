import type { SettlementState } from './types'

/** Fixed reference clock so sample relative times never drift into looking live. */
export const DISPLAY_NOW = Date.UTC(2026, 7, 30, 14, 32, 0) / 1000

export function formatRelative(timestamp: number, now: number = DISPLAY_NOW): string {
  const seconds = Math.max(0, now - timestamp)
  if (seconds < 60) return `${Math.floor(seconds)}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

const DATE_TIME = new Intl.DateTimeFormat('en-GB', {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
})

const TIME_ONLY = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
  timeZone: 'UTC',
})

export function formatDateTime(timestamp: number | null): string {
  if (!timestamp) return '—'
  return DATE_TIME.format(new Date(timestamp * 1000))
}

export function formatTime(timestamp: number | null): string {
  if (!timestamp) return '—'
  return TIME_ONLY.format(new Date(timestamp * 1000))
}

export function formatDuration(seconds: number | null): string {
  if (seconds === null) return '—'
  if (seconds < 60) return `${Math.round(seconds)}s`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    const remainder = Math.round(seconds % 60)
    return remainder > 0 ? `${minutes}m ${remainder}s` : `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainderMinutes = minutes % 60
  return remainderMinutes > 0 ? `${hours}h ${remainderMinutes}m` : `${hours}h`
}

export function formatPercent(ratio: number, digits = 1): string {
  return `${(ratio * 100).toFixed(digits)}%`
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat('en-GB').format(value)
}

export function truncateHash(value: string | null, lead = 10, tail = 8): string {
  if (!value) return '—'
  if (value.length <= lead + tail + 1) return value
  return `${value.slice(0, lead)}…${value.slice(-tail)}`
}

export function truncateAddress(value: string | null): string {
  return truncateHash(value, 6, 4)
}

/** Operator-facing label for a coordinator state. */
export const STATE_LABELS: Record<SettlementState, string> = {
  NONE: 'NONE',
  PREPARE: 'PREPARE',
  READY: 'READY',
  COMMITTED: 'COMMIT',
  SETTLED: 'SETTLED',
  HELD: 'HELD',
}

/** One-line meaning of each state, for tooltips and detail copy. */
export const STATE_DESCRIPTIONS: Record<SettlementState, string> = {
  NONE: 'Not registered on the coordinator.',
  PREPARE: 'Awaiting both legs. Locks remain fully reversible.',
  READY: 'Both legs verified. The bounded commit window is open.',
  COMMITTED: 'Irreversible COMMIT executed on Creditcoin.',
  SETTLED: 'Both native legs finalized and attested.',
  HELD: 'Pre-commit timeout expired. Unilateral refund is available.',
}

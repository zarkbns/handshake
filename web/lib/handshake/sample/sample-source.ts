/**
 * SAMPLE SETTLEMENT SOURCE — NOT CHAIN DATA.
 *
 * ## Why this exists
 *
 * The deployed coordinator (`HandshakeASC`) is keyed by `bytes32` settlement id
 * and exposes no enumeration. Building a list, a metrics roll-up, or an activity
 * feed requires scanning `Prepared`/`Ready`/`Committed`/`Settled`/`Held` logs,
 * and the public Creditcoin testnet RPC rejects any `eth_getLogs` range wider
 * than roughly a thousand blocks with `query timeout of 10 seconds exceeded`.
 * There is no indexer, REST API, or subgraph in the repository. So list-shaped
 * views cannot be served from chain today.
 *
 * ## Safety properties
 *
 * Per AGENTS.md, a mock must be impossible to mistake for a proof-verified
 * state. This module guarantees that:
 *
 *  1. Every record it emits carries `origin: 'sample'`. The real reader in
 *     `chain-reader.ts` only ever emits `origin: 'chain'`.
 *  2. `settlementId` is always `null` here. A sample row therefore has no
 *     bytes32 id and cannot be looked up, linked to, or confused with a real
 *     coordinator record.
 *  3. No transaction hashes, block numbers, or proof commitments are invented.
 *     Those fields are empty or `null` throughout, so the detail view renders
 *     "not available from this source" rather than a plausible-looking hash.
 *  4. `SAMPLE_SOURCE_NOTICE` is rendered by every view backed by this module.
 *
 * This file is imported only by `services.ts` and is unreachable from
 * `chain-reader.ts`. Replacing it means implementing the same service interface
 * against an indexer; no component changes.
 */

import { CREDITCOIN, ETHEREUM_SEPOLIA } from '../chains'
import {
  type ActivityEntry,
  type ActivityPoint,
  type ActivityWindow,
  type ApiKey,
  type MetricsSnapshot,
  type RouteBreakdown,
  type Settlement,
  type SettlementProof,
  type SettlementState,
  type SettlementSummary,
  type WebhookEndpoint,
} from '../types'

export const SAMPLE_SOURCE_NOTICE =
  'Sample data. The coordinator exposes no settlement enumeration and the public testnet RPC cannot serve the log range a list view needs. Look up a settlement by its bytes32 id for a live, verified coordinator read.'

/** Deterministic pseudo-random source so the sample set is stable across renders. */
function seeded(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 0x100000000
  }
}

/**
 * Fixed clock for the sample set.
 *
 * A real timestamp would drift and make sample rows look like a live feed.
 * Anchoring to a constant keeps the data visibly static.
 */
const SAMPLE_EPOCH = Date.UTC(2026, 7, 30, 14, 32, 0) / 1000

const STATE_WEIGHTS: Array<[SettlementState, number]> = [
  ['SETTLED', 0.78],
  ['HELD', 0.07],
  ['COMMITTED', 0.05],
  ['READY', 0.05],
  ['PREPARE', 0.05],
]

function pickState(random: () => number): SettlementState {
  const roll = random()
  let cumulative = 0
  for (const [state, weight] of STATE_WEIGHTS) {
    cumulative += weight
    if (roll < cumulative) return state
  }
  return 'SETTLED'
}

const HELD_REASONS = [
  'Payment escrow proof could not be verified before the PREPARE window expired. No irreversible commit was executed.',
  'The Ethereum Sepolia asset lock did not clear the 12-confirmation finality buffer within the commit window. No irreversible commit was executed.',
  'The counterparty leg was never prepared, so the dual-PREPARE gate was not satisfied. No irreversible commit was executed.',
]

interface SampleRecord extends SettlementSummary {
  heldReason: string | null
}

function buildSampleSet(): SampleRecord[] {
  const random = seeded(1028)
  const records: SampleRecord[] = []
  const count = 96

  for (let index = 0; index < count; index += 1) {
    const state = pickState(random)
    const eastbound = random() > 0.42
    const sourceChain = eastbound ? ETHEREUM_SEPOLIA : CREDITCOIN
    const destinationChain = eastbound ? CREDITCOIN : ETHEREUM_SEPOLIA

    // Spread across ~90 days, newest first.
    const ageSeconds = Math.floor(random() * 90 * 86400 * (index / count + 0.02))
    const createdAt = SAMPLE_EPOCH - ageSeconds

    const proofsVerified =
      state === 'SETTLED' || state === 'COMMITTED'
        ? 2
        : state === 'READY'
          ? 2
          : state === 'HELD'
            ? random() > 0.5
              ? 1
              : 0
            : 1

    const durationSeconds =
      state === 'SETTLED'
        ? 28 + Math.floor(random() * 180)
        : state === 'HELD'
          ? 3600 + Math.floor(random() * 600)
          : null

    records.push({
      reference: `STL-${1028 - index}`,
      settlementId: null,
      state,
      origin: 'sample',
      sourceChain,
      destinationChain,
      proofsVerified,
      proofsRequired: 2,
      createdAt,
      durationSeconds,
      heldReason: state === 'HELD' ? HELD_REASONS[index % HELD_REASONS.length] : null,
    })
  }

  return records.sort((a, b) => b.createdAt - a.createdAt)
}

export const SAMPLE_SETTLEMENTS: SampleRecord[] = buildSampleSet()

/**
 * Expands a sample summary into the detail shape.
 *
 * Proof commitments, transaction hashes, and block numbers stay `null` — the
 * detail view is expected to state that this source cannot supply them.
 */
export function expandSampleSettlement(reference: string): Settlement | null {
  const record = SAMPLE_SETTLEMENTS.find((item) => item.reference === reference)
  if (!record) return null

  const attestedIsSource = record.sourceChain.key === ETHEREUM_SEPOLIA.key
  const stateIndex = ['NONE', 'PREPARE', 'READY', 'COMMITTED', 'SETTLED', 'HELD'].indexOf(
    record.state,
  )
  const reachedReady = record.state !== 'PREPARE' && record.state !== 'HELD'
  const bothPrepared = record.proofsVerified >= 2

  const sampleProof = (
    base: Omit<SettlementProof, 'commitment' | 'inclusionProof' | 'continuityProof' | 'verifiedAt'>,
  ): SettlementProof => ({
    ...base,
    // Never fabricate a commitment hash.
    commitment: null,
    inclusionProof: false,
    continuityProof: false,
    verifiedAt: null,
  })

  return {
    reference: record.reference,
    settlementId: null,
    state: record.state,
    origin: 'sample',
    attestedLeg: {
      kind: 'attested',
      chain: ETHEREUM_SEPOLIA,
      party: null,
      prepared: bothPrepared || (record.proofsVerified === 1 && attestedIsSource),
      commitment: null,
      lock: null,
    },
    nativeLeg: {
      kind: 'native',
      chain: CREDITCOIN,
      party: null,
      prepared: bothPrepared || (record.proofsVerified === 1 && !attestedIsSource),
      commitment: null,
      lock: null,
    },
    prepareTime: record.createdAt,
    readyTime: reachedReady ? record.createdAt + 12 : 0,
    timeoutSeconds: 3600,
    evidenceManifest: null,
    settlementEvidence: null,
    proofs: [
      sampleProof({
        id: 'attested-leg',
        label: 'Ethereum Sepolia asset lock',
        method: 'prepareAttestedLeg',
        status: record.proofsVerified >= 1 ? 'VERIFIED' : 'NOT_SUBMITTED',
        verifiedVia: 'attestcoin',
        sourceChain: ETHEREUM_SEPOLIA,
        note: 'Sample record. Proof commitments are not available from this source.',
      }),
      sampleProof({
        id: 'native-leg',
        label: 'Creditcoin payment lock',
        method: 'prepareNativeLeg',
        status: record.proofsVerified >= 2 ? 'VERIFIED' : 'NOT_SUBMITTED',
        verifiedVia: 'native-state',
        sourceChain: CREDITCOIN,
        note: 'Sample record. Proof commitments are not available from this source.',
      }),
      sampleProof({
        id: 'dual-prepare',
        label: 'Dual-PREPARE quorum attestation',
        method: 'submitProofs',
        status: reachedReady ? 'VERIFIED' : 'NOT_SUBMITTED',
        verifiedVia: 'attestcoin',
        sourceChain: null,
        note: 'Sample record. Proof commitments are not available from this source.',
      }),
      sampleProof({
        id: 'settlement-attestation',
        label: 'Post-COMMIT settlement attestation',
        method: 'settle',
        status: record.state === 'SETTLED' ? 'VERIFIED' : 'NOT_SUBMITTED',
        verifiedVia: 'attestcoin',
        sourceChain: null,
        note: 'Sample record. Proof commitments are not available from this source.',
      }),
    ],
    // No hashes are invented, so this source contributes no transactions.
    transactions: [],
    events: buildSampleEvents(record.state, record.createdAt, stateIndex, bothPrepared),
    heldReason: record.heldReason,
  }
}

function buildSampleEvents(
  state: SettlementState,
  createdAt: number,
  stateIndex: number,
  bothPrepared: boolean,
): Settlement['events'] {
  const events: Settlement['events'] = []
  const push = (name: string, target: SettlementState | null, offset: number, description: string) =>
    events.push({
      id: `${name}-${offset}`,
      name,
      state: target,
      timestamp: createdAt + offset,
      blockNumber: null,
      transactionHash: null,
      description,
    })

  push('Prepared', 'PREPARE', 0, 'First leg registered. Awaiting the counterparty leg.')
  if (bothPrepared) {
    push(
      'CounterpartyPrepared',
      'PREPARE',
      6,
      'Dual-PREPARE gate satisfied. Both legs are locked.',
    )
  }
  if (stateIndex >= 2 && state !== 'HELD') {
    push('Ready', 'READY', 12, 'Both legs verified. The bounded commit window is open.')
  }
  if (stateIndex >= 3 && state !== 'HELD') {
    push(
      'Committed',
      'COMMITTED',
      24,
      'Irreversible COMMIT executed on Creditcoin. Point of no return.',
    )
  }
  if (state === 'SETTLED') {
    push('Settled', 'SETTLED', 42, 'Native-chain finalization attested for both legs.')
  }
  if (state === 'HELD') {
    push('Held', 'HELD', 3600, 'Pre-commit timeout expired. Unilateral refund path is available.')
  }
  return events.reverse()
}

export function sampleMetrics(): MetricsSnapshot {
  const total = SAMPLE_SETTLEMENTS.length
  const settled = SAMPLE_SETTLEMENTS.filter((item) => item.state === 'SETTLED').length
  const held = SAMPLE_SETTLEMENTS.filter((item) => item.state === 'HELD').length
  const inFlight = total - settled - held
  const proofsVerified = SAMPLE_SETTLEMENTS.reduce((sum, item) => sum + item.proofsVerified, 0)
  const failures = SAMPLE_SETTLEMENTS.reduce(
    (sum, item) => sum + (item.state === 'HELD' ? item.proofsRequired - item.proofsVerified : 0),
    0,
  )
  const settledDurations = SAMPLE_SETTLEMENTS.filter(
    (item) => item.state === 'SETTLED' && item.durationSeconds !== null,
  ).map((item) => item.durationSeconds as number)

  return {
    origin: 'sample',
    totalSettlements: total,
    settled,
    held,
    inFlight,
    proofsVerified,
    proofVerificationFailures: failures,
    successRate: total > 0 ? settled / total : 0,
    heldRate: total > 0 ? held / total : 0,
    averageSettlementSeconds:
      settledDurations.length > 0
        ? Math.round(settledDurations.reduce((a, b) => a + b, 0) / settledDurations.length)
        : 0,
  }
}

const WINDOW_DAYS: Record<ActivityWindow, number> = { '7D': 7, '30D': 30, '90D': 90 }

export function sampleActivitySeries(window: ActivityWindow): ActivityPoint[] {
  const days = WINDOW_DAYS[window]
  const buckets = new Map<string, ActivityPoint>()

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date((SAMPLE_EPOCH - offset * 86400) * 1000)
    const key = date.toISOString().slice(0, 10)
    buckets.set(key, { date: key, settled: 0, held: 0, proofsVerified: 0 })
  }

  for (const record of SAMPLE_SETTLEMENTS) {
    const key = new Date(record.createdAt * 1000).toISOString().slice(0, 10)
    const bucket = buckets.get(key)
    if (!bucket) continue
    if (record.state === 'SETTLED') bucket.settled += 1
    if (record.state === 'HELD') bucket.held += 1
    bucket.proofsVerified += record.proofsVerified
  }

  return [...buckets.values()]
}

export function sampleRouteBreakdown(): RouteBreakdown[] {
  const routes = new Map<string, RouteBreakdown>()

  for (const record of SAMPLE_SETTLEMENTS) {
    const key = `${record.sourceChain.key}->${record.destinationChain.key}`
    const existing = routes.get(key) ?? {
      sourceChain: record.sourceChain,
      destinationChain: record.destinationChain,
      total: 0,
      settled: 0,
      held: 0,
      averageSettlementSeconds: 0,
    }
    existing.total += 1
    if (record.state === 'SETTLED') {
      existing.settled += 1
      if (record.durationSeconds !== null) {
        // Running mean over settled rows only.
        existing.averageSettlementSeconds =
          existing.averageSettlementSeconds +
          (record.durationSeconds - existing.averageSettlementSeconds) / existing.settled
      }
    }
    if (record.state === 'HELD') existing.held += 1
    routes.set(key, existing)
  }

  return [...routes.values()]
    .map((route) => ({
      ...route,
      averageSettlementSeconds: Math.round(route.averageSettlementSeconds),
    }))
    .sort((a, b) => b.total - a.total)
}

export function sampleActivityFeed(limit = 12): ActivityEntry[] {
  const entries: ActivityEntry[] = []

  for (const record of SAMPLE_SETTLEMENTS.slice(0, limit)) {
    entries.push({
      id: `${record.reference}-state`,
      origin: 'sample',
      timestamp: record.createdAt + (record.durationSeconds ?? 0),
      kind: 'settlement',
      title: `Settlement ${record.reference}`,
      detail: `${record.sourceChain.shortName} → ${record.destinationChain.shortName}`,
      status: record.state,
      settlementReference: record.reference,
    })
    if (record.proofsVerified > 0) {
      entries.push({
        id: `${record.reference}-proof`,
        origin: 'sample',
        timestamp: record.createdAt + 8,
        kind: 'proof',
        title: 'Proof verified',
        detail:
          record.sourceChain.key === ETHEREUM_SEPOLIA.key
            ? 'Ethereum Sepolia asset lock'
            : 'Creditcoin payment lock',
        status: 'VERIFIED',
        settlementReference: record.reference,
      })
    }
  }

  return entries.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit)
}

/**
 * Sample API keys.
 *
 * Values are masked and structurally invalid — there is no key-issuing service
 * in the repository, so nothing here can authenticate against anything. The
 * Developers view states this explicitly rather than implying a working
 * credential system.
 */
export function sampleApiKeys(): ApiKey[] {
  return [
    {
      id: 'key_local_1',
      name: 'Settlement monitor (read-only)',
      maskedKey: 'hs_test_••••••••••••••••••••••••',
      environment: 'testnet',
      createdAt: SAMPLE_EPOCH - 21 * 86400,
      lastUsedAt: SAMPLE_EPOCH - 2 * 3600,
      status: 'ACTIVE',
    },
    {
      id: 'key_local_2',
      name: 'Relay worker',
      maskedKey: 'hs_test_••••••••••••••••••••••••',
      environment: 'testnet',
      createdAt: SAMPLE_EPOCH - 44 * 86400,
      lastUsedAt: SAMPLE_EPOCH - 6 * 86400,
      status: 'ACTIVE',
    },
    {
      id: 'key_local_3',
      name: 'Retired CI key',
      maskedKey: 'hs_test_••••••••••••••••••••••••',
      environment: 'testnet',
      createdAt: SAMPLE_EPOCH - 90 * 86400,
      lastUsedAt: null,
      status: 'REVOKED',
    },
  ]
}

export function sampleWebhooks(): WebhookEndpoint[] {
  return [
    {
      id: 'wh_local_1',
      url: 'https://ops.example.com/hooks/handshake',
      events: ['Ready', 'Committed', 'Settled', 'Held'],
      status: 'ACTIVE',
      createdAt: SAMPLE_EPOCH - 30 * 86400,
      lastDeliveryAt: SAMPLE_EPOCH - 3600,
    },
  ]
}

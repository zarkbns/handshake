/**
 * Canonical frontend view models for Handshake settlement data.
 *
 * These mirror the on-chain coordinator (`src/HandshakeASC.sol`) and native lock
 * (`src/NativeSettlementLock.sol`) records. They are deliberately decoupled from
 * any single data source so the UI can be powered by a live chain reader, a
 * future indexer/REST API, or the clearly-labelled sample source without any
 * component changes.
 */

/** Coordinator lifecycle state. Ordinals match `IHandshake.State` exactly. */
export const SETTLEMENT_STATES = [
  'NONE',
  'PREPARE',
  'READY',
  'COMMITTED',
  'SETTLED',
  'HELD',
] as const

export type SettlementState = (typeof SETTLEMENT_STATES)[number]

/** Native lock state. Ordinals match `NativeSettlementLock.State` exactly. */
export const LOCK_STATES = ['NONE', 'LOCKED', 'RELEASED', 'REFUNDED'] as const

export type LockState = (typeof LOCK_STATES)[number]

/**
 * Provenance of a rendered value. Every settlement carries this so the UI can
 * never present sample data as a verified on-chain reading.
 */
export type DataOrigin = 'chain' | 'sample'

export interface ChainRef {
  /** EVM chain id. */
  id: number
  /** Registry key, e.g. `creditcoin`. */
  key: string
  /** Display name, e.g. `Creditcoin Testnet`. */
  name: string
  /** Compact display name for dense tables, e.g. `Creditcoin`. */
  shortName: string
}

/** One half of a two-leg DvP settlement. */
export interface SettlementLeg {
  /** `attested` = proven through Attestcoin. `native` = read directly on Creditcoin. */
  kind: 'attested' | 'native'
  chain: ChainRef
  /** Party that locked this leg, if known. */
  party: string | null
  /** Whether the coordinator has recorded this leg as prepared. */
  prepared: boolean
  /**
   * Coordinator's stored prepare commitment for this leg.
   * `attestedCommit` / `nativeCommit` in `HandshakeASC`.
   */
  commitment: string | null
  /** Source-chain lock record, when the lock contract is readable. */
  lock: {
    state: LockState
    token: string
    depositor: string
    recipient: string
    amount: string
    expiry: number
  } | null
}

/** A verification step recorded by the coordinator. */
export interface SettlementProof {
  id: string
  /** Human label, e.g. `Ethereum Sepolia asset lock`. */
  label: string
  /** Which coordinator call consumed this proof. */
  method: 'prepareAttestedLeg' | 'prepareNativeLeg' | 'submitProofs' | 'settle'
  status: 'VERIFIED' | 'PENDING' | 'NOT_SUBMITTED'
  /** How the proof was checked. Attestcoin quorum vs. direct same-chain read. */
  verifiedVia: 'attestcoin' | 'native-state'
  sourceChain: ChainRef | null
  /** Keccak commitment the coordinator stored, when one exists on chain. */
  commitment: string | null
  /** Whether an Attestcoin Merkle inclusion proof is part of this check. */
  inclusionProof: boolean
  /** Whether an Attestcoin continuity proof is part of this check. */
  continuityProof: boolean
  /** Unix seconds. Only set when the chain records a timestamp for this step. */
  verifiedAt: number | null
  /** Explanatory note shown when a proof is absent or unverifiable. */
  note?: string
}

/** An on-chain transaction related to the settlement. */
export interface SettlementTransaction {
  id: string
  label: string
  chain: ChainRef
  hash: string | null
  blockNumber: number | null
  timestamp: number | null
}

/** A coordinator event emitted for the settlement. */
export interface SettlementEvent {
  id: string
  /** Solidity event name: Prepared, CounterpartyPrepared, Ready, Committed, Settled, Held. */
  name: string
  /** State the settlement entered as a result, when the event is a transition. */
  state: SettlementState | null
  timestamp: number | null
  blockNumber: number | null
  transactionHash: string | null
  description: string
}

export interface Settlement {
  /** Display reference, e.g. `STL-1028` for samples or a shortened id for chain reads. */
  reference: string
  /** Canonical bytes32 settlement id when known; sample rows have none. */
  settlementId: string | null
  state: SettlementState
  origin: DataOrigin
  attestedLeg: SettlementLeg
  nativeLeg: SettlementLeg
  /** Unix seconds the settlement entered PREPARE. `0` when unset on chain. */
  prepareTime: number
  /** Unix seconds the settlement entered READY. `0` when unset on chain. */
  readyTime: number
  /** Coordinator timeout window in seconds (`HandshakeASC.TIMEOUT`). */
  timeoutSeconds: number
  /** Evidence manifest hash binding both prepare proofs and the attestation. */
  evidenceManifest: string | null
  /** Post-COMMIT settlement attestation hash. */
  settlementEvidence: string | null
  proofs: SettlementProof[]
  transactions: SettlementTransaction[]
  events: SettlementEvent[]
  /** Why a settlement is HELD, in operator-readable terms. */
  heldReason: string | null
}

/** Compact row shape used by list and table views. */
export interface SettlementSummary {
  reference: string
  settlementId: string | null
  state: SettlementState
  origin: DataOrigin
  sourceChain: ChainRef
  destinationChain: ChainRef
  proofsVerified: number
  proofsRequired: number
  createdAt: number
  /** Seconds from PREPARE to terminal state, or to now while in flight. */
  durationSeconds: number | null
}

export interface MetricsSnapshot {
  origin: DataOrigin
  totalSettlements: number
  settled: number
  held: number
  inFlight: number
  proofsVerified: number
  proofVerificationFailures: number
  /** 0–1. */
  successRate: number
  /** 0–1. */
  heldRate: number
  /** Mean PREPARE-to-SETTLED time in seconds across terminal settlements. */
  averageSettlementSeconds: number
}

export interface ActivityPoint {
  /** ISO date, `YYYY-MM-DD`. */
  date: string
  settled: number
  held: number
  proofsVerified: number
}

export interface RouteBreakdown {
  sourceChain: ChainRef
  destinationChain: ChainRef
  total: number
  settled: number
  held: number
  /** Mean settlement time in seconds for this route. */
  averageSettlementSeconds: number
}

export type ActivityWindow = '7D' | '30D' | '90D'

export interface ActivityEntry {
  id: string
  origin: DataOrigin
  timestamp: number
  kind: 'settlement' | 'proof'
  title: string
  detail: string
  status: SettlementState | 'VERIFIED' | 'PENDING'
  settlementReference: string | null
}

export interface ApiKey {
  id: string
  name: string
  /** Masked at rest. The full secret is never stored client-side. */
  maskedKey: string
  environment: 'testnet' | 'mainnet'
  createdAt: number
  lastUsedAt: number | null
  status: 'ACTIVE' | 'REVOKED'
}

export interface WebhookEndpoint {
  id: string
  url: string
  events: string[]
  status: 'ACTIVE' | 'PAUSED'
  createdAt: number
  lastDeliveryAt: number | null
}

export interface SettlementQuery {
  search?: string
  state?: SettlementState | 'ALL'
  sourceChainKey?: string
  destinationChainKey?: string
  /** Inclusive lower bound, unix seconds. */
  since?: number
  sort?: 'newest' | 'oldest' | 'longest' | 'shortest'
  page?: number
  pageSize?: number
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  pageCount: number
}

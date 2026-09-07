import { Contract, JsonRpcProvider, isHexString, ZeroAddress } from 'ethers'

import { COORDINATOR_EVENT_DESCRIPTIONS, COORDINATOR_READ_ABI, LOCK_READ_ABI } from './abi'
import {
  COORDINATOR_TIMEOUT_SECONDS,
  CREDITCOIN,
  ETHEREUM_SEPOLIA,
  readPublicChainConfig,
  type PublicChainConfig,
} from './chains'
import {
  LOCK_STATES,
  SETTLEMENT_STATES,
  type LockState,
  type Settlement,
  type SettlementEvent,
  type SettlementLeg,
  type SettlementProof,
  type SettlementState,
  type SettlementTransaction,
} from './types'

const ZERO_BYTES32 = `0x${'0'.repeat(64)}`

export class ChainReadUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ChainReadUnavailableError'
  }
}

export class SettlementNotFoundError extends Error {
  readonly settlementId: string

  constructor(settlementId: string) {
    super(`No settlement is registered on the coordinator under ${settlementId}.`)
    this.name = 'SettlementNotFoundError'
    this.settlementId = settlementId
  }
}

/** A bytes32 settlement id, as produced by `SettlementId.derive`. */
export function isSettlementId(value: string): boolean {
  return isHexString(value, 32)
}

function providerFor(rpcUrl: string): JsonRpcProvider {
  return new JsonRpcProvider(rpcUrl, undefined, { staticNetwork: true })
}

function nonZeroAddress(value: string): string | null {
  return value && value !== ZeroAddress ? value : null
}

function nonZeroHash(value: string): string | null {
  return value && value !== ZERO_BYTES32 ? value : null
}

function toState(ordinal: number): SettlementState {
  return SETTLEMENT_STATES[ordinal] ?? 'NONE'
}

function toLockState(ordinal: number): LockState {
  return LOCK_STATES[ordinal] ?? 'NONE'
}

async function readLock(
  rpcUrl: string | null,
  address: string | null,
  settlementId: string,
): Promise<SettlementLeg['lock']> {
  if (!rpcUrl || !address) return null
  try {
    const contract = new Contract(address, LOCK_READ_ABI, providerFor(rpcUrl))
    const record = await contract.locks(settlementId)
    const state = toLockState(Number(record[0]))
    if (state === 'NONE') return null
    return {
      state,
      token: record[1] as string,
      depositor: record[2] as string,
      recipient: record[3] as string,
      amount: (record[4] as bigint).toString(),
      expiry: Number(record[5]),
    }
  } catch {
    // A lock read failure must never mask the coordinator record, which is the
    // authoritative source for settlement state.
    return null
  }
}

/**
 * Builds the proof list from what the coordinator actually recorded.
 *
 * Nothing here is invented: a proof is only reported VERIFIED when the
 * coordinator holds a non-zero commitment for it, because `HandshakeASC` writes
 * those commitments strictly after the leg verification passes (the attested
 * leg through the Attestcoin precompile check, the native leg against the
 * Creditcoin lock state).
 */
function buildProofs(
  state: SettlementState,
  attestedCommit: string | null,
  nativeCommit: string | null,
  manifest: string | null,
  settlementEvidence: string | null,
  readyTime: number,
): SettlementProof[] {
  const reached = (target: SettlementState) =>
    SETTLEMENT_STATES.indexOf(state) >= SETTLEMENT_STATES.indexOf(target)

  const proofs: SettlementProof[] = [
    {
      id: 'attested-leg',
      label: 'Ethereum Sepolia asset lock',
      method: 'prepareAttestedLeg',
      status: attestedCommit ? 'VERIFIED' : 'NOT_SUBMITTED',
      verifiedVia: 'attestcoin',
      sourceChain: ETHEREUM_SEPOLIA,
      commitment: attestedCommit,
      inclusionProof: Boolean(attestedCommit),
      continuityProof: Boolean(attestedCommit),
      verifiedAt: null,
      note: attestedCommit
        ? undefined
        : 'The Attestcoin inclusion and continuity proof for the Ethereum leg has not been accepted by the coordinator.',
    },
    {
      id: 'native-leg',
      label: 'Creditcoin payment lock',
      method: 'prepareNativeLeg',
      status: nativeCommit ? 'VERIFIED' : 'NOT_SUBMITTED',
      verifiedVia: 'native-state',
      sourceChain: CREDITCOIN,
      commitment: nativeCommit,
      // The native leg lives on the coordinator's own chain and is checked by
      // reading lock state directly, so no Attestcoin proof is involved.
      inclusionProof: false,
      continuityProof: false,
      verifiedAt: null,
      note: nativeCommit
        ? 'Verified by reading the Creditcoin lock directly. No Attestcoin proof is required on the coordinator’s own chain.'
        : 'The coordinator has not confirmed a LOCKED position for this leg on the Creditcoin lock.',
    },
    {
      id: 'dual-prepare',
      label: 'Dual-verified legs gate',
      method: 'ready',
      status: manifest ? 'VERIFIED' : reached('READY') ? 'PENDING' : 'NOT_SUBMITTED',
      verifiedVia: 'coordinator',
      sourceChain: null,
      commitment: manifest,
      inclusionProof: false,
      continuityProof: false,
      verifiedAt: manifest && readyTime > 0 ? readyTime : null,
      note: manifest
        ? undefined
        : 'READY opens automatically once both legs have been individually verified — the attested leg by an Attestcoin inclusion + continuity proof, the native leg against Creditcoin lock state. There is no separate aggregate-attestation step.',
    },
    {
      id: 'settlement-attestation',
      label: 'Finalization evidence record',
      method: 'settle',
      status: settlementEvidence
        ? 'VERIFIED'
        : state === 'COMMITTED'
          ? 'PENDING'
          : 'NOT_SUBMITTED',
      verifiedVia: 'coordinator',
      sourceChain: null,
      commitment: settlementEvidence,
      inclusionProof: false,
      continuityProof: false,
      verifiedAt: null,
      note: settlementEvidence
        ? undefined
        : 'Evidence recording after both native legs deliver post-COMMIT. Release authorization itself lives in the native locks.',
    },
  ]

  return proofs
}

/**
 * Derives the lifecycle event trail from coordinator state.
 *
 * Timestamps come from the two timestamps the coordinator actually stores
 * (`prepareTime`, `readyTime`). Transitions with no stored timestamp report
 * `null` rather than a guess.
 */
function buildEvents(
  state: SettlementState,
  prepareTime: number,
  readyTime: number,
  bothPrepared: boolean,
): SettlementEvent[] {
  const index = SETTLEMENT_STATES.indexOf(state)
  const events: SettlementEvent[] = []

  const push = (name: string, target: SettlementState | null, timestamp: number | null) => {
    events.push({
      id: `${name}-${timestamp ?? 'unknown'}`,
      name,
      state: target,
      timestamp,
      blockNumber: null,
      transactionHash: null,
      description: COORDINATOR_EVENT_DESCRIPTIONS[name] ?? '',
    })
  }

  if (index >= SETTLEMENT_STATES.indexOf('PREPARE')) {
    push('Prepared', 'PREPARE', prepareTime > 0 ? prepareTime : null)
    if (bothPrepared) push('CounterpartyPrepared', 'PREPARE', null)
  }
  if (index >= SETTLEMENT_STATES.indexOf('READY') && state !== 'HELD') {
    push('Ready', 'READY', readyTime > 0 ? readyTime : null)
  }
  if (index >= SETTLEMENT_STATES.indexOf('COMMITTED') && state !== 'HELD') {
    push('Committed', 'COMMITTED', null)
  }
  if (state === 'SETTLED') push('Settled', 'SETTLED', null)
  if (state === 'HELD') push('Held', 'HELD', null)

  return events
}

function buildTransactions(lock: SettlementLeg['lock'], chainKey: string): SettlementTransaction[] {
  // Transaction hashes require either an event-log scan or an indexer. The
  // public Creditcoin RPC times out on wide `eth_getLogs` ranges, so a
  // single-id lookup cannot recover them. We surface the lock record without
  // fabricating a hash.
  void lock
  void chainKey
  return []
}

function heldExplanation(
  attestedCommit: string | null,
  nativeCommit: string | null,
  manifest: string | null,
): string {
  if (!attestedCommit && !nativeCommit) {
    return 'Neither leg was verified before the PREPARE window expired. No irreversible commit was executed.'
  }
  if (!attestedCommit) {
    return 'The Ethereum Sepolia asset lock could not be verified through Attestcoin before the PREPARE window expired. No irreversible commit was executed.'
  }
  if (!nativeCommit) {
    return 'The Creditcoin payment lock was not confirmed before the PREPARE window expired. No irreversible commit was executed.'
  }
  if (!manifest) {
    return 'Both legs were prepared but the dual-PREPARE quorum attestation was not accepted before the window expired. No irreversible commit was executed.'
  }
  return 'The settlement reached READY but COMMIT was not executed within the bounded commit window. No irreversible commit was executed.'
}

export interface ChainSettlementLookup {
  settlement: Settlement
  /** Chain height at read time, for a freshness indicator. */
  blockNumber: number
}

/**
 * Reads one settlement directly from the deployed coordinator on Creditcoin.
 *
 * This is the live, verifiable path: every field returned traces to a
 * `getHandshake` / `locks` storage read. It requires only a settlement id
 * because the coordinator is keyed by id and the public RPC cannot serve the
 * wide log queries a list view would need.
 */
export async function readSettlementFromChain(
  settlementId: string,
  config: PublicChainConfig = readPublicChainConfig(),
): Promise<ChainSettlementLookup> {
  if (!isSettlementId(settlementId)) {
    throw new TypeError('A settlement id must be a 32-byte hex value.')
  }
  if (!config.creditcoinRpcUrl || !config.coordinatorAddress) {
    throw new ChainReadUnavailableError(
      'Live coordinator reads need NEXT_PUBLIC_CREDITCOIN_RPC_URL and NEXT_PUBLIC_HANDSHAKE_ASC_ADDRESS.',
    )
  }

  const provider = providerFor(config.creditcoinRpcUrl)
  const coordinator = new Contract(config.coordinatorAddress, COORDINATOR_READ_ABI, provider)

  const [record, blockNumber] = await Promise.all([
    coordinator.handshakes(settlementId),
    provider.getBlockNumber(),
  ])

  const state = toState(Number(record[0]))
  if (state === 'NONE') throw new SettlementNotFoundError(settlementId)

  const attestedParty = nonZeroAddress(record[1] as string)
  const nativeParty = nonZeroAddress(record[2] as string)
  const prepareTime = Number(record[3])
  const readyTime = Number(record[4])
  const attestedCommit = nonZeroHash(record[5] as string)
  const nativeCommit = nonZeroHash(record[6] as string)
  const manifest = nonZeroHash(record[7] as string)
  const settlementEvidence = nonZeroHash(record[8] as string)
  const attestedPrepared = Boolean(record[9])
  const nativePrepared = Boolean(record[10])

  const [attestedLock, nativeLock] = await Promise.all([
    readLock(config.ethereumSepoliaRpcUrl, config.ethereumLockAddress, settlementId),
    readLock(config.creditcoinRpcUrl, config.creditcoinLockAddress, settlementId),
  ])

  const timeoutSeconds = await coordinator
    .TIMEOUT()
    .then((value: bigint) => Number(value))
    .catch(() => COORDINATOR_TIMEOUT_SECONDS)

  const settlement: Settlement = {
    reference: `${settlementId.slice(0, 10)}…${settlementId.slice(-6)}`,
    settlementId,
    state,
    origin: 'chain',
    attestedLeg: {
      kind: 'attested',
      chain: ETHEREUM_SEPOLIA,
      party: attestedParty,
      prepared: attestedPrepared,
      commitment: attestedCommit,
      lock: attestedLock,
    },
    nativeLeg: {
      kind: 'native',
      chain: CREDITCOIN,
      party: nativeParty,
      prepared: nativePrepared,
      commitment: nativeCommit,
      lock: nativeLock,
    },
    prepareTime,
    readyTime,
    timeoutSeconds,
    evidenceManifest: manifest,
    settlementEvidence,
    proofs: buildProofs(
      state,
      attestedCommit,
      nativeCommit,
      manifest,
      settlementEvidence,
      readyTime,
    ),
    transactions: [
      ...buildTransactions(attestedLock, ETHEREUM_SEPOLIA.key),
      ...buildTransactions(nativeLock, CREDITCOIN.key),
    ],
    events: buildEvents(state, prepareTime, readyTime, attestedPrepared && nativePrepared),
    heldReason:
      state === 'HELD' ? heldExplanation(attestedCommit, nativeCommit, manifest) : null,
  }

  return { settlement, blockNumber }
}

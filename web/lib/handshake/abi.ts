/**
 * Read-only ABI fragments for the deployed Handshake contracts.
 *
 * Copied verbatim from the backend's canonical definitions so the frontend
 * cannot drift from them:
 *   - coordinator: `scripts/coordinator-client.js` (COORDINATOR_ABI)
 *   - lock:        `scripts/demo-lock.js` (LOCK_ABI) / `src/NativeSettlementLock.sol`
 *
 * Only view functions and events are included. The dashboard is a read-only
 * operator surface: it never drives settlement, per the frontend note in
 * README.md. Write fragments are intentionally omitted so no UI path can
 * accidentally submit a state transition.
 */

export const COORDINATOR_READ_ABI = [
  'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
  'function isCommitted(bytes32 id) view returns (bool)',
  'function evidenceManifest(bytes32 id) view returns (bytes32)',
  'function handshakes(bytes32) view returns (uint8 state, address attestedParty, address nativeParty, uint256 prepareTime, uint256 readyTime, bytes32 attestedCommit, bytes32 nativeCommit, bytes32 evidenceManifest, bytes32 settlementEvidence, bool attestedPrepared, bool nativePrepared)',
  'function TIMEOUT() view returns (uint256)',
  'event Prepared(bytes32 indexed id)',
  'event CounterpartyPrepared(bytes32 indexed id)',
  'event Ready(bytes32 indexed id)',
  'event Committed(bytes32 indexed id)',
  'event Settled(bytes32 indexed id)',
  'event Held(bytes32 indexed id)',
] as const

export const LOCK_READ_ABI = [
  'function locks(bytes32) view returns (uint8 state, address token, address depositor, address recipient, uint256 amount, uint256 expiry)',
  'event Locked(bytes32 indexed settlementId, address indexed token, address indexed depositor, address recipient, uint256 amount, uint256 expiry)',
  'event Released(bytes32 indexed settlementId, address indexed recipient, uint256 amount)',
  'event Refunded(bytes32 indexed settlementId, address indexed depositor, uint256 amount)',
] as const

/** Coordinator events in lifecycle order, with operator-facing descriptions. */
export const COORDINATOR_EVENT_DESCRIPTIONS: Record<string, string> = {
  Prepared: 'First leg registered. Awaiting the counterparty leg.',
  CounterpartyPrepared: 'Dual-PREPARE gate satisfied. Both legs are locked.',
  Ready: 'Both legs verified. The bounded commit window is open.',
  Committed: 'Irreversible COMMIT executed on Creditcoin. Point of no return.',
  Settled: 'Native-chain finalization attested for both legs.',
  Held: 'Pre-commit timeout expired. Unilateral refund path is available.',
}

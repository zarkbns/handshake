import { SETTLEMENT_STATES, type Settlement, type SettlementState } from './types'

/**
 * Settlement lifecycle stage derivation.
 *
 * Pure so the invariant that matters can be asserted directly: a HELD
 * settlement must never present COMMIT or SETTLED as reached. That is the
 * protocol's central claim — nothing becomes irreversible without a Creditcoin
 * COMMIT — and the UI must not contradict it.
 *
 * Stages mirror the real path in `HandshakeASC`:
 *   PREPARE → READY → FRESH VERIFICATION → COMMIT → SETTLED
 *
 * "Fresh verification" is the bounded window between `Ready` and `commit`:
 * `commit` reverts with `CommitWindowExpired` once `readyTime + TIMEOUT` has
 * passed, so the settlement must still be valid inside that window. It is a
 * real gate, not decoration.
 */

export type StageStatus = 'done' | 'current' | 'pending' | 'failed'

export interface LifecycleStage {
  key: string
  name: string
  note: string
  status: StageStatus
  timestamp: number | null
}

export function buildLifecycleStages(settlement: Settlement): LifecycleStage[] {
  const { state } = settlement
  const index = SETTLEMENT_STATES.indexOf(state)
  const reached = (target: SettlementState) => index >= SETTLEMENT_STATES.indexOf(target)

  if (state === 'HELD') {
    // Locate the failure point. `evidenceManifest` is written when the second
    // verified prepare lands READY, so its presence means READY was reached and
    // COMMIT timed out instead of leg verification failing.
    const reachedReady = Boolean(settlement.evidenceManifest)
    const bothPrepared = settlement.attestedLeg.prepared && settlement.nativeLeg.prepared

    return [
      {
        key: 'prepare',
        name: 'Prepare',
        note: bothPrepared
          ? 'Both legs registered locks under this settlement id.'
          : 'Only one leg was registered. The dual-PREPARE gate was never satisfied.',
        status: 'done',
        timestamp: settlement.prepareTime || null,
      },
      {
        key: 'ready',
        name: 'Ready',
        note: reachedReady
          ? 'Both leg commitments were bound in a single attestation quorum.'
          : 'Not reached. READY requires both legs verified in one attestation quorum.',
        status: reachedReady ? 'done' : 'pending',
        timestamp: reachedReady ? settlement.readyTime || null : null,
      },
      {
        key: 'verification-failed',
        name: reachedReady ? 'Commit window expired' : 'Verification failed',
        note: reachedReady
          ? 'The bounded commit window closed before COMMIT was called.'
          : 'The required proofs were not accepted inside the PREPARE window.',
        status: 'failed',
        timestamp: null,
      },
      {
        key: 'held',
        name: 'Held',
        /**
         * The recovery sentence is always appended, even when a specific reason
         * is known. A HELD stage must never be readable without stating that
         * refund is unilateral — that guarantee is the point of the state, and
         * it should not depend on which component the operator happens to be
         * looking at.
         */
        note: `${
          settlement.heldReason ?? 'Timeout reached without COMMIT.'
        } The unilateral refund path is open and requires no attestor cooperation.`,
        status: 'failed',
        timestamp: null,
      },
    ]
  }

  return [
    {
      key: 'prepare',
      name: 'Prepare',
      note:
        settlement.attestedLeg.prepared && settlement.nativeLeg.prepared
          ? 'Both legs locked under this settlement id. Locks remain fully reversible.'
          : 'Awaiting the counterparty leg. The dual-PREPARE gate is not yet satisfied.',
      status: reached('READY') ? 'done' : 'current',
      timestamp: settlement.prepareTime || null,
    },
    {
      key: 'ready',
      name: 'Ready',
      note: 'Both leg commitments verified in a single attestation quorum.',
      status: reached('READY') ? 'done' : 'pending',
      timestamp: settlement.readyTime || null,
    },
    {
      key: 'fresh-verification',
      name: 'Fresh verification',
      note: `Bounded window of ${Math.round(settlement.timeoutSeconds / 60)} minutes in which COMMIT stays callable. Source-chain finality buffers must clear first.`,
      status: reached('COMMITTED') ? 'done' : reached('READY') ? 'current' : 'pending',
      timestamp: null,
    },
    {
      key: 'commit',
      name: 'Commit',
      note: 'Irreversible settlement authorization on Creditcoin. Nothing on a source chain becomes final before this point.',
      status: reached('COMMITTED') ? 'done' : 'pending',
      timestamp: null,
    },
    {
      key: 'settled',
      name: 'Settled',
      note: 'Both native legs delivered and the finalization attestation recorded.',
      status: state === 'SETTLED' ? 'done' : reached('COMMITTED') ? 'current' : 'pending',
      timestamp: null,
    },
  ]
}

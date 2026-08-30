// Asserts the settlement-safety invariants the UI must never contradict.
import { buildLifecycleStages } from '../lib/handshake/lifecycle.ts'
import { CREDITCOIN, ETHEREUM_SEPOLIA } from '../lib/handshake/chains.ts'
import type { Settlement, SettlementState } from '../lib/handshake/types.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = '') => {
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

function make(state: SettlementState, overrides: Partial<Settlement> = {}): Settlement {
  return {
    reference: 'TEST',
    settlementId: null,
    state,
    origin: 'chain',
    attestedLeg: { kind: 'attested', chain: ETHEREUM_SEPOLIA, party: null, prepared: true, commitment: null, lock: null },
    nativeLeg: { kind: 'native', chain: CREDITCOIN, party: null, prepared: true, commitment: null, lock: null },
    prepareTime: 1_700_000_000,
    readyTime: 1_700_000_060,
    timeoutSeconds: 3600,
    evidenceManifest: null,
    settlementEvidence: null,
    proofs: [],
    transactions: [],
    events: [],
    heldReason: null,
    ...overrides,
  }
}

const stageStatus = (settlement: Settlement, key: string) =>
  buildLifecycleStages(settlement).find((s) => s.key === key)?.status

// --- INVARIANT: a HELD settlement never shows COMMIT or SETTLED as reached ----
for (const variant of [
  { name: 'HELD before READY', s: make('HELD', { evidenceManifest: null }) },
  { name: 'HELD after READY', s: make('HELD', { evidenceManifest: '0xabc' }) },
  { name: 'HELD with one leg only', s: make('HELD', { nativeLeg: { ...make('HELD').nativeLeg, prepared: false } }) },
]) {
  const stages = buildLifecycleStages(variant.s)
  const keys = stages.map((st) => st.key)
  check(`${variant.name}: no commit stage rendered`, !keys.includes('commit'))
  check(`${variant.name}: no settled stage rendered`, !keys.includes('settled'))
  check(`${variant.name}: no stage claims done past the failure`, stages.filter((st) => st.status === 'done').every((st) => st.key === 'prepare' || st.key === 'ready'))
  check(`${variant.name}: terminal stage is held and failed`, stages.at(-1)?.key === 'held' && stages.at(-1)?.status === 'failed')
}

// A HELD-after-READY settlement should attribute the failure to the commit
// window, not to proof verification.
const heldLate = buildLifecycleStages(make('HELD', { evidenceManifest: '0xabc' }))
check('HELD after READY blames the commit window', heldLate.some((s) => s.name === 'Commit window expired'))
check('HELD after READY marks READY done', heldLate.find((s) => s.key === 'ready')?.status === 'done')

const heldEarly = buildLifecycleStages(make('HELD'))
check('HELD before READY blames verification', heldEarly.some((s) => s.name === 'Verification failed'))
check('HELD before READY leaves READY pending', heldEarly.find((s) => s.key === 'ready')?.status === 'pending')

// --- INVARIANT: COMMIT is only ever done once SETTLED is reached --------------
check('PREPARE leaves commit pending', stageStatus(make('PREPARE'), 'commit') === 'pending')
// At READY the active gate is fresh verification; COMMIT is not yet callable-as-done.
check('READY leaves commit pending', stageStatus(make('READY'), 'commit') === 'pending')
check('READY makes fresh verification the current gate', stageStatus(make('READY'), 'fresh-verification') === 'current')
check('COMMITTED marks commit done', stageStatus(make('COMMITTED'), 'commit') === 'done')
check('COMMITTED leaves settled current, not done', stageStatus(make('COMMITTED'), 'settled') === 'current')
check('SETTLED marks commit done', stageStatus(make('SETTLED'), 'commit') === 'done')

// --- Progressive monotonicity -------------------------------------------------
const order: SettlementState[] = ['PREPARE', 'READY', 'COMMITTED', 'SETTLED']
let previousDone = -1
for (const state of order) {
  const doneCount = buildLifecycleStages(make(state)).filter((s) => s.status === 'done').length
  check(`${state}: done count does not regress`, doneCount >= previousDone, `${doneCount} done`)
  previousDone = doneCount
}
check('SETTLED marks every stage done', buildLifecycleStages(make('SETTLED')).every((s) => s.status === 'done'))
check('PREPARE marks nothing done', buildLifecycleStages(make('PREPARE')).every((s) => s.status !== 'done'))

// --- Fresh verification is a real gate, present on the happy path -------------
check('happy path includes fresh verification', buildLifecycleStages(make('READY')).some((s) => s.key === 'fresh-verification'))
check('fresh verification cites the timeout window', buildLifecycleStages(make('READY')).find((s) => s.key === 'fresh-verification')?.note.includes('60 minutes') === true)

// --- Dual-PREPARE gate is reflected -------------------------------------------
const oneLeg = make('PREPARE', { nativeLeg: { ...make('PREPARE').nativeLeg, prepared: false } })
check('single prepared leg says the gate is unsatisfied', buildLifecycleStages(oneLeg).find((s) => s.key === 'prepare')?.note.includes('not yet satisfied') === true)

// --- HELD note always carries both the reason and the recovery guarantee ------
// The recovery sentence is appended rather than replaced: a HELD stage must
// never be readable without stating that refund is unilateral.
const reason = 'Payment escrow proof could not be verified.'
const withReason = buildLifecycleStages(make('HELD', { heldReason: reason })).at(-1)?.note ?? ''
check('held reason is surfaced', withReason.includes(reason))
check('held reason still states refund is unilateral', withReason.includes('unilateral refund path'))
check('held reason still states no attestor needed', withReason.includes('no attestor cooperation'))

const withoutReason = buildLifecycleStages(make('HELD')).at(-1)?.note ?? ''
check('held falls back to a safe default', withoutReason.includes('Timeout reached without COMMIT'))
check('default held note states refund is unilateral', withoutReason.includes('unilateral refund path'))
check('default held note states no attestor needed', withoutReason.includes('no attestor cooperation'))

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)

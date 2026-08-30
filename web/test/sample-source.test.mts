// Node 24 strips types natively. Verifies the sample source's safety properties
// and the query/pagination logic without a browser.
import {
  SAMPLE_SETTLEMENTS,
  expandSampleSettlement,
  sampleMetrics,
  sampleActivitySeries,
  sampleRouteBreakdown,
  sampleActivityFeed,
} from '../lib/handshake/sample/sample-source.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = '') => {
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

check('sample set is populated', SAMPLE_SETTLEMENTS.length === 96, `${SAMPLE_SETTLEMENTS.length} rows`)
check('every row is origin=sample', SAMPLE_SETTLEMENTS.every((r) => r.origin === 'sample'))
check('no row has a settlementId', SAMPLE_SETTLEMENTS.every((r) => r.settlementId === null))
check('rows are sorted newest first', SAMPLE_SETTLEMENTS.every((r, i, a) => i === 0 || a[i - 1].createdAt >= r.createdAt))
check('references are unique', new Set(SAMPLE_SETTLEMENTS.map((r) => r.reference)).size === SAMPLE_SETTLEMENTS.length)

const held = SAMPLE_SETTLEMENTS.filter((r) => r.state === 'HELD')
check('HELD rows all carry a reason', held.length > 0 && held.every((r) => Boolean(r.heldReason)), `${held.length} held`)
check('HELD rows never show full proof coverage', held.every((r) => r.proofsVerified < r.proofsRequired))

const settled = SAMPLE_SETTLEMENTS.filter((r) => r.state === 'SETTLED')
check('SETTLED rows show full proof coverage', settled.every((r) => r.proofsVerified === r.proofsRequired))
check('SETTLED rows have a duration', settled.every((r) => r.durationSeconds !== null))

const detail = expandSampleSettlement('STL-1028')
check('detail expands', detail !== null)
if (detail) {
  check('detail has no settlementId', detail.settlementId === null)
  check('detail invents no proof commitments', detail.proofs.every((p) => p.commitment === null))
  check('detail invents no inclusion/continuity claims', detail.proofs.every((p) => !p.inclusionProof && !p.continuityProof))
  check('detail invents no transactions', detail.transactions.length === 0)
  check('detail events carry no tx hash or block', detail.events.every((e) => e.transactionHash === null && e.blockNumber === null))
  check('detail has no evidence hashes', detail.evidenceManifest === null && detail.settlementEvidence === null)
}

const heldDetail = expandSampleSettlement(held[0].reference)
check('HELD detail never reaches COMMITTED/SETTLED', heldDetail !== null && !heldDetail.events.some((e) => e.state === 'COMMITTED' || e.state === 'SETTLED'))
check('HELD detail emits a Held event', heldDetail !== null && heldDetail.events.some((e) => e.name === 'Held'))

check('unknown reference returns null', expandSampleSettlement('STL-99999') === null)

const m = sampleMetrics()
check('metrics origin is sample', m.origin === 'sample')
check('metrics totals reconcile', m.settled + m.held + m.inFlight === m.totalSettlements, `${m.settled}+${m.held}+${m.inFlight}=${m.totalSettlements}`)
check('success rate matches counts', Math.abs(m.successRate - m.settled / m.totalSettlements) < 1e-9)
check('held rate matches counts', Math.abs(m.heldRate - m.held / m.totalSettlements) < 1e-9)
check('avg settlement time is plausible', m.averageSettlementSeconds > 0 && m.averageSettlementSeconds < 3600, `${m.averageSettlementSeconds}s`)

for (const w of ['7D', '30D', '90D'] as const) {
  const s = sampleActivitySeries(w)
  const expect = Number(w.replace('D', ''))
  check(`activity series ${w} bucket count`, s.length === expect, `${s.length} buckets`)
  check(`activity series ${w} has data`, s.some((p) => p.settled + p.held + p.proofsVerified > 0))
}

const routes = sampleRouteBreakdown()
check('routes cover both directions', routes.length === 2, `${routes.length} routes`)
check('route totals sum to the set', routes.reduce((s, r) => s + r.total, 0) === SAMPLE_SETTLEMENTS.length)
check('route source != destination', routes.every((r) => r.sourceChain.key !== r.destinationChain.key))

const feed = sampleActivityFeed(12)
check('feed respects limit', feed.length === 12)
check('feed is newest first', feed.every((e, i, a) => i === 0 || a[i - 1].timestamp >= e.timestamp))
check('feed entries are origin=sample', feed.every((e) => e.origin === 'sample'))

// Determinism: the sample set must not shift between imports.
const rerun = sampleMetrics()
check('metrics are deterministic', JSON.stringify(rerun) === JSON.stringify(m))

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)

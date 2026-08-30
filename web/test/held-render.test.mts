// Renders the settlement detail body to static markup and asserts what a HELD
// settlement must and must not say. This is the claim the whole protocol rests
// on: no irreversible commit without Creditcoin COMMIT. The UI must not imply
// otherwise, and must explain the hold in operator-readable terms.
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'

import { expandSampleSettlement, SAMPLE_SETTLEMENTS } from '../lib/handshake/sample/sample-source.ts'
import { buildLifecycleStages } from '../lib/handshake/lifecycle.ts'
import { SettlementTimeline } from '../components/dashboard/settlement-timeline.tsx'

let failures = 0
const check = (name: string, ok: boolean, detail = '') => {
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

const text = (markup: string) =>
  markup.replace(/<[^>]+>/g, ' ').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ')

/**
 * Counts stages by status.
 *
 * Stage-level truth comes from the pure builder rather than from counting
 * `data-status` attributes: one stage emits that attribute up to three times
 * (wrapper, node, connector), so attribute counts do not equal stage counts.
 */
const statusCounts = (settlement: Parameters<typeof buildLifecycleStages>[0]) => {
  const counts: Record<string, number> = {}
  for (const stage of buildLifecycleStages(settlement)) {
    counts[stage.status] = (counts[stage.status] ?? 0) + 1
  }
  return counts
}

const heldRefs = SAMPLE_SETTLEMENTS.filter((r) => r.state === 'HELD').map((r) => r.reference)
check('sample set contains HELD settlements', heldRefs.length > 0, `${heldRefs.length} held`)

for (const ref of heldRefs) {
  const settlement = expandSampleSettlement(ref)!
  const markup = renderToStaticMarkup(createElement(SettlementTimeline, { settlement }))
  const body = text(markup)
  const stages = buildLifecycleStages(settlement)
  const counts = statusCounts(settlement)

  // Must explain the hold and state that nothing became irreversible.
  check(`${ref}: names the Held stage`, body.includes('Held'))
  check(
    `${ref}: explains the hold`,
    body.includes('No irreversible commit was executed') ||
      body.includes('Timeout reached without COMMIT'),
  )
  check(`${ref}: states refund is unilateral`, body.includes('unilateral refund path'))
  check(`${ref}: states refund needs no attestor`, body.includes('no attestor cooperation'))

  // Must NOT present COMMIT or SETTLED as reached.
  check(`${ref}: no Commit stage`, !stages.some((s) => s.key === 'commit'))
  check(`${ref}: no Settled stage`, !stages.some((s) => s.key === 'settled'))
  check(`${ref}: no COMMIT language in markup`, !body.includes('Irreversible settlement authorization'))
  check(`${ref}: no SETTLED language in markup`, !body.includes('Both native legs delivered'))

  // Only PREPARE and possibly READY may be done; nothing after the failure.
  const doneKeys = stages.filter((s) => s.status === 'done').map((s) => s.key)
  check(
    `${ref}: only pre-failure stages are done`,
    doneKeys.every((key) => key === 'prepare' || key === 'ready'),
    `done: [${doneKeys.join(', ')}]`,
  )
  check(`${ref}: terminal stage is held+failed`, stages.at(-1)?.key === 'held' && stages.at(-1)?.status === 'failed')
  check(`${ref}: renders a failed status`, (counts.failed ?? 0) >= 1 && markup.includes('data-status="failed"'))

  // No stage may follow the terminal Held stage.
  check(`${ref}: nothing follows Held`, stages.findIndex((s) => s.key === 'held') === stages.length - 1)
}

// A SETTLED settlement must show the full happy path.
const settledRef = SAMPLE_SETTLEMENTS.find((r) => r.state === 'SETTLED')!.reference
const settled = expandSampleSettlement(settledRef)!
const settledMarkup = renderToStaticMarkup(createElement(SettlementTimeline, { settlement: settled }))
const settledBody = text(settledMarkup)
const settledCounts = statusCounts(settled)
check(`${settledRef}: shows Commit`, settledBody.includes('Irreversible settlement authorization'))
check(`${settledRef}: shows Settled`, settledBody.includes('Both native legs delivered'))
check(`${settledRef}: shows fresh verification gate`, settledBody.includes('Fresh verification'))
check(`${settledRef}: all 5 stages done`, settledCounts.done === 5, JSON.stringify(settledCounts))
check(`${settledRef}: no failed stage`, !settledMarkup.includes('data-status="failed"'))
check(`${settledRef}: no unilateral-refund language`, !settledBody.includes('unilateral refund path'))

// An in-flight settlement must not claim COMMIT.
const prepareRef = SAMPLE_SETTLEMENTS.find((r) => r.state === 'PREPARE')?.reference
if (prepareRef) {
  const prepare = expandSampleSettlement(prepareRef)!
  const m = renderToStaticMarkup(createElement(SettlementTimeline, { settlement: prepare }))
  const counts = statusCounts(prepare)
  check(`${prepareRef}: PREPARE claims nothing done`, (counts.done ?? 0) === 0, JSON.stringify(counts))
  check(`${prepareRef}: PREPARE is the current stage`, m.includes('data-status="current"'))
  check(`${prepareRef}: no failed stage`, !m.includes('data-status="failed"'))
}

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)

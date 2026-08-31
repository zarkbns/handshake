// Verifies the service layer's filtering, sorting, pagination, and — most
// importantly — that the sample source can never masquerade as a chain read.
import {
  ApiKeyIssuingUnavailableError,
  ChainReadUnavailableError,
  apiKeyService,
  isSettlementId,
  metricsService,
  settlementService,
  webhookService,
} from '../lib/handshake/services.ts'

let failures = 0
const check = (name: string, ok: boolean, detail = '') => {
  if (!ok) failures++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

// --- settlement id validation -------------------------------------------------
check('accepts a 32-byte id', isSettlementId('0x' + '11'.repeat(32)))
check('rejects a short id', !isSettlementId('0x1234'))
check('rejects a display reference', !isSettlementId('STL-1028'))
check('rejects a 20-byte address', !isSettlementId('0x' + '11'.repeat(20)))

// --- list: pagination ---------------------------------------------------------
const first = await settlementService.list({ page: 1, pageSize: 15 })
check('list is labelled sample', first.origin === 'sample' && Boolean(first.notice))
check('page size honoured', first.data.items.length === 15)
check('page count computed', first.data.pageCount === Math.ceil(first.data.total / 15), `${first.data.pageCount} pages of ${first.data.total}`)

const second = await settlementService.list({ page: 2, pageSize: 15 })
const overlap = second.data.items.filter((r) => first.data.items.some((f) => f.reference === r.reference))
check('pages do not overlap', overlap.length === 0)

const beyond = await settlementService.list({ page: 999, pageSize: 15 })
check('out-of-range page clamps', beyond.data.page === beyond.data.pageCount)

// --- list: filtering ----------------------------------------------------------
const heldOnly = await settlementService.list({ state: 'HELD', pageSize: 100 })
check('status filter applies', heldOnly.data.items.length > 0 && heldOnly.data.items.every((r) => r.state === 'HELD'), `${heldOnly.data.total} held`)

const ethSource = await settlementService.list({ sourceChainKey: 'ethereum-sepolia', pageSize: 100 })
check('source chain filter applies', ethSource.data.items.every((r) => r.sourceChain.key === 'ethereum-sepolia'))

const ccDest = await settlementService.list({ destinationChainKey: 'creditcoin', pageSize: 100 })
check('destination chain filter applies', ccDest.data.items.every((r) => r.destinationChain.key === 'creditcoin'))

const searched = await settlementService.list({ search: 'STL-1028', pageSize: 100 })
check('search matches a reference', searched.data.items.length === 1 && searched.data.items[0].reference === 'STL-1028')

const searchState = await settlementService.list({ search: 'held', pageSize: 100 })
check('search matches a status', searchState.data.items.length > 0 && searchState.data.items.every((r) => r.state === 'HELD'))

const noMatch = await settlementService.list({ search: 'zzzz-nothing', pageSize: 100 })
check('unmatched search yields empty set', noMatch.data.items.length === 0 && noMatch.data.total === 0)

const combined = await settlementService.list({ state: 'SETTLED', sourceChainKey: 'creditcoin', pageSize: 100 })
check('filters compose', combined.data.items.every((r) => r.state === 'SETTLED' && r.sourceChain.key === 'creditcoin'))

// --- list: sorting ------------------------------------------------------------
const oldest = await settlementService.list({ sort: 'oldest', pageSize: 100 })
check('oldest sort ascends by createdAt', oldest.data.items.every((r, i, a) => i === 0 || a[i - 1].createdAt <= r.createdAt))

const newest = await settlementService.list({ sort: 'newest', pageSize: 100 })
check('newest sort descends by createdAt', newest.data.items.every((r, i, a) => i === 0 || a[i - 1].createdAt >= r.createdAt))

const longest = await settlementService.list({ sort: 'longest', pageSize: 100 })
check('longest sort descends by duration', longest.data.items.every((r, i, a) => i === 0 || (a[i - 1].durationSeconds ?? 0) >= (r.durationSeconds ?? 0)))

// --- date filter --------------------------------------------------------------
const { DISPLAY_NOW } = await import('../lib/handshake/format.ts')
const recent = await settlementService.list({ since: DISPLAY_NOW - 7 * 86400, pageSize: 100 })
check('date filter excludes older rows', recent.data.items.every((r) => r.createdAt >= DISPLAY_NOW - 7 * 86400))
check('date filter narrows the set', recent.data.total < first.data.total, `${recent.data.total} of ${first.data.total}`)

// --- detail by reference ------------------------------------------------------
const byRef = await settlementService.getByReference('STL-1028')
check('reference lookup resolves', byRef !== null && byRef.origin === 'sample')
check('reference lookup is labelled', byRef !== null && Boolean(byRef.notice))
check('unknown reference resolves to null', (await settlementService.getByReference('STL-99999')) === null)

// --- chain lookup guard -------------------------------------------------------
// No VITE_* vars are set in this process, so the live path must refuse
// rather than silently fall back to sample data.
let refused = false
try {
  await settlementService.getBySettlementId('0x' + '11'.repeat(32))
} catch (error) {
  refused = error instanceof ChainReadUnavailableError
}
check('chain lookup refuses without config', refused)
check('chainLookupAvailable reports false', settlementService.chainLookupAvailable() === false)

let rejectedBadId = false
try {
  await settlementService.getBySettlementId('STL-1028')
} catch (error) {
  rejectedBadId = error instanceof TypeError
}
check('chain lookup rejects a non-id', rejectedBadId)

// --- metrics ------------------------------------------------------------------
const snapshot = await metricsService.snapshot()
check('metrics are labelled sample', snapshot.origin === 'sample' && snapshot.data.origin === 'sample')
const series = await metricsService.activitySeries('7D')
check('series is labelled sample', series.origin === 'sample')
const routes = await metricsService.routes()
check('routes are labelled sample', routes.origin === 'sample')
const feed = await metricsService.feed(5)
check('feed respects limit and label', feed.origin === 'sample' && feed.data.length === 5)

// --- credentials --------------------------------------------------------------
check('key issuing reports unavailable', apiKeyService.issuingAvailable() === false)
let createRefused = false
try {
  await apiKeyService.create('test')
} catch (error) {
  createRefused = error instanceof ApiKeyIssuingUnavailableError
}
check('key creation refuses rather than minting a fake secret', createRefused)

let revokeRefused = false
try {
  await apiKeyService.revoke('key_local_1')
} catch (error) {
  revokeRefused = error instanceof ApiKeyIssuingUnavailableError
}
check('key revocation refuses', revokeRefused)

const keys = await apiKeyService.list()
check('listed keys are masked', keys.data.every((k) => k.maskedKey.includes('•')))
check('listed keys expose no full secret', keys.data.every((k) => !/[0-9a-f]{24,}/i.test(k.maskedKey)))

check('webhook delivery reports unavailable', webhookService.deliveryAvailable() === false)
const hooks = await webhookService.list()
check('webhooks are labelled sample', hooks.origin === 'sample')

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)

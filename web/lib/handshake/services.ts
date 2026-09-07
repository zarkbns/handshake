/**
 * Data service layer.
 *
 * Components depend only on these interfaces, never on a concrete source. Today
 * two sources are wired in:
 *
 *   - `chain-reader.ts` — live coordinator reads, keyed by bytes32 settlement id.
 *     Used by `SettlementService.getBySettlementId`. Everything it returns is a
 *     storage read from the deployed contracts.
 *   - `sample/sample-source.ts` — clearly labelled sample records for the
 *     list/metrics/activity shapes the public RPC cannot serve. Every record
 *     carries `origin: 'sample'` and a `null` settlement id.
 *
 * Swapping in an indexer means implementing these same interfaces. No component
 * changes are required.
 */

import {
  ChainReadUnavailableError,
  SettlementNotFoundError,
  isSettlementId,
  readSettlementFromChain,
} from './chain-reader'
import { canReadChain, readPublicChainConfig } from './chains'
import {
  SAMPLE_SETTLEMENTS,
  SAMPLE_SOURCE_NOTICE,
  expandSampleSettlement,
  sampleActivityFeed,
  sampleActivitySeries,
  sampleApiKeys,
  sampleMetrics,
  sampleRouteBreakdown,
  sampleWebhooks,
} from './sample/sample-source'
import type {
  ActivityEntry,
  ActivityPoint,
  ActivityWindow,
  ApiKey,
  MetricsSnapshot,
  Paginated,
  RouteBreakdown,
  Settlement,
  SettlementQuery,
  SettlementSummary,
  WebhookEndpoint,
} from './types'

export { ChainReadUnavailableError, SettlementNotFoundError, isSettlementId }
export { SAMPLE_SOURCE_NOTICE }

/** Describes where a result came from, so views can label it honestly. */
export interface SourcedResult<T> {
  data: T
  origin: 'chain' | 'sample'
  /** Present when the result is not a live chain read. */
  notice?: string
}

export interface SettlementService {
  list(query?: SettlementQuery): Promise<SourcedResult<Paginated<SettlementSummary>>>
  recent(limit?: number): Promise<SourcedResult<SettlementSummary[]>>
  /** Live coordinator read. Throws if chain config is missing or the id is unknown. */
  getBySettlementId(settlementId: string): Promise<SourcedResult<Settlement>>
  /** Sample-record detail lookup by display reference (`STL-1028`). */
  getByReference(reference: string): Promise<SourcedResult<Settlement> | null>
  /** Whether a live coordinator lookup is currently possible. */
  chainLookupAvailable(): boolean
}

export interface MetricsService {
  snapshot(): Promise<SourcedResult<MetricsSnapshot>>
  activitySeries(window: ActivityWindow): Promise<SourcedResult<ActivityPoint[]>>
  routes(): Promise<SourcedResult<RouteBreakdown[]>>
  feed(limit?: number): Promise<SourcedResult<ActivityEntry[]>>
}

export interface ApiKeyService {
  list(): Promise<SourcedResult<ApiKey[]>>
  /**
   * Key issuance requires a server-side credential store, which does not exist
   * in this repository. Implementations without one must reject rather than
   * mint a fake secret.
   */
  create(name: string): Promise<{ key: ApiKey; secret: string }>
  revoke(id: string): Promise<void>
  /** Whether a real issuing service is wired up. */
  issuingAvailable(): boolean
}

export interface WebhookService {
  list(): Promise<SourcedResult<WebhookEndpoint[]>>
  /** Whether webhook delivery is implemented server-side. */
  deliveryAvailable(): boolean
}

/** Simulated latency so skeleton states are exercised in development. */
const SAMPLE_LATENCY_MS = 260

function delay<T>(value: T, ms = SAMPLE_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

function sampled<T>(data: T): SourcedResult<T> {
  return { data, origin: 'sample', notice: SAMPLE_SOURCE_NOTICE }
}

function matchesQuery(row: SettlementSummary, query: SettlementQuery): boolean {
  if (query.state && query.state !== 'ALL' && row.state !== query.state) return false
  if (query.sourceChainKey && row.sourceChain.key !== query.sourceChainKey) return false
  if (query.destinationChainKey && row.destinationChain.key !== query.destinationChainKey) {
    return false
  }
  if (query.since && row.createdAt < query.since) return false
  if (query.search) {
    const needle = query.search.trim().toLowerCase()
    if (needle) {
      const haystack = [
        row.reference,
        row.settlementId ?? '',
        row.sourceChain.name,
        row.destinationChain.name,
        row.state,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(needle)) return false
    }
  }
  return true
}

function sortRows(rows: SettlementSummary[], sort: SettlementQuery['sort']): SettlementSummary[] {
  const sorted = [...rows]
  switch (sort) {
    case 'oldest':
      return sorted.sort((a, b) => a.createdAt - b.createdAt)
    case 'longest':
      return sorted.sort((a, b) => (b.durationSeconds ?? 0) - (a.durationSeconds ?? 0))
    case 'shortest':
      return sorted.sort((a, b) => (a.durationSeconds ?? Infinity) - (b.durationSeconds ?? Infinity))
    default:
      return sorted.sort((a, b) => b.createdAt - a.createdAt)
  }
}

class DefaultSettlementService implements SettlementService {
  chainLookupAvailable(): boolean {
    return canReadChain(readPublicChainConfig())
  }

  async list(query: SettlementQuery = {}): Promise<SourcedResult<Paginated<SettlementSummary>>> {
    const page = Math.max(1, query.page ?? 1)
    const pageSize = Math.max(1, query.pageSize ?? 15)

    const filtered = sortRows(
      SAMPLE_SETTLEMENTS.filter((row) => matchesQuery(row, query)),
      query.sort,
    )
    const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
    const safePage = Math.min(page, pageCount)
    const start = (safePage - 1) * pageSize

    return delay(
      sampled({
        items: filtered.slice(start, start + pageSize),
        total: filtered.length,
        page: safePage,
        pageSize,
        pageCount,
      }),
    )
  }

  async recent(limit = 6): Promise<SourcedResult<SettlementSummary[]>> {
    return delay(sampled(SAMPLE_SETTLEMENTS.slice(0, limit)))
  }

  async getBySettlementId(settlementId: string): Promise<SourcedResult<Settlement>> {
    const { settlement } = await readSettlementFromChain(settlementId)
    return { data: settlement, origin: 'chain' }
  }

  async getByReference(reference: string): Promise<SourcedResult<Settlement> | null> {
    const settlement = expandSampleSettlement(reference)
    if (!settlement) return null
    return delay(sampled(settlement))
  }
}

class DefaultMetricsService implements MetricsService {
  async snapshot(): Promise<SourcedResult<MetricsSnapshot>> {
    return delay(sampled(sampleMetrics()))
  }

  async activitySeries(window: ActivityWindow): Promise<SourcedResult<ActivityPoint[]>> {
    return delay(sampled(sampleActivitySeries(window)))
  }

  async routes(): Promise<SourcedResult<RouteBreakdown[]>> {
    return delay(sampled(sampleRouteBreakdown()))
  }

  async feed(limit = 12): Promise<SourcedResult<ActivityEntry[]>> {
    return delay(sampled(sampleActivityFeed(limit)))
  }
}

export class ApiKeyIssuingUnavailableError extends Error {
  constructor() {
    super(
      'No credential service is configured. Issuing a key requires a server-side store that can return the secret exactly once; the dashboard will not generate one locally.',
    )
    this.name = 'ApiKeyIssuingUnavailableError'
  }
}

class DefaultApiKeyService implements ApiKeyService {
  issuingAvailable(): boolean {
    // No key-issuing endpoint exists in the repository.
    return false
  }

  async list(): Promise<SourcedResult<ApiKey[]>> {
    return delay(sampled(sampleApiKeys()))
  }

  async create(_name: string): Promise<{ key: ApiKey; secret: string }> {
    // Refusing here is deliberate: inventing a secret would imply a security
    // mechanism that does not exist.
    throw new ApiKeyIssuingUnavailableError()
  }

  async revoke(_id: string): Promise<void> {
    throw new ApiKeyIssuingUnavailableError()
  }
}

class DefaultWebhookService implements WebhookService {
  deliveryAvailable(): boolean {
    // No webhook dispatcher exists in the repository.
    return false
  }

  async list(): Promise<SourcedResult<WebhookEndpoint[]>> {
    return delay(sampled(sampleWebhooks()))
  }
}

export const settlementService: SettlementService = new DefaultSettlementService()
export const metricsService: MetricsService = new DefaultMetricsService()
export const apiKeyService: ApiKeyService = new DefaultApiKeyService()
export const webhookService: WebhookService = new DefaultWebhookService()

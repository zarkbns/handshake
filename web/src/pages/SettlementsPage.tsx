import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'

import { FilterBar, type FilterValues } from '@/components/dashboard/filter-bar'
import { PageHeader } from '@/components/dashboard/page-header'
import { OriginBadge, SectionHeading } from '@/components/dashboard/primitives'
import { SettlementTable } from '@/components/dashboard/settlement-table'
import { EmptyState, ErrorState, Notice, TableSkeleton } from '@/components/dashboard/states'
import { DISPLAY_NOW, formatCount } from '@/lib/handshake/format'
import { settlementService } from '@/lib/handshake/services'
import type { SettlementQuery, SettlementState } from '@/lib/handshake/types'
import { useAsync } from '@/lib/handshake/use-async'

const PAGE_SIZE = 15

const DEFAULT_FILTERS: FilterValues = {
  search: '',
  state: 'ALL',
  sourceChainKey: '',
  destinationChainKey: '',
  dateRange: 'all',
  sort: 'newest',
}

const DATE_OFFSETS: Record<FilterValues['dateRange'], number | undefined> = {
  all: undefined,
  '24h': 86400,
  '7d': 7 * 86400,
  '30d': 30 * 86400,
}

/** In-flight states, for the `?status=pending` deep link from the header dropdown. */
const PENDING_STATES: SettlementState[] = ['PREPARE', 'READY', 'COMMITTED']

function filtersFromParams(status: string | null): FilterValues {
  if (!status) return DEFAULT_FILTERS
  const normalized = status.toUpperCase()
  if (normalized === 'SETTLED' || normalized === 'HELD') {
    return { ...DEFAULT_FILTERS, state: normalized as SettlementState }
  }
  // `pending` is a group rather than a single coordinator state, handled below.
  return DEFAULT_FILTERS
}

export function SettlementsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const statusParam = searchParams.get('status') ?? null
  const pendingGroup = statusParam?.toLowerCase() === 'pending'

  const [filters, setFilters] = useState<FilterValues>(() => filtersFromParams(statusParam))
  const [page, setPage] = useState(1)
  const [lookupId, setLookupId] = useState('')

  const query: SettlementQuery = useMemo(
    () => ({
      search: filters.search,
      state: filters.state,
      sourceChainKey: filters.sourceChainKey || undefined,
      destinationChainKey: filters.destinationChainKey || undefined,
      since: DATE_OFFSETS[filters.dateRange]
        ? DISPLAY_NOW - (DATE_OFFSETS[filters.dateRange] as number)
        : undefined,
      sort: filters.sort,
      page,
      pageSize: PAGE_SIZE,
    }),
    [filters, page],
  )

  const result = useAsync(() => settlementService.list(query), [query])

  const patch = useCallback((next: Partial<FilterValues>) => {
    setFilters((current) => ({ ...current, ...next }))
    setPage(1)
  }, [])

  const reset = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setPage(1)
    if (statusParam) navigate('/dashboard/settlements', { replace: true })
  }, [navigate, statusParam])

  const payload = result.data?.data
  // The `pending` deep link spans three coordinator states, so it is applied
  // after fetch rather than pushed into the single-state query filter.
  const rows = useMemo(() => {
    if (!payload) return []
    return pendingGroup && filters.state === 'ALL'
      ? payload.items.filter((row) => PENDING_STATES.includes(row.state))
      : payload.items
  }, [payload, pendingGroup, filters.state])

  const submitLookup = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = lookupId.trim()
    if (trimmed) navigate(`/dashboard/settlements/${encodeURIComponent(trimmed)}`)
  }

  return (
    <>
      <PageHeader
        eyebrow={pendingGroup ? 'Settlements / In flight' : 'Settlements'}
        title="All settlements"
        lede="Every settlement the coordinator has registered, with proof coverage and recovery state. Statuses map one-to-one onto the on-chain state machine."
      />

      <section className="ds-section">
        <SectionHeading
          title="Live coordinator lookup"
          note="Reads HandshakeASC.getHandshake directly on Creditcoin. Requires the canonical bytes32 settlement id from SettlementId.derive."
        />
        <form className="ds-filter-bar" onSubmit={submitLookup} style={{ borderBottom: '1px solid var(--ds-border)' }}>
          <label className="ds-field ds-search">
            <span>Settlement id</span>
            <span style={{ position: 'relative', display: 'block' }}>
              <Search size={11} />
              <input
                className="ds-input"
                value={lookupId}
                placeholder="0x…  (32-byte settlement id)"
                onChange={(event) => setLookupId(event.target.value)}
                spellCheck={false}
              />
            </span>
          </label>
          <button type="submit" className="ds-button" data-size="sm" disabled={!lookupId.trim()}>
            Look up
          </button>
        </form>
      </section>

      <section className="ds-section">
        <SectionHeading
          title="Settlement index"
          action={payload ? <OriginBadge origin="sample" /> : null}
        />

        {result.data?.notice ? (
          <div style={{ marginBottom: 14 }}>
            <Notice title="Index is not live">{result.data.notice}</Notice>
          </div>
        ) : null}

        <FilterBar values={filters} onChange={patch} onReset={reset} />

        {result.loading ? (
          <TableSkeleton rows={8} />
        ) : result.error ? (
          <ErrorState description="Unable to load settlements." onRetry={result.reload} />
        ) : rows.length > 0 ? (
          <>
            <SettlementTable rows={rows} />
            {payload ? (
              <div className="ds-pagination">
                <span>
                  {formatCount(rows.length)} of {formatCount(payload.total)} settlements
                  {payload.pageCount > 1 ? ` · page ${payload.page} of ${payload.pageCount}` : ''}
                </span>
                <div className="ds-pagination-controls">
                  <button
                    type="button"
                    className="ds-button"
                    data-variant="outline"
                    data-size="sm"
                    disabled={payload.page <= 1}
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                  >
                    <ChevronLeft size={11} /> Prev
                  </button>
                  <button
                    type="button"
                    className="ds-button"
                    data-variant="outline"
                    data-size="sm"
                    disabled={payload.page >= payload.pageCount}
                    onClick={() => setPage((value) => Math.min(payload.pageCount, value + 1))}
                  >
                    Next <ChevronRight size={11} />
                  </button>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <EmptyState
            title="No settlements match these filters."
            description="Widen the status, route, or date range. Clearing the filters restores the full index."
            action={
              <button type="button" className="ds-button" data-variant="outline" onClick={reset}>
                Clear filters
              </button>
            }
          />
        )}
      </section>
    </>
  )
}
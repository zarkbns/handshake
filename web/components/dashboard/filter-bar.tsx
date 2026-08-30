'use client'

import { Search } from 'lucide-react'

import { CHAINS } from '@/lib/handshake/chains'
import { SETTLEMENT_STATES, type SettlementState } from '@/lib/handshake/types'

export type StateFilter = SettlementState | 'ALL'
export type SortOption = 'newest' | 'oldest' | 'longest' | 'shortest'
export type DateFilter = 'all' | '24h' | '7d' | '30d'

export interface FilterValues {
  search: string
  state: StateFilter
  sourceChainKey: string
  destinationChainKey: string
  dateRange: DateFilter
  sort: SortOption
}

const SELECTABLE_STATES = SETTLEMENT_STATES.filter((state) => state !== 'NONE')

const DATE_LABELS: Record<DateFilter, string> = {
  all: 'All time',
  '24h': 'Last 24h',
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
}

const SORT_LABELS: Record<SortOption, string> = {
  newest: 'Newest first',
  oldest: 'Oldest first',
  longest: 'Longest duration',
  shortest: 'Shortest duration',
}

export function FilterBar({
  values,
  onChange,
  onReset,
}: {
  values: FilterValues
  onChange: (patch: Partial<FilterValues>) => void
  onReset: () => void
}) {
  const dirty =
    values.search !== '' ||
    values.state !== 'ALL' ||
    values.sourceChainKey !== '' ||
    values.destinationChainKey !== '' ||
    values.dateRange !== 'all' ||
    values.sort !== 'newest'

  return (
    <div className="ds-filter-bar">
      <label className="ds-field ds-search">
        <span>Search</span>
        <span style={{ position: 'relative', display: 'block' }}>
          <Search size={11} />
          <input
            className="ds-input"
            type="search"
            value={values.search}
            placeholder="Settlement ref, id, chain, or status"
            onChange={(event) => onChange({ search: event.target.value })}
          />
        </span>
      </label>

      <label className="ds-field">
        <span>Status</span>
        <select
          className="ds-select"
          value={values.state}
          onChange={(event) => onChange({ state: event.target.value as StateFilter })}
        >
          <option value="ALL">All</option>
          {SELECTABLE_STATES.map((state) => (
            <option key={state} value={state}>
              {state === 'COMMITTED' ? 'COMMIT' : state}
            </option>
          ))}
        </select>
      </label>

      <label className="ds-field">
        <span>Source</span>
        <select
          className="ds-select"
          value={values.sourceChainKey}
          onChange={(event) => onChange({ sourceChainKey: event.target.value })}
        >
          <option value="">Any</option>
          {CHAINS.map((chain) => (
            <option key={chain.key} value={chain.key}>
              {chain.shortName}
            </option>
          ))}
        </select>
      </label>

      <label className="ds-field">
        <span>Destination</span>
        <select
          className="ds-select"
          value={values.destinationChainKey}
          onChange={(event) => onChange({ destinationChainKey: event.target.value })}
        >
          <option value="">Any</option>
          {CHAINS.map((chain) => (
            <option key={chain.key} value={chain.key}>
              {chain.shortName}
            </option>
          ))}
        </select>
      </label>

      <label className="ds-field">
        <span>Created</span>
        <select
          className="ds-select"
          value={values.dateRange}
          onChange={(event) => onChange({ dateRange: event.target.value as DateFilter })}
        >
          {Object.entries(DATE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className="ds-field">
        <span>Sort</span>
        <select
          className="ds-select"
          value={values.sort}
          onChange={(event) => onChange({ sort: event.target.value as SortOption })}
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>

      {dirty ? (
        <button type="button" className="ds-button" data-variant="outline" data-size="sm" onClick={onReset}>
          Reset
        </button>
      ) : null}
    </div>
  )
}

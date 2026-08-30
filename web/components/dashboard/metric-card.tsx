import type { ReactNode } from 'react'

import { formatCount } from '@/lib/handshake/format'

export interface MetricCardProps {
  label: string
  value: number | string
  /** Secondary line: share of total, rate, or a qualifier. */
  meta?: ReactNode
  tone?: 'default' | 'settled' | 'held'
  /** Optional 0–1 fill shown as a hairline meter under the value. */
  ratio?: number
}

export function MetricCard({ label, value, meta, tone = 'default', ratio }: MetricCardProps) {
  return (
    <div className="ds-metric">
      <p className="ds-metric-label">{label}</p>
      <span className="ds-metric-value" data-tone={tone === 'default' ? undefined : tone}>
        {typeof value === 'number' ? formatCount(value) : value}
      </span>
      {ratio !== undefined ? (
        <span className="ds-meter" style={{ marginTop: 12 }} aria-hidden="true">
          <span
            className="ds-meter-fill"
            data-tone={tone === 'default' ? 'neutral' : tone}
            style={{ width: `${Math.min(100, Math.max(0, ratio * 100))}%` }}
          />
        </span>
      ) : null}
      {meta ? <p className="ds-metric-meta">{meta}</p> : null}
    </div>
  )
}

export function MetricGrid({ children }: { children: ReactNode }) {
  return <div className="ds-metrics">{children}</div>
}

/** Skeleton matching MetricGrid's four-column footprint. */
export function MetricGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="ds-metrics" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="ds-metric" key={index}>
          <span className="ds-skeleton" style={{ width: 92, height: 8, marginBottom: 18 }} />
          <span className="ds-skeleton" style={{ width: 64, height: 30 }} />
          <span className="ds-skeleton" style={{ width: 78, height: 8, marginTop: 14 }} />
        </div>
      ))}
    </div>
  )
}

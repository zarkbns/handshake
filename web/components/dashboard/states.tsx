'use client'

import { AlertTriangle, Inbox, RotateCw } from 'lucide-react'
import type { ReactNode } from 'react'

/** Skeleton primitive. Width/height are caller-controlled. */
export function Skeleton({
  width = '100%',
  height = 10,
  style,
}: {
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}) {
  return <span className="ds-skeleton" style={{ width, height, ...style }} aria-hidden="true" />
}

/** Table skeleton sized to the real table's column count. */
export function TableSkeleton({ rows = 6, columns = 6 }: { rows?: number; columns?: number }) {
  return (
    <div className="ds-table-wrap" aria-hidden="true">
      <table className="ds-table">
        <thead>
          <tr>
            {Array.from({ length: columns }, (_, index) => (
              <th key={index}>
                <Skeleton width={index === 0 ? 72 : 54} height={7} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, columnIndex) => (
                <td key={columnIndex}>
                  <Skeleton width={columnIndex === 1 ? 168 : columnIndex === 0 ? 76 : 48} height={9} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function PanelSkeleton({ lines = 5, height = 9 }: { lines?: number; height?: number }) {
  return (
    <div className="ds-stack" aria-hidden="true">
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton key={index} width={index % 3 === 0 ? '86%' : index % 3 === 1 ? '64%' : '73%'} height={height} />
      ))}
    </div>
  )
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string
  description: string
  action?: ReactNode
  icon?: ReactNode
}) {
  return (
    <div className="ds-empty">
      <span className="ds-empty-mark">{icon ?? <Inbox size={14} />}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}

export function ErrorState({
  title = 'Unable to load data.',
  description,
  onRetry,
}: {
  title?: string
  description: string
  onRetry?: () => void
}) {
  return (
    <div className="ds-error" role="alert">
      <span className="ds-empty-mark">
        <AlertTriangle size={14} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {onRetry ? (
        <button type="button" className="ds-button" data-variant="outline" onClick={onRetry}>
          <RotateCw size={11} /> Try again
        </button>
      ) : null}
    </div>
  )
}

/**
 * Provenance notice.
 *
 * Used wherever a view is backed by the sample source, or where a capability
 * (key issuance, webhook delivery, live streaming) has no backend behind it.
 */
export function Notice({
  tone = 'sample',
  title,
  children,
}: {
  tone?: 'sample' | 'neutral' | 'danger'
  title?: string
  children: ReactNode
}) {
  return (
    <div className="ds-notice" data-tone={tone === 'sample' ? undefined : tone}>
      <AlertTriangle size={12} />
      <span>
        {title ? <strong>{title}</strong> : null}
        {children}
      </span>
    </div>
  )
}

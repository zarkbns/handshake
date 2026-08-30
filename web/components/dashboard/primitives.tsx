import type { ReactNode } from 'react'

import type { DataOrigin } from '@/lib/handshake/types'

/**
 * Provenance chip.
 *
 * Rendered next to every data-backed heading so a sample-sourced number can
 * never be read as a verified on-chain value.
 */
export function OriginBadge({ origin }: { origin: DataOrigin }) {
  return (
    <span className="ds-origin" data-origin={origin}>
      {origin === 'chain' ? 'On-chain read' : 'Sample data'}
    </span>
  )
}

export function SectionHeading({
  title,
  note,
  action,
}: {
  title: string
  note?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="ds-section-head">
      <div>
        <h2 className="ds-section-title">{title}</h2>
        {note ? <p className="ds-section-note" style={{ margin: '6px 0 0' }}>{note}</p> : null}
      </div>
      {action}
    </div>
  )
}

export function Panel({
  title,
  action,
  children,
  padded = true,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  padded?: boolean
}) {
  return (
    <section className="ds-panel">
      {title || action ? (
        <header className="ds-panel-head">
          {title ? <h3 className="ds-section-title">{title}</h3> : <span />}
          {action}
        </header>
      ) : null}
      {padded ? <div className="ds-panel-body">{children}</div> : children}
    </section>
  )
}

/** Label/value pair grid used across detail views. */
export function DefinitionGrid({ children }: { children: ReactNode }) {
  return <dl className="ds-defs">{children}</dl>
}

export function Definition({
  label,
  value,
  muted = false,
}: {
  label: string
  value: ReactNode
  muted?: boolean
}) {
  return (
    <div className="ds-def">
      <dt className="ds-def-label">{label}</dt>
      <dd className="ds-def-value" data-muted={muted || undefined}>
        {value}
      </dd>
    </div>
  )
}

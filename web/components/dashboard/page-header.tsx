import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow?: string
  title: string
  lede?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="ds-page-head">
      <div>
        {eyebrow ? <p className="ds-eyebrow">{eyebrow}</p> : null}
        <h1 className="ds-page-title">{title}</h1>
        {lede ? <p className="ds-page-lede">{lede}</p> : null}
      </div>
      {action}
    </div>
  )
}

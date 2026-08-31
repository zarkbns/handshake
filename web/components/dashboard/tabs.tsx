import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

import type { NavChild } from '@/lib/handshake/navigation'

/** Route-driven tabs, used for contextual sub-navigation like Developers. */
export function LinkTabs({ tabs, activeHref }: { tabs: NavChild[]; activeHref: string }) {
  return (
    <nav className="ds-tabs" aria-label="Section">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          to={tab.href}
          className="ds-tab"
          data-active={tab.href === activeHref || undefined}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  )
}

/** Local state tabs, used inside the settlement detail view. */
export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: Array<{ id: T; label: string; count?: number }>
  active: T
  onChange: (id: T) => void
}) {
  return (
    <div className="ds-tabs" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          className="ds-tab"
          aria-selected={tab.id === active}
          data-active={tab.id === active || undefined}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {tab.count !== undefined ? ` (${tab.count})` : ''}
        </button>
      ))}
    </div>
  )
}

export function TabPanel({ children }: { children: ReactNode }) {
  return (
    <div role="tabpanel" style={{ paddingTop: 18 }}>
      {children}
    </div>
  )
}

export function Segmented<T extends string>({
  options,
  active,
  onChange,
  label,
}: {
  options: readonly T[]
  active: T
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div className="ds-segmented" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          data-active={option === active || undefined}
          aria-pressed={option === active}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

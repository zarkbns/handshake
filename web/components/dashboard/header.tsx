import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { NAV_ITEMS, type NavItem } from '@/lib/handshake/navigation'

/**
 * Top header navigation.
 *
 * No permanent sidebar at any breakpoint: below 900px the same items collapse
 * into a disclosure panel under the header, preserving the dropdown groupings.
 */

function isActive(pathname: string, item: NavItem): boolean {
  if (item.href === '/dashboard') return pathname === '/dashboard'
  const base = item.href.split('?')[0]
  if (item.label === 'Developers') return pathname.startsWith('/dashboard/developers')
  return pathname === base || pathname.startsWith(`${base}/`)
}

function NavGroup({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const active = isActive(pathname, item)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Close the menu whenever navigation lands on a new route.
  useEffect(() => setOpen(false), [pathname])

  if (!item.children) {
    return (
      <Link className="ds-nav-link" to={item.href} data-active={active || undefined}>
        {item.label}
      </Link>
    )
  }

  return (
    <div className="ds-nav-item" ref={ref} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="ds-nav-trigger"
        data-active={active || undefined}
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
      >
        {item.label}
        <ChevronDown size={9} aria-hidden="true" />
      </button>
      {open ? (
        <div className="ds-nav-menu" role="menu">
          {item.children.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              role="menuitem"
              data-active={pathname === child.href.split('?')[0] || undefined}
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function DashboardHeader() {
  const pathname = useLocation().pathname ?? '/dashboard'
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      <header className="ds-header">
        <Link className="ds-brand" to="/dashboard">
          HANDSHAKE
        </Link>

        <nav className="ds-nav" aria-label="Dashboard">
          {NAV_ITEMS.map((item) => (
            <NavGroup key={item.label} item={item} pathname={pathname} />
          ))}
        </nav>

        <div className="ds-header-right">
          {/*
            Network label reflects the only networks the coordinator is deployed
            to (Creditcoin Testnet + Ethereum Sepolia). It is static, not a
            connection indicator, so it never implies a live socket.
          */}
          <span className="ds-network" title="Creditcoin Testnet · Ethereum Sepolia">
            <span className="ds-dot" aria-hidden="true" /> Testnet
          </span>
          <button type="button" className="ds-account">
            <span className="ds-avatar" aria-hidden="true">
              OP
            </span>
            <span>Account</span>
          </button>
          <button
            type="button"
            className="ds-menu-button"
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      <nav className="ds-mobile-nav" data-open={mobileOpen} aria-label="Dashboard (compact)">
        {NAV_ITEMS.map((item) => (
          <div className="ds-mobile-group" key={item.label}>
            <span>{item.label}</span>
            <div className="ds-mobile-links">
              {(item.children ?? [{ label: 'Open', href: item.href }]).map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  data-active={pathname === child.href.split('?')[0] || undefined}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </>
  )
}

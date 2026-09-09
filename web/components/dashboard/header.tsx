import { ChevronDown, Menu, X } from 'lucide-react'
import { usePrivy } from '@privy-io/react-auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { NAV_ITEMS, type NavItem } from '@/lib/handshake/navigation'
import { isDemoAuthEnabled, setDemoAuthenticated } from '@/src/privy'

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

function shortAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

/**
 * Account menu. The dashboard is read-only — Privy supplies the authenticated
 * identity and this UI never uses it to sign anything.
 * Disconnect clears the label and returns to the connect screen.
 */
function AccountMenu() {
  if (isDemoAuthEnabled()) return <DemoAccountMenu />
  return <PrivyAccountMenu />
}

function DemoAccountMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const pathname = useLocation().pathname

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

  useEffect(() => setOpen(false), [pathname])

  function disconnect() {
    setOpen(false)
    setDemoAuthenticated(false)
    navigate('/connect')
  }

  return (
    <div className="ds-nav-item" ref={ref} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="ds-nav-trigger ds-account"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
      >
        <span className="ds-avatar" aria-hidden="true">DW</span>
        <span>Demo wallet</span>
        <ChevronDown size={9} aria-hidden="true" />
      </button>
      {open ? (
        <div className="ds-nav-menu" role="menu" style={{ left: 'auto', right: 0 }}>
          <span role="menuitem" style={{ cursor: 'default', opacity: 0.7 }}>Demo wallet</span>
          <button type="button" role="menuitem" onClick={disconnect}>Disconnect</button>
        </div>
      ) : null}
    </div>
  )
}

function PrivyAccountMenu() {
  const { user, logout } = usePrivy()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const pathname = useLocation().pathname

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

  // Close on navigation and re-read the session label in case /connect changed it.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  async function disconnect() {
    setOpen(false)
    await logout()
    navigate('/connect')
  }

  return (
    <div className="ds-nav-item" ref={ref} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="ds-nav-trigger ds-account"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
        onMouseEnter={() => setOpen(true)}
      >
        <span className="ds-avatar" aria-hidden="true">
          {(user?.wallet?.address ?? user?.smartWallet?.address ?? user?.id ?? 'OP').slice(0, 2).toUpperCase()}
        </span>
        <span>{user?.wallet?.address ? shortAddress(user.wallet.address) : 'Account'}</span>
        <ChevronDown size={9} aria-hidden="true" />
      </button>
      {open ? (
        <div className="ds-nav-menu" role="menu" style={{ left: 'auto', right: 0 }}>
          {user?.wallet?.address ? (
            <span role="menuitem" style={{ cursor: 'default', opacity: 0.7 }}>
              {shortAddress(user.wallet.address)}
            </span>
          ) : null}
          <Link role="menuitem" to="/connect">
            Switch account
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={disconnect}
            style={{ background: 'none', border: 0, padding: 0, font: 'inherit', color: 'inherit', textAlign: 'left', width: '100%', cursor: 'pointer' }}
          >
            Disconnect
          </button>
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
          <AccountMenu />
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

import { PrivyProvider, usePrivy } from '@privy-io/react-auth'
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const appId = import.meta.env.VITE_PRIVY_APP_ID ?? ''
const DEMO_AUTH_ENABLED = true
const DEMO_AUTH_KEY = 'handshake-demo-authenticated'

export function isDemoAuthEnabled(): boolean {
  return DEMO_AUTH_ENABLED
}

export function isDemoAuthenticated(): boolean {
  return window.sessionStorage.getItem(DEMO_AUTH_KEY) === 'true'
}

export function setDemoAuthenticated(authenticated: boolean): void {
  if (authenticated) window.sessionStorage.setItem(DEMO_AUTH_KEY, 'true')
  else window.sessionStorage.removeItem(DEMO_AUTH_KEY)
}

export function HandshakePrivyProvider({ children }: { children: ReactNode }) {
  if (DEMO_AUTH_ENABLED) return children

  if (!appId && !DEMO_AUTH_ENABLED) {
    return (
      <div className="auth-loading">
        Add VITE_PRIVY_APP_ID to web/.env.local to enable authentication.
      </div>
    )
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#f4f1ea',
        },
        embeddedWallets: {
          ethereum: { createOnLogin: 'users-without-wallets' },
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}

export function AuthenticatedRoute({ children }: { children: ReactNode }) {
  if (DEMO_AUTH_ENABLED) return <DemoAuthenticatedRoute>{children}</DemoAuthenticatedRoute>
  return <PrivyAuthenticatedRoute>{children}</PrivyAuthenticatedRoute>
}

function DemoAuthenticatedRoute({ children }: { children: ReactNode }) {
  const location = useLocation()

  if (!isDemoAuthenticated()) {
    return <Navigate to="/connect" replace state={{ from: location.pathname }} />
  }
  return children
}

function PrivyAuthenticatedRoute({ children }: { children: ReactNode }) {
  const { ready, authenticated } = usePrivy()
  const location = useLocation()

  if (!ready) return <div className="auth-loading">Loading authentication…</div>
  if (!authenticated) {
    return <Navigate to="/connect" replace state={{ from: location.pathname }} />
  }
  return children
}

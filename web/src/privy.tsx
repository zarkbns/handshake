import { PrivyProvider, usePrivy } from '@privy-io/react-auth'
import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const appId = import.meta.env.VITE_PRIVY_APP_ID ?? ''

export function HandshakePrivyProvider({ children }: { children: ReactNode }) {
  if (!appId) {
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
  const { ready, authenticated } = usePrivy()
  const location = useLocation()

  if (!ready) return <div className="auth-loading">Loading authentication…</div>
  if (!authenticated) {
    return <Navigate to="/connect" replace state={{ from: location.pathname }} />
  }
  return children
}

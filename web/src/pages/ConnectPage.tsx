import { usePrivy } from '@privy-io/react-auth'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Logo } from '@/components/handshake-app'

export function ConnectPage() {
  const { ready, authenticated, login, user } = usePrivy()
  const navigate = useNavigate()
  const location = useLocation()
  const destination = (location.state as { from?: string } | null)?.from ?? '/dashboard'
  const address = user?.wallet?.address ?? user?.smartWallet?.address ?? ''

  useEffect(() => {
    if (ready && authenticated) navigate(destination, { replace: true })
  }, [authenticated, destination, navigate, ready])

  return (
    <main className="auth-page">
      <div className="auth-side">
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 0, padding: 0 }}>
          <Logo />
        </button>
        <div className="auth-cross">×</div>
        <span>Cross-chain DvP settlement on Creditcoin.</span>
      </div>
      <section className="auth-panel">
        <div className="auth-form">
          <h1>{authenticated ? 'Connected' : 'Sign in'}</h1>
          {!authenticated ? (
            <>
              <button className="connect-button" type="button" onClick={() => login()} disabled={!ready}>
                {!ready ? '…' : 'Continue with Privy'}
              </button>
              <div className="wallet-status">
                <p className="wallet-hint">
                  Sign in with email or an EVM wallet. Privy manages authentication without
                  exposing private keys to Handshake.
                </p>
                {!import.meta.env.VITE_PRIVY_APP_ID && (
                  <p className="wallet-hint" style={{ color: '#f88' }}>
                    Privy is not configured. Add VITE_PRIVY_APP_ID to web/.env.local.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="wallet-status">
              <div className="wallet-row"><span>Account</span><span className="wallet-address">{address || user?.id}</span></div>
              <div className="wallet-row"><span>Authentication</span><span className="wallet-address">Privy</span></div>
              <p className="wallet-hint">Your authenticated session is ready. Assets remain in native custody.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserProvider } from 'ethers'

import { Logo } from '@/components/handshake-app'

// Ephemeral session label for the header account menu. The dashboard is read-only and
// never transacts, so this stores only the connected address — never keys or signatures.
const WALLET_SESSION_KEY = 'hs_wallet_address'

function readSessionAddress(): string {
  try {
    return sessionStorage.getItem(WALLET_SESSION_KEY) ?? ''
  } catch {
    return ''
  }
}

export function ConnectPage() {
  const navigate = useNavigate()
  const [connected, setConnected] = useState(() => Boolean(readSessionAddress()))
  const [addr, setAddr] = useState(() => readSessionAddress())
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  async function connect() {
    setPending(true)
    setError('')
    try {
      const ethereum = window.ethereum
      if (!ethereum) {
        setError('No wallet detected. Install MetaMask or another Web3 wallet to continue.')
        return
      }
      const provider = new BrowserProvider(ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      setAddr(address)
      setConnected(true)
      try {
        sessionStorage.setItem(WALLET_SESSION_KEY, address)
      } catch {
        // Session storage unavailable — the in-page state still works for this visit.
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not connect to your wallet.')
      return
    } finally {
      setPending(false)
    }
  }

  function disconnect() {
    setConnected(false)
    setAddr('')
    setError('')
    try {
      sessionStorage.removeItem(WALLET_SESSION_KEY)
    } catch {
      // Ignore — nothing to clean up if storage is unavailable.
    }
  }

  function proceed() {
    navigate('/dashboard')
  }

  const short = (a: string) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '')

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
          <h1>{connected ? 'Connected' : 'Sign in'}</h1>
          {!connected ? (
<>
              <button
                className="connect-button"
                type="button"
                onClick={connect}
                disabled={pending}
              >
                {pending ? '…' : 'Connect EVM Wallet'}
              </button>
              <div className="wallet-status">
                <p className="wallet-hint">
                  Handshake keeps assets under native custody. Connect a wallet to
                  authenticate your operator account — no passwords, no keys left on a server.
                </p>
                {error && <p className="wallet-hint" style={{ color: '#f88' }}>{error}</p>}
              </div>
            </>
          ) : (
            <>
              <div className="wallet-status">
                <div className="wallet-row">
                  <span>Account</span>
                  <span className="wallet-address">{short(addr)}</span>
                </div>
                <div className="wallet-row">
                  <span>Network</span>
                  <span className="wallet-address">Creditcoin / ETH</span>
                </div>
                <p className="wallet-hint">
                  Signed in with {addr}. Assets stay in your custody on their native chains.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button className="ghost-button" type="button" onClick={disconnect}>
                    Disconnect
                  </button>
                  <button className="sign-button" type="button" onClick={proceed} style={{ marginTop: 0 }}>
                    ENTER
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
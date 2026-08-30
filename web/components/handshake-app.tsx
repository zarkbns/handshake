'use client'

import { ArrowUpRight, Eye, EyeOff, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

/**
 * Landing + authentication screens.
 *
 * Layout, classes, and visual language are unchanged from the original design —
 * same panel background, same Courier New mono voice, same dot-orbit hero, same
 * split auth page. Only the branding and copy were updated to Handshake, and the
 * placeholder dashboard view now routes to the real dashboard at /dashboard.
 */

type View = 'landing' | 'auth'
type Mode = 'login' | 'signup'

function Logo() {
  return (
    <span className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[-.03em]">
      <span className="logo-mark">×</span> HANDSHAKE
    </span>
  )
}

function Landing({ setView }: { setView: (view: View) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <main className="reference-shell">
      <header className="reference-header">
        <button onClick={() => setView('landing')}>
          <Logo />
        </button>
        <nav className="reference-nav">
          <button className="active">INDEX</button>
          <a href="#protocol">PROTOCOL</a>
          <a href="#settlement">SETTLEMENT</a>
          <a href="#connect">CONNECT</a>
        </nav>
        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
        {open && (
          <nav className="mobile-nav">
            <a href="#protocol">PROTOCOL</a>
            <a href="#settlement">SETTLEMENT</a>
            <a href="#connect">CONNECT</a>
          </nav>
        )}
      </header>

      <section className="reference-hero">
        <div className="hero-copy">
          <h1>
            Cross-chain
            <br />
            settlement without
            <br />
            a bridge
          </h1>
          <div className="hero-actions">
            <button onClick={() => setView('auth')} className="talk-button">
              <span>■</span> OPEN DASHBOARD <ArrowUpRight size={14} />
            </button>
            <span className="email-label">
              [ 01 ] &nbsp; DELIVERY-VERSUS-PAYMENT ON CREDITCOIN
            </span>
          </div>
        </div>
        <div className="dot-orbit" aria-hidden="true">
          <div className="dot-cloud" />
          <div className="orbit-line" />
        </div>
      </section>

      <section id="settlement" className="reference-lower">
        <div className="process-copy">
          <p className="eyebrow">[ SETTLEMENT LIFECYCLE ]</p>
          <div className="process-grid">
            <p>
              <b>
                PREPARE BOTH LEGS
                <br />
                VERIFY THE PROOFS
                <br />
                COMMIT ON CREDITCOIN
                <br />
                SETTLE OR RECOVER
              </b>
            </p>
            <p>
              ASSETS NEVER LEAVE THEIR NATIVE CHAINS. ONLY ATTESTED SETTLEMENT STATE MOVES, PROVEN
              BY THE ATTESTCOIN PROTOCOL. COMMIT IS THE SINGLE IRREVERSIBLE BOUNDARY AND EXECUTES
              ONLY ON CREDITCOIN. IF IT IS NEVER REACHED, RECOVERY IS TIMEOUT-DRIVEN AND UNILATERAL
              — NO ATTESTOR COOPERATION REQUIRED.
            </p>
          </div>
        </div>
        <div className="connect-box" id="protocol">
          <p className="eyebrow">ZERO BRIDGES / ZERO WRAPPING</p>
          <div className="connect-links">
            <a href="#connect">■ [ DVP ]</a>
            <a href="#connect">■ [ PROOF ]</a>
            <a href="#connect">■ [ COMMIT ]</a>
            <a href="#connect">■ [ HELD ]</a>
          </div>
          <div className="connect-foot">
            <span>CREDITCOIN TESTNET · ETHEREUM SEPOLIA</span>
            <span>POWERED BY ATTESTCOIN</span>
          </div>
        </div>
      </section>
    </main>
  )
}

function Auth({ setView }: { setView: (view: View) => void }) {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('login')
  const [show, setShow] = useState(false)
  const [sent, setSent] = useState(false)

  return (
    <main className="auth-page">
      <div className="auth-side">
        <button onClick={() => setView('landing')}>
          <Logo />
        </button>
        <div className="auth-cross">×</div>
        <span>Cross-chain DvP settlement on Creditcoin.</span>
      </div>
      <section className="auth-panel">
        <button className="create-link" onClick={() => setMode('signup')}>
          Create an account
        </button>
        <div className="auth-form">
          <h1>{mode === 'login' ? 'Sign in' : 'Create account'}</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
              // No auth service exists in this repository, so this does not
              // authenticate anything. It routes to the read-only operator
              // dashboard, which reads public chain state and needs no session.
              router.push('/dashboard')
            }}
          >
            <label>
              Email
              <input required type="email" placeholder="ops@protocol.xyz" />
            </label>
            <label>
              Password
              <span className="password-input">
                <input
                  required
                  minLength={6}
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  aria-label="Toggle password"
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </span>
            </label>
            <div className="form-meta">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <button type="button">Forgot?</button>
            </div>
            <button className="sign-button" type="submit">
              {sent ? '...' : mode === 'login' ? 'SIGN IN' : 'CREATE'}
            </button>
          </form>
          <button
            className="switch-mode"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login'
              ? 'Need an account? Create one'
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </section>
    </main>
  )
}

export function HandshakeApp() {
  const [view, setView] = useState<View>('landing')
  return view === 'landing' ? <Landing setView={setView} /> : <Auth setView={setView} />
}

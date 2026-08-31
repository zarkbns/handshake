import { ArrowUpRight, Eye, EyeOff, Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { CREDITCOIN, ETHEREUM_SEPOLIA } from '@/lib/handshake/chains'

function Logo() {
  return (
    <span className="flex items-center gap-2 font-mono text-[10px] font-bold tracking-[-.03em]">
      HANDSHAKE
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
          <a href="#how-it-works">HOW IT WORKS</a>
          <a href="#trust">TRUST MODEL</a>
          <a href="#settlement">SETTLEMENT</a>
          <a href="/connect">CONNECT</a>
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
            <a href="#how-it-works">HOW IT WORKS</a>
            <a href="#trust">TRUST MODEL</a>
            <a href="#settlement">SETTLEMENT</a>
            <a href="/connect">CONNECT</a>
          </nav>
        )}
      </header>

      {/* ============================================================ HERO */}
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
              <span>■</span> GET STARTED <ArrowUpRight size={14} />
            </button>
            <span className="email-label">
              [ 01 ] &nbsp; DELIVERY-VERSUS-PAYMENT ON CREDITCOIN
            </span>
          </div>
        </div>
        <div className="dot-orbit" aria-hidden="true">
          <svg className="dot-cloud" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <pattern id="dotPattern" width="7" height="7" patternUnits="userSpaceOnUse">
                <circle cx="3.5" cy="3.5" r="1.2" fill="#aaa" />
              </pattern>
              <mask id="handshakeMask">
                <rect width="200" height="200" fill="black" />
                <rect x="100" y="50" width="32" height="110" rx="16" fill="white" />
                <rect x="104" y="22" width="7" height="32" rx="3.5" fill="white" />
                <rect x="116" y="16" width="7" height="38" rx="3.5" fill="white" />
                <rect x="128" y="22" width="7" height="32" rx="3.5" fill="white" />
                <rect x="68" y="50" width="32" height="110" rx="16" fill="white" />
                <rect x="89" y="22" width="7" height="32" rx="3.5" fill="white" />
                <rect x="77" y="16" width="7" height="38" rx="3.5" fill="white" />
                <rect x="65" y="22" width="7" height="32" rx="3.5" fill="white" />
              </mask>
            </defs>
            <rect width="200" height="200" fill="url(#dotPattern)" mask="url(#handshakeMask)" />
          </svg>
          <div className="orbit-line" />
        </div>
      </section>

      {/* ============================================================ PROTOCOL */}
      <section id="protocol" className="reference-features">
        <p className="reference-features-head">[ PROTOCOL ]</p>
        <div className="reference-features-grid">
          <div className="reference-feature">
            <div className="reference-feature-icon">◎</div>
            <h3>Attestcoin Protocol</h3>
            <p>
              Every proof that crosses a chain boundary is attested by the Attestcoin quorum.
              Inclusion and continuity proofs are verified on Creditcoin before the coordinator
              accepts a leg — no relayers, no wrapped representations, no synthetic states.
            </p>
          </div>
          <div className="reference-feature">
            <div className="reference-feature-icon">⬡</div>
            <h3>Native Custody</h3>
            <p>
              Assets remain in their native lock contracts on Ethereum Sepolia and Creditcoin
              throughout the entire lifecycle. The coordinator stores only attested state — a
              bytes32 settlement id, prepare commitments, and a manifest hash. Nothing moves
              until COMMIT.
            </p>
          </div>
          <div className="reference-feature">
            <div className="reference-feature-icon">◈</div>
            <h3>Creditcoin Commit</h3>
            <p>
              COMMIT is the single irreversible boundary. It executes only on Creditcoin — the
              coordinator’s home chain — and only inside a bounded window after READY. Once
              fired, no source chain can reverse what happened.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ HOW IT WORKS */}
      <section id="how-it-works" className="reference-steps">
        <p className="reference-steps-head">[ HOW IT WORKS ]</p>
        <div className="reference-steps-grid">
          <div className="reference-step">
            <div className="reference-step-number">Step 01</div>
            <h3>PREPARE</h3>
            <p>
              Both legs register a lock on their native chain. The Ethereum leg produces an
              Attestcoin inclusion + continuity proof. The Creditcoin leg is read directly
              from the native lock — no proof required on the coordinator’s own chain.
            </p>
          </div>
          <div className="reference-step">
            <div className="reference-step-number">Step 02</div>
            <h3>READY</h3>
            <p>
              The dual-PREPARE gate: both leg commitments must be bound in a single attestation
              quorum. Until both are verified, the settlement cannot advance. This is the
              griefing resistance mechanism.
            </p>
          </div>
          <div className="reference-step">
            <div className="reference-step-number">Step 03</div>
            <h3>COMMIT</h3>
            <p>
              Irreversible settlement authorization on Creditcoin. The bounded commit window
              opens at READY and reverts once it closes. Nothing on a source chain becomes
              final before this point.
            </p>
          </div>
          <div className="reference-step">
            <div className="reference-step-number">Step 04</div>
            <h3>SETTLE / HELD</h3>
            <p>
              Both native legs deliver and the finalization attestation is recorded → SETTLED.
              If COMMIT never fires, the timeout-driven HELD state opens a unilateral refund
              path. No attestor cooperation. No counterparty signature.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ TRUST MODEL */}
      <section id="trust" className="reference-trust">
        <p className="reference-trust-head">[ TRUST MODEL ]</p>
        <div className="reference-trust-grid">
          <div className="reference-trust-item">
            <h3>Zero Bridges, Zero Wrapping</h3>
            <p>
              Assets never leave their native chains. There is no intermediary token, no
              liquidity pool, and no wrapped representation. Settlement state moves as an
              attested record — that is all.
            </p>
          </div>
          <div className="reference-trust-item">
            <h3>No Centralized Oracle</h3>
            <p>
              Proof verification happens on-chain via the Attestcoin verifier precompile. The
              coordinator does not trust an external signer or off-chain relay. It trusts the
              same verification logic that secures Creditcoin itself.
            </p>
          </div>
          <div className="reference-trust-item">
            <h3>Unilateral Recovery</h3>
            <p>
              HELD is timeout-driven. Anyone may call unlockHeld once the PREPARE or READY
              window expires without COMMIT. The refund path makes no attestor call at all —
              depositors get funds back directly from the lock contract.
            </p>
          </div>
          <div className="reference-trust-item">
            <h3>Finality Buffers</h3>
            <p>
              Each attested source chain has a configurable finality buffer. Ethereum Sepolia
              requires 12 confirmations before the coordinator accepts a leg. Reorgs inside
              that window are explicitly handled, not assumed away.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ SETTLEMENT */}
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
        <div className="connect-box" id="connect">
          <p className="eyebrow">ZERO BRIDGES / ZERO WRAPPING</p>
          <div className="connect-links">
            <a href="#protocol">■ [ DVP ]</a>
            <a href="#how-it-works">■ [ PROOF ]</a>
            <a href="#trust">■ [ COMMIT ]</a>
            <a href="#settlement">■ [ HELD ]</a>
          </div>
          <div className="connect-foot">
            <span>CREDITCOIN TESTNET · ETHEREUM SEPOLIA</span>
            <span>POWERED BY ATTESTCOIN</span>
          </div>
        </div>
      </section>

      {/* ============================================================ NETWORKS */}
      <section className="reference-networks">
        <p className="reference-networks-head">[ NETWORKS ]</p>
        <div className="reference-networks-grid">
          <div className="reference-network">
            <h3>{CREDITCOIN.name}</h3>
            <p>
              The coordinator’s home chain. COMMIT executes here and nowhere else. The native
              payment leg is read directly from the Creditcoin lock contract — no Attestcoin
              proof needed on the coordinator’s own chain.
            </p>
            <div className="reference-network-chain">Chain ID: {CREDITCOIN.id}</div>
          </div>
          <div className="reference-network">
            <h3>{ETHEREUM_SEPOLIA.name}</h3>
            <p>
              The attested source chain. The asset leg locks here and must produce an
              Attestcoin inclusion + continuity proof before the coordinator will accept it.
              A 12-block finality buffer is enforced.
            </p>
            <div className="reference-network-chain">Chain ID: {ETHEREUM_SEPOLIA.id}</div>
          </div>
        </div>
      </section>
    </main>
  )
}

type View = 'landing' | 'auth'
type Mode = 'login' | 'signup'

function Auth({ setView }: { setView: (view: View) => void }) {
  const navigate = useNavigate()
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
              navigate('/dashboard')
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
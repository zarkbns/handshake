import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Logo } from '@/components/handshake-app'

type Mode = 'login' | 'signup'

export function ConnectPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('login')
  const [show, setShow] = useState(false)
  const [sent, setSent] = useState(false)

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
                <button type="button" aria-label="Toggle password" onClick={() => setShow(!show)}>
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
            {mode === 'login' ? 'Need an account? Create one' : 'Already have an account? Sign in'}
          </button>
        </div>
      </section>
    </main>
  )
}
import { ArrowUpRight, Mail } from 'lucide-react'

const COMMUNITIES = [
  {
    label: 'GitHub',
    href: 'https://github.com/attestcoin/handshake',
    icon: '⌘',
    description: 'Source code, issues, and protocol specifications.',
  },
  {
    label: 'Twitter / X',
    href: 'https://x.com/attestcoin',
    icon: '✕',
    description: 'Announcements, updates, and protocol discussions.',
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/attestcoin',
    icon: '◈',
    description: 'Operator channel, dev support, and testnet coordination.',
  },
  {
    label: 'Documentation',
    href: 'https://docs.creditcoin.org/creditcoin-usc/usc-chains-environments',
    icon: <ArrowUpRight size={14} />,
    description: 'Chain environments, SDK guides, and deployment references.',
  },
]

export function ConnectPage() {
  return (
    <main className="reference-shell">
      <header className="reference-header">
        <span
          className="logo-mark"
          style={{
            display: 'inline-grid',
            placeItems: 'center',
            width: 20,
            height: 20,
            color: '#fff',
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "'Courier New', monospace",
            letterSpacing: '-0.03em',
          }}
        >
          HANDSHAKE
        </span>
        <nav className="reference-nav">
          <a href="/">INDEX</a>
          <a href="/#protocol">PROTOCOL</a>
          <a href="/#how-it-works">HOW IT WORKS</a>
          <a href="/#trust">TRUST MODEL</a>
          <a href="/#settlement">SETTLEMENT</a>
          <a href="/connect" className="active">CONNECT</a>
        </nav>
      </header>

      <section
        style={{
          padding: '80px 24px',
          background: 'var(--panel)',
          minHeight: 'calc(100vh - 47px)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
          }}
        >
        <p
          style={{
            margin: '0 0 12px',
            color: '#888',
            font: "8px 'Courier New', monospace",
            letterSpacing: '.04em',
          }}
        >
          [ CONNECT ]
        </p>
        <h1
          style={{
            margin: '0 0 40px',
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400,
            lineHeight: 1.02,
            letterSpacing: '-0.055em',
            color: '#f1f1f1',
          }}
        >
          Get in touch
        </h1>
        <p
          style={{
            margin: '0 0 50px',
            maxWidth: '52ch',
            color: '#aaa',
            font: "8px/1.7 'Courier New', monospace",
          }}
        >
          Whether you’re integrating the Attestcoin SDK, running a testnet operator, or auditing
          the protocol — there’s a channel for you. The project is open-source and the team is
          responsive.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40 }}>
          {COMMUNITIES.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: 24,
                border: '1px solid #333',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  color: '#f1f1f1',
                  font: "9px 'Courier New', monospace",
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                }}
              >
                <span style={{ color: '#aaa', fontSize: 14 }}>{item.icon}</span>
                {item.label}
                <ArrowUpRight size={10} style={{ marginLeft: 'auto', color: '#888' }} />
              </span>
              <span style={{ color: '#aaa', font: "8px/1.7 'Courier New', monospace" }}>
                {item.description}
              </span>
            </a>
          ))}
        </div>

        <div
          style={{
            marginTop: 60,
            padding: '24px 0',
            borderTop: '1px solid #333',
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              color: '#888',
              font: "8px 'Courier New', monospace",
              letterSpacing: '.04em',
              textTransform: 'uppercase',
            }}
          >
            Direct
          </p>
          <a
            href="mailto:ops@handshake.protocol"
            style={{
              color: '#f1f1f1',
              font: "9px 'Courier New', monospace",
              textDecoration: 'none',
              borderBottom: '1px solid #3a3a3a',
            }}
          >
            <Mail size={10} style={{ marginRight: 6, verticalAlign: 'middle' }} />
            ops@handshake.protocol
          </a>
        </div>
        </div>
      </section>
    </main>
  )
}
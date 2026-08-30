import { ExternalLink } from 'lucide-react'

import { CodeBlock } from '@/components/dashboard/code-block'
import { PageHeader } from '@/components/dashboard/page-header'
import { Definition, DefinitionGrid, Panel, SectionHeading } from '@/components/dashboard/primitives'
import { StatusBadge } from '@/components/dashboard/status-badge'
import { CREDITCOIN, COORDINATOR_TIMEOUT_SECONDS, ETHEREUM_SEPOLIA, FINALITY_CONFIRMATIONS } from '@/lib/handshake/chains'
import { STATE_DESCRIPTIONS } from '@/lib/handshake/format'
import { SETTLEMENT_STATES } from '@/lib/handshake/types'

const ENV_EXAMPLE = `# Public, read-only values. Safe to expose — they are inlined into the browser
# bundle. Never put a signer key behind a NEXT_PUBLIC_ prefix.
NEXT_PUBLIC_CREDITCOIN_RPC_URL=https://rpc.cc3-testnet.creditcoin.network
NEXT_PUBLIC_ETHEREUM_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
NEXT_PUBLIC_HANDSHAKE_ASC_ADDRESS=0x905E0f141D8B5333F49755B08395d1beAdEd74Ab
NEXT_PUBLIC_CREDITCOIN_LOCK_ADDRESS=0xb3e9cB40A52EF777A29b6198f4c2D8d19893a01D
NEXT_PUBLIC_ETHEREUM_LOCK_ADDRESS=0x999326d027316C6CD0156a39ac8d3792f2EFC802`

const DOC_LINKS = [
  {
    label: 'Chains & environments',
    href: 'https://docs.creditcoin.org/creditcoin-usc/usc-chains-environments',
  },
  {
    label: 'Guided tutorials',
    href: 'https://docs.creditcoin.org/creditcoin-usc/guided-tutorials',
  },
  {
    label: 'Attestcoin Protocol SDK',
    href: 'https://docs.creditcoin.org/creditcoin-usc/dapp-builder-infrastructure/usc-sdk',
  },
]

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Docs"
        title="Settlement model"
        lede="How Handshake settles across chains without a bridge, and what each state actually guarantees."
      />

      <section className="ds-section">
        <SectionHeading
          title="What the dashboard reads"
          note="This is a read-only operator surface. It never drives settlement — no write path exists in the UI."
        />
        <Panel>
          <p className="ds-section-note" style={{ margin: 0, lineHeight: 1.75 }}>
            Settlement lookups by id read HandshakeASC.getHandshake on Creditcoin plus the two lock
            contracts directly. Nothing is inferred: a proof is reported verified only when the
            coordinator holds a non-zero commitment for it, because the contract writes those
            commitments strictly after verification succeeds. Aggregate views — the index, metrics,
            and activity feed — are sample-backed and labelled as such, because the coordinator
            exposes no enumeration and the public testnet RPC rejects the log ranges an index would
            require.
          </p>
        </Panel>
      </section>

      <section className="ds-section">
        <SectionHeading title="State machine" />
        <div className="ds-table-wrap">
          <table className="ds-table">
            <thead>
              <tr>
                <th scope="col">State</th>
                <th scope="col">Guarantee</th>
              </tr>
            </thead>
            <tbody>
              {SETTLEMENT_STATES.filter((state) => state !== 'NONE').map((state) => (
                <tr key={state}>
                  <td>
                    <StatusBadge state={state} />
                  </td>
                  <td style={{ whiteSpace: 'normal', maxWidth: 560 }}>
                    {STATE_DESCRIPTIONS[state]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="ds-section">
        <SectionHeading title="Settlement parameters" />
        <Panel padded={false}>
          <DefinitionGrid>
            <Definition label="Coordinator chain" value={`${CREDITCOIN.name} (${CREDITCOIN.id})`} />
            <Definition
              label="Attested source chain"
              value={`${ETHEREUM_SEPOLIA.name} (${ETHEREUM_SEPOLIA.id})`}
            />
            <Definition
              label="Finality buffer"
              value={`${FINALITY_CONFIRMATIONS[ETHEREUM_SEPOLIA.key]} confirmations on Ethereum Sepolia`}
            />
            <Definition
              label="Timeout window"
              value={`${COORDINATOR_TIMEOUT_SECONDS / 60} minutes from PREPARE, and again from READY`}
            />
            <Definition
              label="COMMIT location"
              value="Creditcoin only. No source chain has an independent commit transaction."
            />
            <Definition
              label="Recovery"
              value="Timeout-driven and unilateral. Requires no attestor signature and no counterparty cooperation."
            />
          </DefinitionGrid>
        </Panel>
      </section>

      <section className="ds-section">
        <SectionHeading
          title="Connecting the dashboard to chain"
          note="Without these the settlement index still renders from sample data, but live lookups by id are disabled."
        />
        <CodeBlock code={ENV_EXAMPLE} filename="web/.env.local" />
      </section>

      <section className="ds-section">
        <SectionHeading title="Protocol references" />
        <Panel padded={false}>
          <DefinitionGrid>
            {DOC_LINKS.map((link) => (
              <Definition
                key={link.href}
                label={link.label}
                value={
                  <a href={link.href} target="_blank" rel="noreferrer">
                    docs.creditcoin.org <ExternalLink size={9} />
                  </a>
                }
              />
            ))}
          </DefinitionGrid>
        </Panel>
      </section>
    </>
  )
}

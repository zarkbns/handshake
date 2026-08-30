'use client'

import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { CopyButton } from '@/components/dashboard/code-block'
import { PageHeader } from '@/components/dashboard/page-header'
import { Definition, DefinitionGrid, OriginBadge, Panel, SectionHeading } from '@/components/dashboard/primitives'
import { SettlementTimeline } from '@/components/dashboard/settlement-timeline'
import { StatusBadge, ToneBadge } from '@/components/dashboard/status-badge'
import { EmptyState, ErrorState, Notice, PanelSkeleton } from '@/components/dashboard/states'
import { TabPanel, Tabs } from '@/components/dashboard/tabs'
import {
  CREDITCOIN,
  ETHEREUM_SEPOLIA,
  FINALITY_CONFIRMATIONS,
  explorerAddressUrl,
  explorerTxUrl,
} from '@/lib/handshake/chains'
import {
  STATE_DESCRIPTIONS,
  formatDateTime,
  formatDuration,
  truncateAddress,
  truncateHash,
} from '@/lib/handshake/format'
import {
  ChainReadUnavailableError,
  SettlementNotFoundError,
  isSettlementId,
  settlementService,
} from '@/lib/handshake/services'
import type { Settlement, SettlementLeg, SettlementProof } from '@/lib/handshake/types'
import { useAsync } from '@/lib/handshake/use-async'

type TabId = 'overview' | 'proofs' | 'transactions' | 'events'

function LegPanel({ leg, title }: { leg: SettlementLeg; title: string }) {
  const explorer = leg.lock ? explorerAddressUrl(leg.chain.id, leg.lock.token) : null

  return (
    <Panel title={title} padded={false}>
      <DefinitionGrid>
        <Definition label="Chain" value={leg.chain.name} />
        <Definition
          label="Verification"
          value={
            leg.kind === 'attested'
              ? 'Attestcoin quorum + inclusion + continuity proof'
              : 'Direct state read on the coordinator’s own chain'
          }
        />
        <Definition
          label="Prepared"
          value={
            leg.prepared ? (
              <ToneBadge tone="verified">Yes</ToneBadge>
            ) : (
              <ToneBadge tone="absent">No</ToneBadge>
            )
          }
        />
        <Definition
          label="Party"
          value={leg.party ? truncateAddress(leg.party) : 'Not available from this source'}
          muted={!leg.party}
        />
        <Definition
          label="Prepare commitment"
          value={
            leg.commitment ? (
              <span className="ds-inline">
                <span className="ds-hash">{truncateHash(leg.commitment, 14, 10)}</span>
                <CopyButton value={leg.commitment} />
              </span>
            ) : (
              'Not recorded'
            )
          }
          muted={!leg.commitment}
        />
        {leg.kind === 'attested' ? (
          <Definition
            label="Finality buffer"
            value={`${FINALITY_CONFIRMATIONS[leg.chain.key] ?? '—'} confirmations`}
          />
        ) : null}
        {leg.lock ? (
          <>
            <Definition label="Lock state" value={leg.lock.state} />
            <Definition
              label="Token"
              value={
                explorer ? (
                  <a href={explorer} target="_blank" rel="noreferrer">
                    {truncateAddress(leg.lock.token)} <ExternalLink size={9} />
                  </a>
                ) : (
                  truncateAddress(leg.lock.token)
                )
              }
            />
            <Definition label="Amount" value={leg.lock.amount} />
            <Definition label="Depositor" value={truncateAddress(leg.lock.depositor)} />
            <Definition label="Recipient" value={truncateAddress(leg.lock.recipient)} />
            <Definition label="Lock expiry" value={formatDateTime(leg.lock.expiry)} />
          </>
        ) : (
          <Definition
            label="Lock record"
            value="Not readable. Set the lock contract address to resolve custody detail."
            muted
          />
        )}
      </DefinitionGrid>
    </Panel>
  )
}

function ProofCard({ proof }: { proof: SettlementProof }) {
  const tone =
    proof.status === 'VERIFIED' ? 'verified' : proof.status === 'PENDING' ? 'pending' : 'absent'

  return (
    <Panel padded={false}>
      <header className="ds-panel-head">
        <h3 className="ds-section-title">{proof.label}</h3>
        <ToneBadge tone={tone}>{proof.status.replace('_', ' ')}</ToneBadge>
      </header>
      <DefinitionGrid>
        <Definition label="Coordinator call" value={proof.method} />
        <Definition
          label="Verified via"
          value={proof.verifiedVia === 'attestcoin' ? 'Attestcoin attestor quorum' : 'Native state read'}
        />
        <Definition label="Source chain" value={proof.sourceChain?.name ?? 'Coordinator'} />
        <Definition
          label="Inclusion proof"
          value={proof.inclusionProof ? 'Present' : 'Not applicable'}
          muted={!proof.inclusionProof}
        />
        <Definition
          label="Continuity proof"
          value={proof.continuityProof ? 'Present' : 'Not applicable'}
          muted={!proof.continuityProof}
        />
        <Definition
          label="Commitment hash"
          value={
            proof.commitment ? (
              <span className="ds-inline">
                <span className="ds-hash">{truncateHash(proof.commitment, 14, 10)}</span>
                <CopyButton value={proof.commitment} />
              </span>
            ) : (
              'Not recorded'
            )
          }
          muted={!proof.commitment}
        />
        <Definition
          label="Verified at"
          value={proof.verifiedAt ? formatDateTime(proof.verifiedAt) : 'Not timestamped on chain'}
          muted={!proof.verifiedAt}
        />
      </DefinitionGrid>
      {proof.note ? (
        <div className="ds-panel-body" style={{ borderTop: '1px solid var(--ds-border-subtle)' }}>
          <p className="ds-section-note" style={{ margin: 0 }}>
            {proof.note}
          </p>
        </div>
      ) : null}
    </Panel>
  )
}

function DetailBody({ settlement }: { settlement: Settlement }) {
  const [tab, setTab] = useState<TabId>('overview')

  const verifiedProofs = settlement.proofs.filter((proof) => proof.status === 'VERIFIED').length

  return (
    <>
      <div style={{ marginTop: 18 }}>
        <Link className="ds-back" href="/dashboard/settlements">
          <ArrowLeft size={11} /> All settlements
        </Link>
      </div>

      <PageHeader
        eyebrow={`${ETHEREUM_SEPOLIA.name} → ${CREDITCOIN.name}`}
        title={`Settlement ${settlement.reference}`}
        lede={STATE_DESCRIPTIONS[settlement.state]}
        action={
          <div className="ds-inline">
            <OriginBadge origin={settlement.origin} />
            <StatusBadge state={settlement.state} />
          </div>
        }
      />

      {settlement.origin === 'sample' ? (
        <div style={{ marginTop: 20 }}>
          <Notice title="Sample record">
            This settlement is not a coordinator record. It has no settlement id, and no proof
            commitments, transaction hashes, or block numbers are shown, because none exist. Enter a
            real bytes32 settlement id on the settlements page for a verified on-chain read.
          </Notice>
        </div>
      ) : null}

      {settlement.state === 'HELD' && settlement.heldReason ? (
        <div style={{ marginTop: 20 }}>
          <Notice tone="danger" title="Why this settlement is held">
            {settlement.heldReason} Custody never left either source chain, and the refund path is
            unilateral — it needs no attestor cooperation and no counterparty signature.
          </Notice>
        </div>
      ) : null}

      <section className="ds-section">
        <SectionHeading
          title="Lifecycle"
          note="Stages reflect the coordinator state machine in HandshakeASC. COMMIT is the single irreversible boundary and executes only on Creditcoin."
        />
        <Panel>
          <SettlementTimeline settlement={settlement} />
        </Panel>
      </section>

      <section className="ds-section">
        <Tabs<TabId>
          tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'proofs', label: 'Proofs', count: settlement.proofs.length },
            { id: 'transactions', label: 'Transactions', count: settlement.transactions.length },
            { id: 'events', label: 'Events', count: settlement.events.length },
          ]}
          active={tab}
          onChange={setTab}
        />

        {tab === 'overview' ? (
          <TabPanel>
            <div className="ds-stack">
              <Panel title="Coordinator record" padded={false}>
                <DefinitionGrid>
                  <Definition
                    label="Settlement id"
                    value={
                      settlement.settlementId ? (
                        <span className="ds-inline">
                          <span className="ds-hash">{truncateHash(settlement.settlementId, 14, 10)}</span>
                          <CopyButton value={settlement.settlementId} />
                        </span>
                      ) : (
                        'None. Sample records carry no canonical id.'
                      )
                    }
                    muted={!settlement.settlementId}
                  />
                  <Definition label="State" value={<StatusBadge state={settlement.state} />} />
                  <Definition
                    label="Route"
                    value={
                      <span className="ds-route">
                        {ETHEREUM_SEPOLIA.shortName}
                        <ArrowRight size={10} />
                        {CREDITCOIN.shortName}
                      </span>
                    }
                  />
                  <Definition label="Proofs verified" value={`${verifiedProofs}/${settlement.proofs.length}`} />
                  <Definition label="Entered PREPARE" value={formatDateTime(settlement.prepareTime)} />
                  <Definition
                    label="Entered READY"
                    value={settlement.readyTime ? formatDateTime(settlement.readyTime) : 'Not reached'}
                    muted={!settlement.readyTime}
                  />
                  <Definition
                    label="Timeout window"
                    value={formatDuration(settlement.timeoutSeconds)}
                  />
                  <Definition
                    label="Evidence manifest"
                    value={
                      settlement.evidenceManifest ? (
                        <span className="ds-inline">
                          <span className="ds-hash">
                            {truncateHash(settlement.evidenceManifest, 14, 10)}
                          </span>
                          <CopyButton value={settlement.evidenceManifest} />
                        </span>
                      ) : (
                        'Not recorded'
                      )
                    }
                    muted={!settlement.evidenceManifest}
                  />
                  <Definition
                    label="Settlement evidence"
                    value={
                      settlement.settlementEvidence ? (
                        <span className="ds-inline">
                          <span className="ds-hash">
                            {truncateHash(settlement.settlementEvidence, 14, 10)}
                          </span>
                          <CopyButton value={settlement.settlementEvidence} />
                        </span>
                      ) : (
                        'Not recorded'
                      )
                    }
                    muted={!settlement.settlementEvidence}
                  />
                </DefinitionGrid>
              </Panel>

              <div className="ds-grid-halves">
                <LegPanel leg={settlement.attestedLeg} title="Asset leg (attested)" />
                <LegPanel leg={settlement.nativeLeg} title="Payment leg (native)" />
              </div>
            </div>
          </TabPanel>
        ) : null}

        {tab === 'proofs' ? (
          <TabPanel>
            <div className="ds-stack">
              {settlement.proofs.map((proof) => (
                <ProofCard key={proof.id} proof={proof} />
              ))}
            </div>
          </TabPanel>
        ) : null}

        {tab === 'transactions' ? (
          <TabPanel>
            {settlement.transactions.length > 0 ? (
              <div className="ds-table-wrap">
                <table className="ds-table">
                  <thead>
                    <tr>
                      <th scope="col">Action</th>
                      <th scope="col">Chain</th>
                      <th scope="col">Transaction</th>
                      <th scope="col">Block</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settlement.transactions.map((transaction) => {
                      const href = transaction.hash
                        ? explorerTxUrl(transaction.chain.id, transaction.hash)
                        : null
                      return (
                        <tr key={transaction.id}>
                          <td className="ds-cell-strong">{transaction.label}</td>
                          <td>{transaction.chain.shortName}</td>
                          <td>
                            {href && transaction.hash ? (
                              <a href={href} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                                {truncateHash(transaction.hash)} <ExternalLink size={9} />
                              </a>
                            ) : (
                              truncateHash(transaction.hash)
                            )}
                          </td>
                          <td className="ds-cell-numeric">{transaction.blockNumber ?? '—'}</td>
                          <td className="ds-cell-numeric">{formatDateTime(transaction.timestamp)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                title="No transactions resolved."
                description="Transaction hashes require an event-log scan. The public Creditcoin testnet RPC rejects log ranges wide enough to recover them from a single-id lookup, so none are shown rather than guessed. An indexer would populate this tab."
              />
            )}
          </TabPanel>
        ) : null}

        {tab === 'events' ? (
          <TabPanel>
            {settlement.events.length > 0 ? (
              <div className="ds-table-wrap">
                <table className="ds-table">
                  <thead>
                    <tr>
                      <th scope="col">Event</th>
                      <th scope="col">State</th>
                      <th scope="col">Meaning</th>
                      <th scope="col">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settlement.events.map((event) => (
                      <tr key={event.id}>
                        <td className="ds-cell-strong">{event.name}</td>
                        <td>{event.state ? <StatusBadge state={event.state} /> : '—'}</td>
                        <td style={{ whiteSpace: 'normal', maxWidth: 420 }}>{event.description}</td>
                        <td className="ds-cell-numeric">{formatDateTime(event.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                title="No events recorded."
                description="The coordinator emits an event for every state transition. None have been observed for this settlement."
              />
            )}
            <p className="ds-section-note" style={{ marginTop: 12 }}>
              Timestamps come from the two the coordinator stores on chain (prepareTime, readyTime).
              Transitions it does not timestamp show a dash instead of an inferred time.
            </p>
          </TabPanel>
        ) : null}
      </section>
    </>
  )
}

export default function SettlementDetailPage() {
  const params = useParams<{ id: string }>()
  const raw = decodeURIComponent(
    Array.isArray(params?.id) ? params.id[0] : (params?.id ?? ''),
  )

  const chainLookup = isSettlementId(raw)

  const result = useAsync(async () => {
    if (chainLookup) return settlementService.getBySettlementId(raw)
    return settlementService.getByReference(raw)
  }, [raw, chainLookup])

  if (result.loading) {
    return (
      <>
        <div style={{ marginTop: 18 }}>
          <Link className="ds-back" href="/dashboard/settlements">
            <ArrowLeft size={11} /> All settlements
          </Link>
        </div>
        <div style={{ paddingTop: 26 }}>
          <PanelSkeleton lines={3} height={22} />
          <div style={{ marginTop: 30 }}>
            <PanelSkeleton lines={7} />
          </div>
        </div>
      </>
    )
  }

  if (result.error) {
    const error = result.error
    if (error instanceof SettlementNotFoundError) {
      return (
        <>
          <div style={{ marginTop: 18 }}>
            <Link className="ds-back" href="/dashboard/settlements">
              <ArrowLeft size={11} /> All settlements
            </Link>
          </div>
          <div style={{ paddingTop: 26 }}>
            <EmptyState
              title="No settlement under this id."
              description={`The coordinator holds no record for ${truncateHash(raw, 12, 8)}. Settlement ids are derived from both chains, both parties, both tokens, amounts, lock references, and expiry — a mismatch in any field yields a different id.`}
            />
          </div>
        </>
      )
    }

    const unavailable = error instanceof ChainReadUnavailableError
    return (
      <>
        <div style={{ marginTop: 18 }}>
          <Link className="ds-back" href="/dashboard/settlements">
            <ArrowLeft size={11} /> All settlements
          </Link>
        </div>
        <div style={{ paddingTop: 26 }}>
          <ErrorState
            title={unavailable ? 'Chain reads are not configured.' : 'Unable to load this settlement.'}
            description={
              unavailable
                ? 'Set NEXT_PUBLIC_CREDITCOIN_RPC_URL and NEXT_PUBLIC_HANDSHAKE_ASC_ADDRESS to read the coordinator directly. See web/.env.example.'
                : error.message
            }
            onRetry={result.reload}
          />
        </div>
      </>
    )
  }

  if (!result.data) {
    return (
      <>
        <div style={{ marginTop: 18 }}>
          <Link className="ds-back" href="/dashboard/settlements">
            <ArrowLeft size={11} /> All settlements
          </Link>
        </div>
        <div style={{ paddingTop: 26 }}>
          <EmptyState
            title="Settlement not found."
            description="No record matches this reference. Use a bytes32 settlement id to query the coordinator directly."
          />
        </div>
      </>
    )
  }

  return <DetailBody settlement={result.data.data} />
}

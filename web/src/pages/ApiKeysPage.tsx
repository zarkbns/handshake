import { useState } from 'react'
import { KeyRound, Plus } from 'lucide-react'

import { CopyButton } from '@/components/dashboard/code-block'
import { Panel, SectionHeading } from '@/components/dashboard/primitives'
import { ToneBadge } from '@/components/dashboard/status-badge'
import { EmptyState, ErrorState, Notice, PanelSkeleton } from '@/components/dashboard/states'
import { formatDateTime, formatRelative } from '@/lib/handshake/format'
import { apiKeyService } from '@/lib/handshake/services'
import { useAsync } from '@/lib/handshake/use-async'

export function ApiKeysPage() {
  const keys = useAsync(() => apiKeyService.list(), [])
  const [createError, setCreateError] = useState<string | null>(null)
  const issuingAvailable = apiKeyService.issuingAvailable()

  const attemptCreate = async () => {
    setCreateError(null)
    try {
      await apiKeyService.create('New key')
      keys.reload()
    } catch (cause) {
      setCreateError(cause instanceof Error ? cause.message : String(cause))
    }
  }

  return (
    <div style={{ paddingTop: 22 }}>
      <SectionHeading
        title="API keys"
        note="Keys are shown masked. A full secret is only ever displayable once, at creation, by a server that holds it — the dashboard never stores or reconstructs one."
        action={
          <button
            type="button"
            className="ds-button"
            data-size="sm"
            onClick={attemptCreate}
            disabled={!issuingAvailable}
            title={
              issuingAvailable
                ? 'Create a new API key'
                : 'No credential service is configured in this deployment'
            }
          >
            <Plus size={11} /> Create key
          </button>
        }
      />

      {!issuingAvailable ? (
        <div style={{ marginBottom: 14 }}>
          <Notice title="Key issuance is not wired up">
            This repository contains no credential store or auth service, so there is nothing that
            can mint a key or return a secret exactly once. Creation stays disabled rather than
            generating a value locally, which would imply a security mechanism that does not exist.
            The UI is built against an ApiKeyService interface, so a real issuing endpoint drops in
            without component changes.
          </Notice>
        </div>
      ) : null}

      {createError ? (
        <div style={{ marginBottom: 14 }}>
          <Notice tone="danger" title="Could not create a key">
            {createError}
          </Notice>
        </div>
      ) : null}

      {keys.data?.notice ? (
        <div style={{ marginBottom: 14 }}>
          <Notice title="Sample credentials">
            {keys.data.notice} The masked values below are structurally invalid and cannot
            authenticate against anything.
          </Notice>
        </div>
      ) : null}

      {keys.loading ? (
        <Panel>
          <PanelSkeleton lines={6} />
        </Panel>
      ) : keys.error ? (
        <ErrorState description="Unable to load API keys." onRetry={keys.reload} />
      ) : keys.data && keys.data.data.length > 0 ? (
        <Panel padded={false}>
          {keys.data.data.map((key) => (
            <div className="ds-key-row" key={key.id} data-revoked={key.status === 'REVOKED' || undefined}>
              <div>
                <p className="ds-key-name">{key.name}</p>
                <div className="ds-key-value">
                  <span className="ds-hash">{key.maskedKey}</span>
                  <CopyButton value={key.maskedKey} label="Copy masked" />
                </div>
                <p className="ds-key-meta">
                  {key.environment} · created {formatDateTime(key.createdAt)} ·{' '}
                  {key.lastUsedAt ? `last used ${formatRelative(key.lastUsedAt)}` : 'never used'}
                </p>
              </div>
              <div className="ds-inline">
                <ToneBadge tone={key.status === 'ACTIVE' ? 'verified' : 'absent'}>
                  {key.status}
                </ToneBadge>
                <button
                  type="button"
                  className="ds-button"
                  data-variant="outline"
                  data-size="sm"
                  disabled={!issuingAvailable || key.status === 'REVOKED'}
                  title={
                    issuingAvailable
                      ? 'Revoke this key'
                      : 'Revocation requires the credential service that issues keys'
                  }
                >
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </Panel>
      ) : (
        <EmptyState
          icon={<KeyRound size={14} />}
          title="No API keys yet."
          description="Create a key to authenticate a relay worker or monitoring service against the settlement API."
        />
      )}

      <div className="ds-section">
        <SectionHeading title="Handling keys safely" />
        <Panel>
          <p className="ds-section-note" style={{ margin: 0, lineHeight: 1.75 }}>
            Never place a settlement signer key in frontend code or a VITE_ variable —
            anything prefixed VITE_ is inlined into the browser bundle. The signer keys the
            demo scripts use (DEPLOYER_PRIVATE_KEY, SELLER_PRIVATE_KEY, BUYER_PRIVATE_KEY,
            OPERATOR_PRIVATE_KEY) are server-side only and must stay out of this app entirely. This
            dashboard reads public chain state and needs no credential to do it.
          </p>
        </Panel>
      </div>
    </div>
  )
}
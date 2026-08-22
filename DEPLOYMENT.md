# Handshake Deployment

## Scope

The coordinator deploys `HandshakeASC` on Creditcoin with an Attestcoin verifier
adapter. Each source chain also deploys one `NativeSettlementLock` instance per
supported ERC-20 settlement leg.
The contract is non-custodial: source-chain asset and cash locks remain on their
native chains. The source-chain adapters must listen for the Creditcoin events and
only release or refund after the corresponding coordinator state is reached.

## Deployment

1. Deploy the production `IAttestationVerifier` adapter or identify the Creditcoin
   Attestcoin verifier/precompile address. Its `verifyPrepareLeg` implementation
   must validate the caller-bound source-chain lock, chain-specific finality
   buffer, settlement id, and continuity/inclusion proof. Its `verifyPrepare`
   implementation must validate both leg hashes in the same attestation quorum.
2. Deploy `HandshakeASC(verifierAddress)` on Creditcoin.
3. Configure the source-chain lock adapters with the deployed ASC address and the
   same settlement-id derivation used by the application.
4. Configure chain-specific finality buffers in the proof service before calling
   `submitProofs`.
5. Deploy `NativeSettlementLock` on each source chain with the production
   `ICommitStatus` adapter for that chain. The adapter must expose
   `isCommitted(settlementId)` only after observing a finalized Creditcoin
   `Committed` event through the approved cross-chain message path.
6. Configure the application to derive the same settlement ID for both locks
   using `SettlementId.derive` and the matching `scripts/settlement-id.js`
   encoder. Approve the lock contract for the intended ERC-20 amount before
   calling `lock`.

The local test verifier in `test/MockAttestationVerifier.sol` is for tests only and
must never be used on a public deployment.

The local `CommitStatusMock` in `test/NativeSettlementLock.t.sol` is also test
only. Do not deploy a source-chain lock with a caller-controlled commit status.

## Lifecycle

1. Seller and buyer create native-chain, reversible lock positions by calling
   `NativeSettlementLock.lock`, then call `prepare` with their proof references.
2. A keeper submits the aggregated Attestcoin proof through `submitProofs`.
3. Any party calls `commit` while the bounded window is open. This is the only
   irreversible coordinator transition.
4. Native-chain adapters observe the finalized `Committed` event through their
   configured `ICommitStatus` boundary and call `NativeSettlementLock.release`.
   The coordinator then records the finalization attestation through `settle`.
5. If `PREPARE` or `READY` times out, anyone calls `unlockHeld`. After the
   source-chain lock expiry, anyone may call `NativeSettlementLock.refund`;
   this path checks that Creditcoin has not committed but makes no attestor call.

## Evidence

`getHandshake(id)` exposes the lifecycle timestamps, both prepare proof hashes, the
accepted evidence manifest, and the final settlement evidence hash. Persist the
underlying proof payloads and chain finality metadata off-chain using the manifest
as the stable join key.

## Production Checklist

- Use the official Attestcoin / USC proof encoder and verifier adapter.
- Reject proofs that do not include the configured per-chain finality buffers.
- Derive settlement IDs from both parties, both source-chain lock references, and
  the intended amounts/assets so they cannot be replayed across trades.
- Keep source-chain locks reversible until a Creditcoin `Committed` event is observed.
- Make refund handlers permissionless after `Held` and independent of attestor uptime.
- Treat `HandshakeASC.isCommitted(id)` and the `Committed` event as the only
  authorization to make either native-chain leg irreversible.
- Keep the source-chain `ICommitStatus` adapter bound to finalized Creditcoin
  event delivery; never expose a public setter or caller-supplied boolean.
- Monitor `Prepared`, `CounterpartyPrepared`, `Ready`, `Committed`, `Settled`, and
  `Held` events for the demo operator dashboard.

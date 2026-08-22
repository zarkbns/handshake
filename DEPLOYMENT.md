# Handshake MVP Deployment

## Scope

The MVP deploys `HandshakeASC` on Creditcoin with an Attestcoin verifier adapter.
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

The local test verifier in `test/MockAttestationVerifier.sol` is for tests only and
must never be used on a public deployment.

## Lifecycle

1. Seller and buyer create native-chain, reversible lock positions and call
   `prepare` with their proof references.
2. A keeper submits the aggregated Attestcoin proof through `submitProofs`.
3. Any party calls `commit` while the bounded window is open. This is the only
   irreversible coordinator transition.
4. Native-chain adapters finalize both legs and submit the settlement attestation
   through `settle`.
5. If `PREPARE` or `READY` times out, anyone calls `unlockHeld`. Refund adapters
   may then unlock the original native-chain positions without another attestation.

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
- Monitor `Prepared`, `CounterpartyPrepared`, `Ready`, `Committed`, `Settled`, and
  `Held` events for the demo operator dashboard.

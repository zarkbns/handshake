# Handshake Deployment & Demo Runbook

Everything needed to deploy, verify, and demonstrate the full settlement
lifecycle on the Creditcoin Testnet + Ethereum Sepolia public testnets.

## Prerequisites

- [Foundry](https://getfoundry.sh) (build, test, deploy)
- Node.js ≥ 20 (`npm install` at repo root, and in `web/` for the dashboard)
- Two funded wallets: **seller** (Ethereum Sepolia ETH) and **buyer**
  (Creditcoin Testnet CTC). Sepolia faucet: any public faucet or wallet
  provider; Creditcoin testnet faucet: see the
  [Creditcoin docs](https://docs.creditcoin.org/).
- `.env` copied from `.env.example` (see the variable table below)

## Environment variables

| Variable | Required for | Meaning |
|---|---|---|
| `CREDITCOIN_RPC_URL` | everything | Creditcoin Testnet RPC (public default in `.env.example`) |
| `ETHEREUM_SEPOLIA_RPC_URL` | everything | Sepolia RPC (public default in `.env.example`) |
| `HANDSHAKE_ASC_ADDRESS` | demos, verify | Deployed `HandshakeASC` coordinator |
| `ETHEREUM_LOCK_ADDRESS` | demos, verify | Sepolia `NativeSettlementLock` (asset leg) |
| `CREDITCOIN_LOCK_ADDRESS` | demos, verify | Creditcoin `NativeSettlementLock` (payment leg) |
| `ETHEREUM_COMMIT_STATUS_ADDRESS` | release, verify | Sepolia `OperatorCommitStatus` adapter |
| `ATTESTCOIN_VERIFIER_ADDRESS` | verify (optional) | Creditcoin `AttestcoinVerifier` — enables wiring check |
| `CREDITCOIN_COMMIT_STATUS_ADDRESS` | verify (optional) | Creditcoin `CreditcoinCommitStatus` — enables wiring check |
| `SELLER_PRIVATE_KEY` | demo | Seller wallet (locks Ethereum asset, prepares attested leg) |
| `BUYER_PRIVATE_KEY` | demo | Buyer wallet (locks Creditcoin payment, prepares native leg) |
| `OPERATOR_PRIVATE_KEY` / `OPERATOR_ADDRESS` | release, verify | Operator for the Sepolia commit-report adapter |
| `DEMO_ERC20_ADDRESS` / `DEMO_CTC_TOKEN_ADDRESS` | demo | Demo ERC-20 tokens (see setup below) |
| `CREDITCOIN_FINALITY_CONFIRMATIONS` | release, relay | Creditcoin blocks before a COMMIT is final (default 10) |
| `COMMIT_DELAY` | release | Delay after a commit report before Sepolia release (default 300s) |
| `HANDSHAKE_BOND_AMOUNT_WEI` / `HANDSHAKE_BOND_BURN_BPS` | deploy | Griefing bond config (defaults: 0.01 CTC, 50%) |

All signer keys are read from the environment only; nothing is hardcoded.

## Deploy

Two Foundry scripts deploy the full system. `DeployCreditcoin` breaks the
coordinator ↔ payment-lock circular reference by predicting the lock's CREATE
address — deployment must start from a clean nonce sequence (no other
broadcasts between the four transactions).

**Ethereum Sepolia side** (deploys `OperatorCommitStatus` + asset lock):

```bash
export OPERATOR_ADDRESS=0x...      # dedicated operator key's address
export COMMIT_DELAY=300
export DEPLOYER_PRIVATE_KEY=0x...  # funded Sepolia wallet
forge script script/DeployEthereumLock.s.sol --rpc-url $ETHEREUM_SEPOLIA_RPC_URL --broadcast
```

**Creditcoin side** (deploys `AttestcoinVerifier` → `HandshakeASC` →
`CreditcoinCommitStatus` → payment lock, in one atomic sequence):

```bash
export ETHEREUM_LOCK_ADDRESS=0x... # from the step above
export ATTESTCOIN_CHAIN_KEY=1      # 1 = Ethereum Sepolia on CC3 Testnet
export DEPLOYER_PRIVATE_KEY=0x...  # funded Creditcoin wallet
forge script script/DeployCreditcoin.s.sol --rpc-url $CREDITCOIN_RPC_URL --broadcast
```

Record all four Creditcoin addresses and the two Ethereum addresses in `.env`.
The deployment is **not upgradeable by design** — a fix means a fresh deploy.

## Verify the deployment

```bash
npm run verify
```

Read-only. Checks both chain ids, bytecode at every address, and the
cross-contract wiring: `HandshakeASC.verifier → AttestcoinVerifier.sourceLock →
Ethereum lock`, both locks' `commitStatus` adapters, and the coordinator
pointer of `CreditcoinCommitStatus`. Exits non-zero on any failed check, so it
can gate a demo checklist.

## Demo token setup (one time)

The asset leg locks a demo ERC-20 on Sepolia; the payment leg locks a demo
token on Creditcoin. The repo's [`src/DemoERC20.sol`](./src/DemoERC20.sol)
works as-is (both demo scripts auto-mint when the seller/buyer balance is
short):

```bash
forge create src/DemoERC20.sol:DemoERC20 --rpc-url $ETHEREUM_SEPOLIA_RPC_URL --private-key $SELLER_PRIVATE_KEY
forge create src/DemoERC20.sol:DemoERC20 --rpc-url $CREDITCOIN_RPC_URL --private-key $BUYER_PRIVATE_KEY
```

Put the two addresses in `DEMO_ERC20_ADDRESS` / `DEMO_CTC_TOKEN_ADDRESS`.

## Run the live demo

```bash
npm run demo:lock      # locks 10 demo-ERC20 (seller→buyer) + 25 demo-CTC (buyer→seller)
                       # writes settlement-plan.json; wait ~2 min for Sepolia attestation
npm run demo:settle    # real Attestcoin proof → PREPARE → READY → COMMIT (bond posted by both)
npm run demo:release   # operator relays COMMIT → wait delay → release both legs → SETTLED
```

`demo:lock` derives the settlement id from both parties, tokens, amounts, lock
references, and expiry, and both legs lock under the **same id**. All steps
print the coordinator state after each transition and are idempotent.

**Failure-path demo** (a settlement whose counterparty never shows up):

```bash
npm run demo:refund    # buyer locks payment, nobody delivers the Ethereum leg;
                       # after lock expiry the buyer refunds unilaterally — no attestor
```

**Griefing-bond demo** (dual-PREPARE then mutual stall): the burn-split path is proven
by the Foundry suite — `forge test --match-test testDualPrepareStallBurnsConfiguredSplit`
(`test/HandshakeASC.t.sol`). It is deliberately **not** runnable against the public
testnet coordinator: `node scripts/demo-grief.js` fabricates an attested-leg proof, and
the real `AttestcoinVerifier` rejects any unproven leg at `prepareAttestedLeg` — it
fails closed by design. A real deployment must never accept a leg that was not proven
through Attestcoin; use `demo-settle.js` for the genuine cross-chain proof path and the
Foundry test (or a local mock-verifier deployment) for the economics demo.

## What each contract does

| Contract | Chain | Job |
|---|---|---|
| `HandshakeASC` | Creditcoin | Canonical state machine: dual-PREPARE gate, READY verification, irreversible COMMIT, HELD timeout, griefing bonds |
| `AttestcoinVerifier` | Creditcoin | Verifies Attestcoin inclusion + continuity proofs via the Block Prover precompile (0x0FD2); binds the proven `Locked` event to the settlement id and depositor |
| `NativeSettlementLock` | both | Non-custodial lock. `release` requires COMMIT (via its `ICommitStatus`); `refund` is permissionless after expiry if not committed |
| `CreditcoinCommitStatus` | Creditcoin | COMMIT oracle for the payment lock — reads the coordinator directly on the same chain |
| `OperatorCommitStatus` | Sepolia | Accepts operator-signed COMMIT reports bound to chain id + deployment + settlement id; a documented compromise until Attestcoin writability ships |

The coordinator is non-custodial: source-chain locks always retain custody, and
only the *state* (lock proven, commit reached, held) moves between chains.

## Lifecycle

1. Seller and buyer lock on their native chains under the same settlement id,
   then the canonical terms are registered (`registerTerms` — the coordinator
   recomputes the id from the terms and rejects any mismatch). Each party then
   prepares their leg (`prepareAttestedLeg` with an Attestcoin proof whose
   event economics must match the terms, `prepareNativeLeg` with full lock
   economics matched against the terms).
2. The settlement becomes READY automatically when the second leg verifies —
   there is no separate proof-submission step. The dual-verified-legs gate is
   the READY transition itself.
3. Anyone calls `commit` within the window — the only irreversible coordinator
   transition, and it happens only on Creditcoin. Permissionless COMMIT is safe
   because READY already proves both legs against the registered terms (see
   GUIDE.md's COMMIT authorization model).
4. The payment lock reads COMMIT natively; the operator relays the finalized
   COMMIT to the Sepolia adapter (`scripts/commit-relay.js` or `demo-release`),
   and after the commit delay both legs release. `settle` records the
   finalization evidence (delivery transaction references — evidence-recording
   only; release authorization lives in the native locks).
5. On any timeout before COMMIT, anyone calls `unlockHeld` — manually or via
   the keeper (`npm run keeper:timeouts`); after the local lock expiry, anyone
   may call `NativeSettlementLock.refund`. No attestor is involved in recovery.

## Evidence

`getHandshake(id)` exposes the lifecycle timestamps, both prepare proof hashes,
the accepted evidence manifest, and the final settlement evidence hash. Persist
the underlying proof payloads and chain finality metadata off-chain using the
manifest as the stable join key.

## Production checklist

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
- Replace `OperatorCommitStatus` with a message-verified inbox once Attestcoin
  writability ships.
- The local `MockAttestationVerifier` (test/) and `CommitStatusMock` are for
  tests only and must never be used on a public deployment.

## Monitoring

Watch the `TermsRegistered`, `Prepared`, `CounterpartyPrepared`, `Ready`,
`Committed`, `Settled`, `Held`, `BondPosted`, `BondsResolved`, and
`BondWithdrawn` events for the operator dashboard (the `web/` dashboard polls
the read-only views).

For timeout recovery, run the permissionless keeper on any funded wallet (no
attestor or operator key needed):

```bash
npm run keeper:timeouts -- --dry-run   # scan for settlements past their window
npm run keeper:timeouts                # move them to HELD so refunds can proceed
```

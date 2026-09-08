# Handshake

> **Cross-chain Delivery-versus-Payment settlement on Creditcoin — assets never leave their chains.** Handshake locks payment and asset under native custody on two chains, proves the foreign lock to Creditcoin with Attestcoin, and enforces one irreversible `COMMIT`. Zero bridges. Zero wrapping. Zero centralized oracles.

Built for **BUIDL CTC 2026 Fall (DeFi track)** on Creditcoin + the Attestcoin Protocol.

---

## How it works in 10 seconds

```
 Ethereum Sepolia                 Creditcoin Testnet
┌─────────────────────┐          ┌──────────────────────────────┐
│  Asset lock (ERC-20)│          │  HandshakeASC (coordinator)  │
│  NativeSettlementLock◄─Attestcoin─► State machine:            │
│                     │  proof    │  PREPARE → READY → COMMIT   │
│  Release only after │          │        ↘ timeout → HELD      │
│  Creditcoin COMMIT  │          │  Payment lock (native CTC)   │
└─────────────────────┘          └──────────────────────────────┘
```

Both parties lock funds on their own chains. Attestcoin's decentralized
attestors + Merkle inclusion + continuity proofs bring the *evidence* of the
Ethereum lock to Creditcoin — never the asset. The coordinator registers the
canonical trade terms (the settlement id itself is derived from them and
cannot drift), verifies both legs' full economics against those terms, and
once both are proven, `COMMIT` is called — the single point of no return. Miss
a timeout anywhere and either party can unilaterally refund — no attestor
required.

### Sequence

```mermaid
sequenceDiagram
    autonumber
    participant S as Seller (Ethereum)
    participant B as Buyer (Creditcoin)
    participant L as Asset lock (Sepolia)
    participant ASC as HandshakeASC (Creditcoin)
    participant V as Attestcoin verifier

    S->>L: lock(settlementId, token, buyer, amount)
    B->>B: lock payment on Creditcoin lock
    S->>ASC: registerTerms(id, terms) — id must derive from terms
    S->>ASC: prepareAttestedLeg(id, Attestcoin proof)
    V-->>ASC: precompile verifies inclusion+continuity<br/>+ event economics match terms
    B->>ASC: prepareNativeLeg(id)  [full lock economics<br/>checked against terms]
    Note over ASC: second verified leg → READY
    S->>ASC: commit(id) — permissionless
    Note over ASC: COMMIT — irreversible, Creditcoin only
    ASC-->>L: (relayed, finalized) release asset to buyer
    ASC-->>B: release payment to seller
    ASC->>ASC: settle(id, finalization report) — SETTLED
```

If any step stalls past its timeout window, anyone calls `unlockHeld(id)` and
both chains refund natively. Recovery never depends on attestor uptime.

### The three chains' roles

| Layer | Chain | Role |
|---|---|---|
| **Asset leg** | Ethereum Sepolia | Seller's ERC-20 locked in `NativeSettlementLock`; released only after a finalized Creditcoin `COMMIT` is reported by the operator-signed adapter, refundable by anyone after expiry |
| **Settlement coordination** | Creditcoin Testnet | `HandshakeASC` runs the canonical state machine, verifies Attestcoin proofs via the Block Prover precompile, and enforces the irreversible `COMMIT` boundary |
| **Attestation** | Attestcoin Protocol | Decentralized attestor quorum produces inclusion + continuity proofs of the Ethereum lock; Creditcoin's precompile verifies them on-chain |

---

## Attestcoin Protocol Integration

Handshake's entire trust model rests on the Attestcoin Protocol. Without it, there
is no way for the Creditcoin coordinator to know that a lock on Ethereum Sepolia
exists — the protocol is the *only* bridge of information between the two chains,
and it is integrated at three levels:

**1. On-chain proof verification via the Block Prover precompile (`0x0FD2`).**
`AttestcoinVerifier` (`src/AttestcoinVerifier.sol`) is a production adapter against
`@gluwa/usc-contracts`' `INativeQueryVerifier`. For every attested-leg prepare it
submits the raw proof bundle to the precompile, which checks the attestor quorum's
BLS-aggregated signatures, the Merkle inclusion proof of the source transaction,
and the continuity proof binding the attested header to the source chain. No
centralized oracle operator is involved at any point.

**2. Proof-to-settlement binding with full economics matching.** The verifier
decodes the precompile-verified transaction receipt, extracts the `Locked` event,
and requires every field to match the coordinator's registered canonical terms:
settlement id (event topic 1), token (topic 2), depositor == caller (topic 3), and
recipient, amount, and expiry (event data) — see `AttestcoinVerifier.sol:84-102`.
A proof of any other lock, or of the same lock replayed against different terms,
is rejected: the settlement id is itself derived from the full terms
(`SettlementId.derive`), so "which lock is this proof about?" is answered
cryptographically, not by bookkeeping.

**3. Off-chain proof production through the USC SDK.** `scripts/attestcoin-proof.js`
uses `@gluwa/usc-sdk`'s `ProofBuilder` against the Attestcoin proof-builder service
to fetch attestor-attested headers, generate the inclusion + continuity proof for
the exact lock transaction, and pre-verify it against the same precompile via
`PrecompileBlockProver.verifySingle` before submission — so the demo path exercises
the real SDK end to end (`npm run prove:ethereum`).

The native (Creditcoin) leg needs no proof: it is verified by reading lock state on
the coordinator's own chain. One integration boundary is documented rather than
hidden — Attestcoin *writability* (Creditcoin → source-chain messaging) is not yet
available, so the Ethereum-side release adapter (`OperatorCommitStatus`) accepts
operator-signed COMMIT reports as an explicitly scoped stand-in, signature-bound to
chain id + deployment + settlement id, with the message-verified inbox listed as the
production replacement (see the trust-model note and GUIDE.md).

**Try it live:** `npm run demo:lock` → wait ~2 min for Sepolia attestation →
`npm run demo:settle` (generates a fresh Attestcoin proof and submits it through
`prepareAttestedLeg`) → `npm run demo:release`. Every step is a real on-chain
transaction on Creditcoin Testnet + Ethereum Sepolia.

---

## Try Handshake in 3 minutes

Against the deployed public testnets (read-only checks — no keys needed):

```bash
git clone https://github.com/zarkbns/handshake && cd handshake
npm install && (cd web && npm install)   # deps
git submodule update --init --recursive  # pinned forge-std (see foundry.lock)
npm test                                 # 49 Solidity tests + script + web suites

# Verify the live deployment is healthy (read-only, ~30s):
export CREDITCOIN_RPC_URL=https://rpc.cc3-testnet.creditcoin.network
export ETHEREUM_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
export HANDSHAKE_ASC_ADDRESS=0xf01767EC94F8E9AfcD6266E63b6De3087cF56299
export ATTESTCOIN_VERIFIER_ADDRESS=0x06D3Fa27DeAda8C295267ecBB3A5054Ec2ADd0bc
export CREDITCOIN_COMMIT_STATUS_ADDRESS=0xf4A6A12Ad234139d75DbBaD69EA048Fe217B73cF
export CREDITCOIN_LOCK_ADDRESS=0x4A6a8fc2d9D02336D2C69983EFbc9957419e3Ebf
export ETHEREUM_LOCK_ADDRESS=0x07c4585391d0655E6f191535e6BeA57385e41b49
export ETHEREUM_COMMIT_STATUS_ADDRESS=0xBD448B840aB06a8aD9F9ad278534F8F22724e247
npm run verify
```

The verify step checks both chain ids, every contract's bytecode, and the full
cross-chain wiring — the fastest way to confirm the deployment is real.

**Full live demo** (needs two funded testnet wallets — see
[DEPLOYMENT.md](./DEPLOYMENT.md) for keys/faucets and the one-time demo-token
setup):

```bash
npm run demo:lock      # 1. lock both legs, derives + persists the settlement plan
npm run demo:settle    # 2. real Attestcoin proof → PREPARE → READY → COMMIT
npm run demo:release   # 3. deliver both legs after COMMIT → SETTLED
npm run demo:refund    # 4. (separate settlement) unilateral HELD refund, no attestor
```

Each step prints the on-chain state as it advances (`PREPARE → READY →
COMMITTED → SETTLED`) and is idempotent — safe to re-run if a step failed
halfway.

---

## State machine

```mermaid
stateDiagram-v2
    [*] --> PREPARE: first leg prepared (with bond)
    PREPARE --> PREPARE: second leg prepared
    PREPARE --> READY: second verified leg (both legs proven)
    READY --> COMMITTED: commit — IRREVERSIBLE (Creditcoin only)
    COMMITTED --> SETTLED: settle — finalization evidence recorded
    PREPARE --> HELD: timeout, anyone may call unlockHeld
    READY --> HELD: timeout, anyone may call unlockHeld
    HELD --> [*]: both chains refund natively
```

| State | Meaning | Who can advance it |
|---|---|---|
| `PREPARE` | One or both legs locked + registered, bonds posted | Each party prepares its own leg |
| `READY` | Both legs proven (Attestcoin proof verified by the precompile) | Anyone (keeper/relayer) |
| `COMMITTED` | Point of no return — settled on Creditcoin | Anyone, within the window |
| `SETTLED` | Both chains delivered, evidence recorded | Anyone |
| `HELD` | Timed out — refund path, no attestor needed | Anyone, permissionless |

## Security guarantees (each one tested)

Every guarantee below is enforced by contract code and covered by the Foundry
test suite (`forge test`):

| Guarantee | Test(s) |
|---|---|
| Settlement id is enforced as the canonical derivation of the full terms (no drift, no substitution) | `testRegisterTermsRejectsNonCanonicalId`, `testRegisterTermsRejectsConflictingTerms`, `testPrepareRequiresRegisteredTerms` |
| Native leg economics fully verified (token, depositor, recipient, amount, expiry) | `testNativeLegRejectsWrongToken`, `testNativeLegRejectsWrongAmount`, `testNativeLegRejectsWrongRecipient`, `testNativeLegRejectsWrongExpiry`, `testNativeLegRejectsWrongDepositorParty` |
| Foreign-chain lock can never satisfy the native leg | `testNativeLegRejectsForeignRightChainTerms` |
| Attested-leg proof is bound to the registered terms' economics | `testAttestedLegPassesTermsToVerifier`, `testAttestedLegRejectsWhenVerifierBindingFails` |
| No COMMIT before both legs are proven (READY gate) | `testCannotCommitBeforeReady`, `testPrepareRequiresVerifiedAttestedLeg`, `testSecondVerifiedPrepareTransitionsToReady` |
| COMMIT is irreversible and only happens on Creditcoin | `testDoubleCommitRejected`, `testCommittedSettlementCannotBeHeld` |
| HELD recovery is timeout-based, unilateral, attestor-independent | `testHeldRecoveryNeedsNoVerifier`, `testUnlockHeldBeforeTimeoutRejected` |
| Same party cannot occupy both legs | `testSamePartyCannotPrepareBothLegs` |
| Settlement ids deterministically bind every trade field (JS matches Solidity byte-for-byte) | `testChangingAnyTradeFieldChangesId`, `testLegOrderIsIntentional`, `testSettlementIdMatchesSolidityByteForByte` |
| Griefing bonds: honest first mover always refunded | `testSingleLegTimeoutRefundsHonestMoverInFull`, `testCommitRefundsBothBondsInFull` |
| Window expiry is enforced everywhere | `testCommitWindowExpiryFallsToHeld`, `testSecondPrepareLegRejectedAfterPrepareWindow` |
| Source locks refund after expiry without COMMIT; release requires COMMIT | `testRefundIsPermissionlessAfterExpiryWithoutCommit`, `testRefundCannotBypassCommitAfterExpiry`, `testReleaseRequiresCreditcoinCommit` |
| Operator reports are signature-bound to chain + deployment + settlement | `testSignatureIsBoundToThisDeployment`, `testRejectsNonOperatorSignature` |

**Trust model (stated plainly).** Handshake inherits Attestcoin's decentralized
attestor quorum (BLS-aggregated signatures + continuity proofs) for proving the
Ethereum lock. It adds no new trusted parties on the refund path: HELD → refund
requires zero attestor cooperation. Residual quorum-collusion risk on the
attestation path is inherited, not eliminated — Handshake claims verifiable
settlement coordination, not bank-grade legal finality. See
[GUIDE.md](./GUIDE.md) for the full trust analysis.

> **Deployment note (this demo):** the public testnet deployment uses one wallet
> for the deployer, seller, and operator roles. `OperatorCommitStatus` trusts the
> operator to only report COMMITs actually finalized on Creditcoin, so in this
> configuration that trust is held by the same party as the seller — acceptable
> for a demo, but a production deployment MUST run the relay worker on a
> dedicated operator key (see DEPLOYMENT.md).

---

## Architecture

| Component | Responsibility | Source |
|---|---|---|
| `HandshakeASC` | Canonical state machine, dual-PREPARE gate, COMMIT boundary, bonds | [`src/HandshakeASC.sol`](./src/HandshakeASC.sol) |
| `AttestcoinVerifier` | Verifies Attestcoin proofs via Creditcoin precompile; binds the proven lock event to the settlement | [`src/AttestcoinVerifier.sol`](./src/AttestcoinVerifier.sol) |
| `NativeSettlementLock` | Non-custodial lock used on both chains — release only after COMMIT, permissionless refund after expiry | [`src/NativeSettlementLock.sol`](./src/NativeSettlementLock.sol) |
| `CreditcoinCommitStatus` | Reads COMMIT directly from the coordinator (same chain) | [`src/CreditcoinCommitStatus.sol`](./src/CreditcoinCommitStatus.sol) |
| `OperatorCommitStatus` | Operator-signed COMMIT reports for the Sepolia lock (documented compromise until Attestcoin writability ships) | [`src/OperatorCommitStatus.sol`](./src/OperatorCommitStatus.sol) |
| `SettlementId` | Canonical cross-chain id derivation (both parties, tokens, amounts, lock refs, expiry) | [`src/SettlementId.sol`](./src/SettlementId.sol) |

**Deployed (public testnets, verified by `npm run verify`):**

| Contract | Network | Address |
|---|---|---|
| `HandshakeASC` | Creditcoin Testnet | `0xf01767EC94F8E9AfcD6266E63b6De3087cF56299` |
| `AttestcoinVerifier` | Creditcoin Testnet | `0x06D3Fa27DeAda8C295267ecBB3A5054Ec2ADd0bc` |
| `CreditcoinCommitStatus` | Creditcoin Testnet | `0xf4A6A12Ad234139d75DbBaD69EA048Fe217B73cF` |
| Creditcoin payment lock | Creditcoin Testnet | `0x4A6a8fc2d9D02336D2C69983EFbc9957419e3Ebf` |
| `OperatorCommitStatus` | Ethereum Sepolia | `0xBD448B840aB06a8aD9F9ad278534F8F22724e247` |
| Ethereum asset lock | Ethereum Sepolia | `0x07c4585391d0655E6f191535e6BeA57385e41b49` |

> The deployed coordinator carries the full security-remediation upgrade: canonical
> terms binding, full leg-economics verification, griefing bonds (0.01 CTC, 50%
> burn split), and an expiry-bound commit window — `commit` reverts once the
> canonical lock expiry is reached, so the permissionless lock refund can never be
> combined with a late commit to take both legs. `npm run verify` confirms the
> deployment with no `WARN`.

### Timeout recovery keeper

Any funded wallet can drive timeout recovery permissionlessly — no attestor,
no operator key:

```bash
node scripts/keeper-timeouts.js --dry-run   # scan for timed-out settlements
node scripts/keeper-timeouts.js             # move them to HELD
```

### Repo layout

```
src/           Solidity contracts (coordinator, verifier, locks, adapters)
test/          Foundry test suites (49 tests) + Node script tests
script/        Foundry deploy scripts (Creditcoin side, Ethereum side)
scripts/       Live demo + relayer tooling (Node, ethers, USC SDK)
web/           Read-only settlement dashboard (Vite + React)
config/        Testnet connection config template
GUIDE.md       Full design doc: trust model, sequencing, recovery semantics
DEPLOYMENT.md  Deployment, verification, and demo-run instructions
```

### Reproduce everything

```bash
npm install                                # root deps FIRST — forge builds need @gluwa/usc-contracts from node_modules
(cd web && npm install)                    # dashboard deps
git submodule update --init --recursive    # pinned forge-std (see foundry.lock)
npm test                                   # contracts + script tests + web tests
npm run verify                             # live deployment health check (read-only)
```

> `forge build` / `forge test` import `@gluwa/usc-contracts` through
> `node_modules` (see `remappings.txt`) — run `npm install` before any forge
> command in a fresh clone, or compilation fails with unresolved imports.

Contract tests: `forge test` · Gas snapshot: `forge snapshot` · Web dashboard:
`cd web && npm run dev`

---

## Documentation

- [GUIDE.md](./GUIDE.md) — full trust model, COMMIT sequencing, reorg handling, recovery semantics
- [DEPLOYMENT.md](./DEPLOYMENT.md) — deploy, verify, and run the live demo end to end

## Security notes

Handshake inherits Attestcoin's decentralized attestor security model (quorum +
aggregated signatures + continuity proofs). The refund path depends on no
attestor. This is not legal finality equivalent to traditional CCPs; residual
quorum and liveness assumptions on the attestation path apply and are stated in
GUIDE.md.

## License

MIT

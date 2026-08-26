# Handshake

**Cross-chain DvP settlement primitive on Creditcoin**

Native-asset settlement coordination via Attestcoin Protocol.  
Verified state only. Zero bridging. Zero wrapping. Zero centralized oracles.

---

### Overview

Handshake is a trust-minimized cross-chain Delivery-versus-Payment protocol built on Creditcoin.

It coordinates atomic settlement between heterogeneous chains by moving **attested settlement state** instead of assets. Source-chain positions remain locked under local custody while an Attestcoin Smart Contract (ASC) on Creditcoin enforces sequencing, finality buffers, and an irreversible `COMMIT` boundary.

Built for BUIDL CTC 2026 Fall (DeFi track).

---

### Problem

Cross-chain settlement remains fragmented:

- Bridges introduce custody + smart-contract surface area
- Centralized oracles create single points of failure
- Asynchronous finality leaves counterparties exposed during settlement windows
- Restricted assets cannot safely traverse bridges

Result: capital inefficiency and persistent settlement risk.

---

### Solution

Handshake elevates Creditcoin to settlement coordinator.

- The Ethereum Sepolia asset leg and Creditcoin payment leg execute under native custody
- Attestcoin supplies decentralized attestation + Merkle inclusion + continuity proofs for the Ethereum Sepolia lock
- ASC on Creditcoin maintains the canonical state machine and enforces the irreversible `COMMIT`

Settlement progresses only on verified external state.

---

### Core Properties

- **Native custody** — Assets never leave issuance chains
- **Attested state transfer** — Attestcoin decentralized attestors + cryptographic proofs
- **Irreversible COMMIT** — Explicit point-of-no-return on Creditcoin
- **Unilateral recovery** — Timeout-driven `HELD` path with no further attestor dependency
- **Finality-aware** — Configurable confirmation buffers + reorg resistance
- **Griefing-resistant** — Dual-PREPARE gating + bounded settlement window

---

### State Machine

1. `PREPARE` — Locks established on Ethereum Sepolia and Creditcoin  
2. Proof submission — The Ethereum inclusion + continuity proof and Creditcoin-native lock are verified  
3. `READY` — Both settlement legs are confirmed  
4. `COMMIT` — Irreversible settlement authorization on Creditcoin  
5. Native finalization **or** timeout → `HELD` → unilateral unlock

---

### Architecture

| Component              | Responsibility                              |
|------------------------|---------------------------------------------|
| Ethereum Sepolia      | Attestcoin-proven asset lock / release      |
| Creditcoin Testnet    | Native payment lock and settlement coordination |
| Attestcoin Protocol    | Decentralized attestation + proof generation |
| Creditcoin ASC         | Canonical state machine + COMMIT enforcement|
| Handshake Contracts    | Business logic, timeouts, recovery paths    |

**Stack**
- Creditcoin + Attestcoin Protocol
- Solidity (ASC)
- Attestcoin / USC SDK
- Initial networks: Creditcoin Testnet and Ethereum Sepolia
- Attestcoin proves the Ethereum Sepolia leg; the Creditcoin leg is native to the coordinator network.

---

### Status

The Solidity coordinator, the production Attestcoin verifier, and the native-chain
ERC-20 lock primitive are implemented and covered by tests. The coordinator provides
the complete Creditcoin lifecycle: verified per-leg preparation, the dual-PREPARE
gate, bounded COMMIT, post-COMMIT settlement attestation, and attestor-independent
HELD recovery.

**Deployed (public testnets):**

| Contract | Network | Address |
|---|---|---|
| `HandshakeASC` | Creditcoin Testnet | `0x905E0f141D8B5333F49755B08395d1beAdEd74Ab` |
| `AttestcoinVerifier` | Creditcoin Testnet | `0xcB04133cEeD70bbb9692D528F21B7205838eAa13` |
| `CreditcoinCommitStatus` | Creditcoin Testnet | `0x2002dcc1341707e7a6D6d5dC49EE7e610B9d4680` |
| Creditcoin payment lock | Creditcoin Testnet | `0xb3e9cB40A52EF777A29b6198f4c2D8d19893a01D` |
| `OperatorCommitStatus` | Ethereum Sepolia | `0xbD42128dFDd2B381fF416FffE8D699F840562067` |
| Ethereum asset lock | Ethereum Sepolia | `0x999326d027316C6CD0156a39ac8d3792f2EFC802` |

**Settlement ID API.** The coordinator is two-leg: `prepareAttestedLeg(id, proof)`
(Ethereum leg, proven through Attestcoin) and `prepareNativeLeg(id)` (Creditcoin leg,
verified directly against the native lock). `submitProofs` -> `READY`, `commit` ->
`COMMITTED`, `settle` -> `SETTLED`, `unlockHeld` -> `HELD`.

Settlement IDs are derived canonically from both chains, parties, token addresses,
amounts, lock references, and expiry. The Solidity encoder is in `src/SettlementId.sol`;
the matching Node.js helper is in `scripts/settlement-id.js`.

The live demo tooling lives in `scripts/`:
- `demo-lock.js` — derive a settlement id and lock both legs.
- `demo-settle.js` — generate a real Attestcoin proof and drive
  `PREPARE -> READY -> COMMIT`.
- `demo-release.js` — deliver both legs after COMMIT and record `settle`.
- `demo-refund.js` — demonstrate the unilateral HELD refund path.
- `attestcoin-proof.js` — generate and verify a real Ethereum Sepolia proof via Attestcoin.

**Frontend note (read-only dashboard):** the frontend should only read on-chain state and
render it — poll the coordinator's `getHandshake(id)` and the two lock contracts. It should
not drive settlement. See `scripts/coordinator-client.js` for the coordinator ABI and
`config/testnets.example.json` for the RPC/address env vars.

---

### Documentation

- [Design Guide](./GUIDE.md) — Full trust model, sequencing rules, reorg handling, and recovery semantics

---

### Security Notes

Handshake inherits Attestcoin’s decentralized attestor security model (quorum + aggregated signatures + continuity proofs). It does not provide legal finality equivalent to traditional CCPs. Residual quorum and liveness assumptions apply.

---

### License

MIT

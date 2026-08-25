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

The Solidity coordinator and native-chain ERC-20 lock primitive are implemented
and test-covered locally. The coordinator provides
the complete Creditcoin lifecycle, including verified per-leg preparation, the
dual-PREPARE gate, bounded COMMIT, post-COMMIT settlement attestation, and
attestor-independent HELD recovery.

The repository does not include a production Attestcoin verifier implementation:
that adapter is supplied by the Creditcoin deployment environment. Native-chain
commit-status adapters are also supplied by the source-chain deployment
environment. See [Deployment](./DEPLOYMENT.md) for the required integration
boundary and ordering rules.

Settlement IDs are derived canonically from both chains, parties, token
addresses, amounts, lock references, and expiry. The Solidity encoder is in
`src/SettlementId.sol`; the matching Node.js helper is in
`scripts/settlement-id.js`.

The initial operations layer is in `scripts/settlement-plan.js`,
`scripts/coordinator-client.js`, and `scripts/relayer.js`. It validates plans,
uses the ASC ABI, requires separate signers for both PREPARE legs, and supports
retry-safe progression through proof submission, COMMIT, and HELD recovery.

---

### Documentation

- [Design Guide](./GUIDE.md) — Full trust model, sequencing rules, reorg handling, and recovery semantics

---

### Security Notes

Handshake inherits Attestcoin’s decentralized attestor security model (quorum + aggregated signatures + continuity proofs). It does not provide legal finality equivalent to traditional CCPs. Residual quorum and liveness assumptions apply.

---

### License

MIT

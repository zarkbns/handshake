# Handshake – Internal Design Document

**Version:** 0.2  
**Track:** DeFi | BUIDL CTC 2026 Fall (Attestcoin Protocol)  
**Date:** 21 August 2026  
**Status:** Working backbone for the team

Cross-chain Delivery-versus-Payment (DvP) settlement on Creditcoin. Assets stay on their native chains. Only verified settlement state is proven on Creditcoin using the Attestcoin Protocol. No bridges, no wrapped assets, no single centralized oracle.

**Why it matters:**  
Solves the messy problem of settling value across chains without the usual bridge and oracle risks. Fits the DeFi track and shows real use of Attestcoin.

**Key design decisions:**
- COMMIT (point of no return) happens only on Creditcoin.
- HELD / refund is timeout-based and unilateral — no need for attestors to refund.
- We inherit Attestcoin’s attestor model (decentralized quorum + continuity proofs). We do not claim it is automatically safer than every alternative or that it has bank-grade legal recourse.
- Explicit protections against reorgs and griefing in the PREPARE window.
- Liveness failures degrade to refund instead of permanent lock.

**Demo must have 3 slides:**
1. Attestor trust assumptions
2. COMMIT sequencing & reorg handling
3. HELD refund path

Everything below is the detailed backbone. Read it when you need full context or are implementing.

---

## Project Overview

**Name:** Handshake

**One-liner:**  
Cross-chain Delivery-versus-Payment (DvP) settlement on Creditcoin. Assets stay on their native chains. Only cryptographically verified settlement state is proven on Creditcoin via the Attestcoin Protocol — no bridges, no wrapped assets, no single centralized oracle.

**Track:** DeFi

**Core Goal:**  
Demonstrate non-trivial, production-minded use of the Attestcoin Protocol for real cross-chain business logic while solving a practical DeFi settlement problem.

---

## Problem Statement

Multi-chain DeFi still lacks clean settlement primitives:

- Bridges introduce custody and smart-contract risk
- Centralized oracles create single points of failure
- Different finality times leave one party exposed
- Many assets (especially restricted or compliance-sensitive ones) cannot be safely bridged

Result: capital inefficiency and persistent counterparty / infrastructure risk when settling across chains.

---

## Solution Summary

Handshake makes Creditcoin the settlement coordinator.

- Asset leg and cash leg execute on their original chains
- Only verified facts (Prepared, Ready, Committed, Released, Held) are proven on Creditcoin using Attestcoin’s decentralized attestors + Merkle inclusion proofs + continuity proofs
- An Attestcoin Smart Contract (ASC) on Creditcoin drives the state machine and enforces the irreversible COMMIT point

---

## Trust & Attestors

**Who are the attestors?**  
Attestcoin operates a decentralized set of independent attestors that monitor source chains and produce attestations. This is a protocol-managed decentralized set (not a single operator, not fully permissionless at present).

**Quorum & Collusion Resistance**
- Attestations require a quorum of attestors
- Signatures are aggregated (BLS)
- Continuity proofs link attestations over time so that tampering with history is detectable
- A single attestor or small minority cannot unilaterally force a false state

**Security Model**  
We inherit Attestcoin’s security assumptions rather than inventing new ones. We do not claim that “more attestors automatically equals safer than one oracle.” We claim the model is the published Attestcoin decentralized attestation model, which is stronger than a single trusted party but still carries residual quorum-collusion risk. This risk is stated explicitly.

**Liveness**  
If attestors delay or go offline:
- Source-chain PREPARE locks have timeouts
- The ASC cannot reach COMMIT without valid proofs
- The system degrades to the HELD + refund path
- Parties are never left locked indefinitely

---

## COMMIT – Point of No Return

**Location of COMMIT**  
COMMIT is an on-chain event only on Creditcoin (inside the ASC).  
Source chains do not have an independent COMMIT transaction in the current design (writability is out of scope for the hackathon).

**Sequencing & Reorg Handling**
- Attestcoin already lags behind the tip of source chains to reduce reorg risk
- We require configurable finality buffers on each source chain before accepting proofs
- Irreversible actions on a fast chain are never treated as final until Creditcoin has COMMITted
- Ordering rule: No irreversible source-chain payout is allowed before Creditcoin COMMIT

**Timeouts**
- Configurable window from dual PREPARE → required COMMIT
- After timeout the state moves to HELD
- Gas for timeout / recovery is paid by the calling party or a keeper

---

## HELD State & Refund Path

HELD is intentionally designed to be timeout-based and unilateral:

- Once the timeout is reached without a valid COMMIT, the original locker (or a permissionless function after a delay) can unlock the source-chain position
- No additional attestor cooperation is required for the refund itself
- The Creditcoin ASC records the HELD state for auditability and transparency

This ensures we do not merely delay a trust dependency — recovery does not depend on attestor liveness.

---

## Griefing Protection (PREPARE → COMMIT)

**Risk**  
After one party PREPAREs, the counterparty could stall if the market moves.

**Mitigations**
- Both sides must successfully PREPARE before the ASC can enter READY
- Short, configurable dual-PREPARE → COMMIT window
- Optional bond/penalty mechanism on Creditcoin (can be added)
- Either party (or a keeper) can submit proofs and drive progress, or the timeout path activates

The first mover is not left indefinitely exposed.

---

## Positioning

We do not claim that a decentralized attestor quorum provides the same legal finality, capital backing, or recourse as a traditional central securities depository or custodian.

**Correct positioning for the DeFi track:**  
Handshake is a cryptographically verifiable settlement coordination layer that reduces reliance on bridges and single oracles. It is suitable for DeFi protocols and crypto-native flows where participants already accept smart-contract and attestation risk.

---

## High-Level Flow

1. Seller PREPAREs / locks asset on Chain A  
2. Buyer PREPAREs / locks cash on Chain B  
3. Inclusion + continuity proofs of both events are submitted to the ASC on Creditcoin  
4. ASC verifies proofs via Attestcoin → moves to READY  
5. Fresh verification window → irreversible COMMIT on Creditcoin  
6. Parties finalize delivery and release on native chains  
   **or**  
   Timeout → HELD → unilateral refund path

---

## Technical Notes

- Creditcoin: Attestcoin Smart Contracts (Solidity) + native query verifier precompile
- Proofs: Official Attestcoin / USC SDK
- Source chains: Start with Ethereum Sepolia + Base Sepolia
- State machine must enforce the irreversible COMMIT boundary and timeout paths described above
- Maintain full evidence manifests for every settlement (strong signal for judges)

---

## Open Items for the Team

- [ ] Finalize exact asset + cash leg example for the demo
- [ ] Decide timeout parameters and whether to include a bond
- [ ] Confirm current Attestcoin testnet status and SDK readiness
- [ ] Assign owners for the three mandatory demo slides
- [ ] Draft the ASC interface and state transitions

---

**This document is the single source of truth for context, design decisions, and risk positioning.**  
All future updates should be reflected here.

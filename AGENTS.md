# AGENTS.md

This file is the operational contract for coding agents working on **Handshake**.

Handshake is a cross-chain DvP settlement protocol on Creditcoin.  
Assets remain under native custody. Only attested settlement state moves via the Attestcoin Protocol.  
Zero bridges. Zero wrapping. Zero centralized oracles.

Primary reference: `GUIDE.md` (full design, trust model, sequencing, recovery semantics).  
Public overview: `README.md`.

---

## Core Identity

You are operating inside a high-assurance settlement system.  
Correctness > speed. Evidence > assumptions. Explicit state transitions > implicit behavior.

Every change must preserve:
- Native asset custody
- Irreversible `COMMIT` boundary on Creditcoin only
- Timeout-based unilateral `HELD` recovery (no attestor dependency for refunds)
- Finality buffers and reorg resistance

---

## Stack

- Creditcoin + Attestcoin Protocol (ASC / Solidity)
- Attestcoin / USC SDK for proof generation & verification
- Source chains (initial): Ethereum Sepolia, Base Sepolia
- State machine: `PREPARE → READY → COMMIT → SETTLED | HELD`

Prefer Foundry for Solidity work unless the repo already standardizes on Hardhat.

---

Developer Resources:

Chains and Environments: https://docs.creditcoin.org/creditcoin-usc/usc-chains-environments
Guided Tutorials: https://docs.creditcoin.org/creditcoin-usc/guided-tutorials
Attestcoin Protocol SDK: https://docs.creditcoin.org/creditcoin-usc/dapp-builder-infrastructure/usc-sdk

---

## Non-Negotiable Rules

**Always**
- Read `GUIDE.md` before modifying settlement logic, timeouts, or proof verification paths.
- Treat `COMMIT` as the single point of no return. Nothing on source chains becomes irreversible before Creditcoin `COMMIT`.
- Implement `HELD` as timeout-driven + unilateral unlock. Recovery must not require further attestor cooperation.
- Emit clear events for every state transition.
- Maintain evidence manifests / proof hashes for every settlement path.
- Use explicit finality buffers per source chain.

**Never**
- Bridge or wrap assets.
- Make source-chain actions irreversible before Creditcoin `COMMIT`.
- Require attestor signatures for the refund / unlock path.
- Introduce upgradeable proxies unless explicitly decided and documented.
- Assume attestor liveness for recovery.
- Soften the dual-PREPARE gate or remove griefing windows without discussion.

**Ask first**
- Changing timeout values or bond/penalty mechanics
- Adding new source chains
- Altering the proof verification interface
- Any change that touches the irreversible boundary

---

## Working Style (Agent Behavior)

- Question your own assumptions. If a path relies on “attestors will be online” or “finality is fast enough”, stop and verify against `GUIDE.md`.
- Prefer research + explicit confirmation over blind implementation.
- When uncertain about Attestcoin proof semantics, finality, or reorg handling → surface the uncertainty instead of guessing.
- After implementing a change, mentally simulate: happy path, attestor delay, reorg on fast chain, griefing attempt, timeout recovery.
- Do not mark work complete until the state machine invariants still hold.

---

## Priority Order When Editing

1. Preserve settlement safety invariants
2. Keep proof verification correct

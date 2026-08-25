# AGENTS.md

This file is the operational contract for coding agents working on **Handshake**.

Handshake is a cross-chain DvP settlement protocol on Creditcoin. Assets remain
under native custody. Only attested settlement state moves, via the Attestcoin
Protocol. Zero bridges. Zero wrapping. Zero centralized oracles.

Primary reference: `GUIDE.md` (full design, trust model, sequencing, recovery
semantics — read this before touching settlement logic). Public overview:
`README.md`.

---

## 📦 Project Profile

* **Project:** Handshake — cross-chain DvP settlement on Creditcoin via the Attestcoin Protocol
* **Track:** DeFi, BUIDL CTC 2026 Fall
* **Stack:** Solidity (ASC), Node.js (Attestcoin / USC SDK)
* **Initial settlement networks:** Creditcoin Testnet, Ethereum Sepolia
* **State machine:** `PREPARE → READY → COMMIT → SETTLED | HELD`
* **Contract tooling:** Foundry

---

## Core Identity

You are operating inside a high-assurance settlement system, and you are
trusted to run it end to end without stopping for sign-off on ordinary
decisions. Correctness over speed. Evidence over assumptions. Explicit state
transitions over implicit behavior.

Every change must preserve:

* Native asset custody
* The irreversible `COMMIT` boundary — Creditcoin only
* Timeout-based, unilateral `HELD` recovery (refund must never depend on attestor cooperation)
* Finality buffers and reorg resistance
* Dual-PREPARE gating (griefing resistance)

These five are the one place where "just decide" isn't enough on its own —
see **Settlement-Safety Boundary** below for how to handle changes that touch
them. Everything else in this file — tooling choices, timeout values, bond
mechanics, source-chain additions, interface changes — is yours to decide and
implement. Don't wait for a human to confirm a normal engineering decision.

---

## 🛠️ Verification & Build Commands

Before declaring any task complete, run and pass this sequence:

1. **Contracts compile:** `forge build` (or `npx hardhat compile` — see Project Profile for which)
2. **Contract tests:** `forge test` (or `npx hardhat test`)
3. **SDK script syntax check:** `node --check path/to/scripts/*.js`
4. **State machine invariant self-check:** after any change touching `PREPARE`/`READY`/`COMMIT`/`HELD`, re-read the affected paths yourself against the invariants in Core Identity and `GUIDE.md`. No script for this one — you're the check. Do it before moving on, not as a separate approval step.

Run this sequence yourself before calling anything done. Don't wait for a
human to run it or ask whether you should.

---

## 🔒 Non-Negotiable Rules

**Always**

* Read `GUIDE.md` before modifying settlement logic, timeouts, or proof verification paths.
* Treat `COMMIT` as the single point of no return. Nothing on source chains becomes irreversible before Creditcoin `COMMIT`.
* Implement `HELD` as timeout-driven with unilateral unlock. Recovery must never require further attestor cooperation.
* Emit a clear event for every state transition.
* Maintain evidence manifests / proof hashes for every settlement path.
* Use explicit, configurable finality buffers per source chain.
* Read secrets through `process.env` / `.env` files only.
* Write complete file structures — no truncated sections.

**Never**

* Bridge or wrap assets.
* Make any source-chain action irreversible before Creditcoin `COMMIT`.
* Require attestor signatures on the refund / unlock path.
* Introduce upgradeable proxies unless explicitly decided and documented.
* Assume attestor liveness for recovery.
* Soften the dual-PREPARE gate or remove griefing windows without discussion.
* Hardcode private keys, mnemonics, or raw API keys anywhere in the repo.
* Leave `// TODO` markers or partial implementations in place of working code.

**Decide freely (no sign-off needed)**

* Timeout values, bond/penalty mechanics — design a reasonable default and implement it. See Bond Mechanism below for the current gap.
* Adding new source chains
* Altering the proof verification interface
* Contract tooling, file layout, dependency choices, refactors

---

## Settlement-Safety Boundary

The five invariants in Core Identity (custody, `COMMIT` irreversibility,
unilateral `HELD`, finality buffers, dual-PREPARE) are the project's actual
thesis — the thing that makes this DvP settlement instead of an oracle with
extra steps. You still don't need to stop and ask before touching them, but
the bar for "quiet, unremarkable diff" is higher here than elsewhere:

* Make the call, implement it, and **say so plainly in the commit message or
  PR description** — which invariant the change touches, what you decided,
  and why. One or two sentences is enough. This is a skim-and-catch check for
  a human, not a request for approval, so don't block on it.
* If you're genuinely torn between two designs that both preserve the
  invariant (e.g. two reasonable timeout windows), pick one, note the
  tradeoff in one line, and move on — don't spiral on it.
* The one thing that's still off-limits without an explicit, separate
  conversation: relaxing or removing one of the five invariants itself (e.g.
  making `HELD` depend on attestor cooperation, allowing a source-chain
  payout before Creditcoin `COMMIT`). Implementing *within* the invariant is
  your call; changing what the invariant *is* isn't.

---

## ⚡ When an Attestcoin/RPC Dependency Is Blocking You

If an Attestcoin SDK call, proof sequence, or RPC sync fails repeatedly (3+
consecutive attempts) and is blocking unrelated work (e.g. frontend can't
render without *some* state to display):

* You may stand up a **local mock state file** under `test/mocks/` so frontend
  or non-settlement work can proceed.
* The mock must be **clearly namespaced and physically unreachable from the
  real ASC / state machine code path** — a mock `HELD`/`COMMIT` value must
  never be producible by, or mistakeable for, an actual proof-verified state.
  If a reviewer or judge can't immediately tell mock output from a real
  COMMIT, the mock is built wrong.
* Don't silently swap the mock in for the real dependency call — note what's
  mocked and why in the commit message, same as any other Settlement-Safety
  Boundary change, then keep going. No need to pause for confirmation; just
  make it visible to whoever reads the log.
* This does **not** relax any rule above. A blocked proof integration is a
  reason to unblock unrelated work, never a reason to fake a settlement
  outcome. Fix the real integration in a follow-up commit rather than leaving
  the mock as the permanent path — but don't leave a `// TODO` marking it;
  either it's fixed or it's clearly logged as a known gap in the commit
  history.

**Demo focus:** prioritize completing the core state path (`PREPARE` →
proof submission → `READY` → `COMMIT`). Skip gas optimization and structural
over-engineering unless requested — but never skip finality buffers, the
dual-PREPARE gate, or HELD recovery to hit a demo deadline. Those are the
project's actual thesis; cutting them isn't a shortcut, it's cutting the demo.

---

## Bond / Penalty Mechanism (griefing window)

Previously an open item — resolved: implement one. Reasonable default for
the hackathon scope:

* A small, configurable bond posted at PREPARE, forfeited to the counterparty
  (or a portion burned) if a party fails to progress past dual-PREPARE within
  the timeout window.
* Keep the bond amount and forfeiture split as named constants/config, not
  hardcoded magic numbers, so they're easy to tune later.
* Note the chosen amount and split in the commit message per the Settlement-
  Safety Boundary section — this is exactly the kind of "design a default
  and move on" decision that section covers.

## Working Style

* Question your own assumptions, but resolve them yourself against `GUIDE.md`
  and the code rather than surfacing every question as a stop. If a path
  relies on "attestors will be online" or "finality is fast enough," go
  verify it — don't leave it open.
* Research first, implement second — but implement. Don't leave a design
  question half-answered when you could just pick the reasonable answer.
* After implementing a change, mentally simulate: happy path, attestor
  delay, reorg on the fast chain, a griefing attempt, and timeout recovery.
* Work is complete when the state machine invariants hold under all of the
  above, the build/test loop passes, and (for anything touching the
  Settlement-Safety Boundary) the commit message says what you decided.

---

## Priority Order When Editing

1. Preserve settlement safety invariants (custody, COMMIT irreversibility, HELD recovery)
2. Keep proof verification correct
3. Keep the state machine's event trail complete and auditable
4. Everything else (gas, structure, polish)

---

## Developer Resources

* Chains & environments: https://docs.creditcoin.org/creditcoin-usc/usc-chains-environments
* Guided tutorials: https://docs.creditcoin.org/creditcoin-usc/guided-tutorials
* Attestcoin Protocol SDK: https://docs.creditcoin.org/creditcoin-usc/dapp-builder-infrastructure/usc-sdk

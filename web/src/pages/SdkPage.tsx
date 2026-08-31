import { CodeBlock } from '@/components/dashboard/code-block'
import { Definition, DefinitionGrid, Panel, SectionHeading } from '@/components/dashboard/primitives'
import { Notice } from '@/components/dashboard/states'
import { CREDITCOIN, ETHEREUM_SEPOLIA } from '@/lib/handshake/chains'

/**
 * SDK page.
 *
 * Documents what the repository actually ships: the official Attestcoin/USC SDK
 * plus the local coordinator modules under `scripts/`. There is no published
 * `@handshake/sdk` package, so none is advertised.
 */

const INSTALL = `# Attestcoin / USC SDK and the ethers client the coordinator modules use
npm install @gluwa/usc-sdk @gluwa/usc-contracts ethers`

const DERIVE_ID = `const { deriveSettlementId } = require('./scripts/settlement-id')

// The id binds both chains, both parties, both tokens, both amounts, both lock
// references, and the expiry. Change any field and you get a different id, so a
// settlement cannot be replayed across trades.
const settlementId = deriveSettlementId({
  leftChainId: ${ETHEREUM_SEPOLIA.id},   // Ethereum Sepolia — attested leg
  rightChainId: ${CREDITCOIN.id},         // Creditcoin — native leg
  leftParty: sellerAddress,
  rightParty: buyerAddress,
  leftToken: assetTokenAddress,
  rightToken: paymentTokenAddress,
  leftAmount: assetAmount.toString(),
  rightAmount: paymentAmount.toString(),
  leftLockReference,
  rightLockReference,
  expiry,
})`

const LIFECYCLE = `const { createCoordinatorClient } = require('./scripts/coordinator-client')

const coordinator = createCoordinatorClient(signer, import.meta.env.VITE_HANDSHAKE_ASC_ADDRESS)

// 1. PREPARE — the Ethereum asset leg, proven through Attestcoin.
await coordinator.prepareAttestedLeg(settlementId, encodedAttestcoinProof)

// 2. PREPARE — the Creditcoin payment leg, read directly from the native lock.
//    A distinct signer: the coordinator rejects both legs from one party.
await coordinatorAsBuyer.prepareNativeLeg(settlementId)

// 3. READY — one attestation binding both prepare commitments (dual-PREPARE gate).
await coordinator.submitProofs(settlementId, attestations)

// 4. COMMIT — the irreversible boundary. Creditcoin only, and only inside the
//    bounded window after READY; it reverts once that window closes.
await coordinator.commit(settlementId)

// Read state at any point. Ordinals: NONE, PREPARE, READY, COMMITTED, SETTLED, HELD.
const state = await coordinator.state(settlementId)`

const PROVE = `const { proveEthereumSepoliaTransaction } = require('./scripts/attestcoin-proof')

// Waits until Attestcoin has attested the block height, fetches the inclusion +
// continuity proof, and verifies it against the Creditcoin Block Prover
// precompile before you submit it on chain.
const proof = await proveEthereumSepoliaTransaction({
  transactionHash: assetLockTxHash,
})`

const RECOVERY = `// HELD is timeout-driven and needs no attestor cooperation. Anyone may call it
// once the PREPARE or READY window has expired without a COMMIT.
await coordinator.unlockHeld(settlementId)

// Then, after the source-chain lock expiry, the depositor gets their funds back
// directly from the lock contract. This path makes no attestor call at all.
await lock.refund(settlementId)`

export function SdkPage() {
  return (
    <div style={{ paddingTop: 22 }}>
      <Notice tone="neutral" title="Package status">
        Handshake does not publish an npm package yet. What ships today is the official Attestcoin /
        USC SDK plus the coordinator modules in this repository under <code>scripts/</code>. The
        snippets below use those real module and method names, so they match the deployed
        coordinator ABI exactly.
      </Notice>

      <div className="ds-section">
        <SectionHeading title="Install" />
        <CodeBlock code={INSTALL} filename="shell" />
      </div>

      <div className="ds-section">
        <SectionHeading
          title="Derive the settlement id"
          note="Both legs must lock against the identical id. The Solidity encoder is src/SettlementId.sol; the Node helper below produces the same value."
        />
        <CodeBlock code={DERIVE_ID} filename="settlement-id.js" />
      </div>

      <div className="ds-section">
        <SectionHeading
          title="Drive the lifecycle"
          note="PREPARE → READY → COMMIT, in the order the coordinator enforces."
        />
        <CodeBlock code={LIFECYCLE} filename="coordinator-client.js" />
      </div>

      <div className="ds-section">
        <SectionHeading
          title="Generate an Attestcoin proof"
          note="The attested leg needs a real inclusion + continuity proof. This helper produces one and pre-verifies it against the on-chain prover."
        />
        <CodeBlock code={PROVE} filename="attestcoin-proof.js" />
      </div>

      <div className="ds-section">
        <SectionHeading
          title="Recovery"
          note="The refund path never depends on attestor liveness. That is a design invariant, not a fallback."
        />
        <CodeBlock code={RECOVERY} filename="recovery.js" />
      </div>

      <div className="ds-section">
        <SectionHeading title="Coordinator surface" />
        <Panel padded={false}>
          <DefinitionGrid>
            <Definition
              label="prepareAttestedLeg(id, proof)"
              value="Registers the Ethereum Sepolia leg against an Attestcoin inclusion + continuity proof. NONE → PREPARE."
            />
            <Definition
              label="prepareNativeLeg(id)"
              value="Registers the Creditcoin leg by reading the native lock directly. No Attestcoin proof needed on the coordinator’s own chain."
            />
            <Definition
              label="submitProofs(id, attestations)"
              value="Enforces the dual-PREPARE gate and binds both leg commitments in one quorum. PREPARE → READY."
            />
            <Definition
              label="commit(id)"
              value="The single irreversible transition. READY → COMMITTED, and only inside the bounded window."
            />
            <Definition
              label="settle(id, attestation)"
              value="Records attested finalization of both native legs. COMMITTED → SETTLED."
            />
            <Definition
              label="unlockHeld(id)"
              value="Timeout-driven, permissionless recovery. PREPARE or READY → HELD."
            />
            <Definition
              label="getHandshake(id)"
              value="Read-only lifecycle record: state, party, timestamps, both prepare commitments, evidence manifest, settlement evidence."
            />
            <Definition
              label="isCommitted(id)"
              value="The only authorization a source-chain lock should accept before making a leg irreversible."
            />
          </DefinitionGrid>
        </Panel>
      </div>

      <div className="ds-section">
        <SectionHeading title="Deployed addresses" />
        <Panel padded={false}>
          <DefinitionGrid>
            <Definition
              label="HandshakeASC"
              value={<span className="ds-hash">0x905E0f141D8B5333F49755B08395d1beAdEd74Ab</span>}
            />
            <Definition
              label="AttestcoinVerifier"
              value={<span className="ds-hash">0xcB04133cEeD70bbb9692D528F21B7205838eAa13</span>}
            />
            <Definition
              label="CreditcoinCommitStatus"
              value={<span className="ds-hash">0x2002dcc1341707e7a6D6d5dC49EE7e610B9d4680</span>}
            />
            <Definition
              label="Creditcoin payment lock"
              value={<span className="ds-hash">0xb3e9cB40A52EF777A29b6198f4c2D8d19893a01D</span>}
            />
            <Definition
              label="OperatorCommitStatus (Sepolia)"
              value={<span className="ds-hash">0xbD42128dFDd2B381fF416FffE8D699F840562067</span>}
            />
            <Definition
              label="Ethereum asset lock (Sepolia)"
              value={<span className="ds-hash">0x999326d027316C6CD0156a39ac8d3792f2EFC802</span>}
            />
          </DefinitionGrid>
        </Panel>
      </div>
    </div>
  )
}
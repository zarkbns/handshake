require('dotenv').config({ override: true });
const { AbiCoder, Contract, JsonRpcProvider, Wallet } = require('ethers');
const { proveEthereumSepoliaTransaction } = require('./attestcoin-proof');

const coder = AbiCoder.defaultAbiCoder();

const ASC_ABI = [
  'function registerTerms(bytes32 id, (uint256 leftChainId, uint256 rightChainId, address leftParty, address rightParty, address leftToken, address rightToken, uint256 leftAmount, uint256 rightAmount, bytes32 leftLockReference, bytes32 rightLockReference, uint256 expiry) terms)',
  'function prepareAttestedLeg(bytes32 id, bytes proof) payable',
  'function prepareNativeLeg(bytes32 id) payable',
  'function commit(bytes32 id)',
  'function bondAmount() view returns (uint256)',
  'function isCommitted(bytes32 id) view returns (bool)',
  'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
];

const LEG_PROOF_TYPE = [
  'tuple(uint64 height, bytes txBytes, tuple(bytes32 root, tuple(bytes32 hash, bool isLeft)[] siblings) merkleProof, tuple(bytes32 lowerEndpointDigest, bytes32[] roots) continuityProof)',
];

const STATE_NAMES = ['NONE', 'PREPARE', 'READY', 'COMMITTED', 'SETTLED', 'HELD'];

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v.trim();
}

function encodeLegProof(proof) {
  return coder.encode(LEG_PROOF_TYPE, [
    {
      height: proof.headerNumber,
      txBytes: proof.txBytes,
      merkleProof: {
        root: proof.merkleProof.root,
        siblings: proof.merkleProof.siblings.map((s) => ({ hash: s.hash, isLeft: s.isLeft })),
      },
      continuityProof: {
        lowerEndpointDigest: proof.continuityProof.lowerEndpointDigest,
        roots: proof.continuityProof.roots,
      },
    },
  ]);
}

async function state(asc, id) {
  const record = await asc.getHandshake(id);
  return Number(record.state);
}

// Plan written by demo-lock.js carries the full settlement terms so registerTerms
// can bind the id to the exact on-chain economics both legs must match.
function loadPlan() {
  const { readFileSync } = require('fs');
  try {
    return JSON.parse(readFileSync(process.env.SETTLEMENT_PLAN_FILE || 'settlement-plan.json', 'utf8'));
  } catch {
    return {};
  }
}

async function main() {
  const plan = loadPlan();
  const settlementId = plan.settlementId || env('SETTLEMENT_ID');
  const assetTxHash = plan.ethereumAssetLockTx || env('ASSET_LOCK_TX');
  const terms = plan.terms;
  if (!terms) {
    throw new Error('settlement terms are required: run demo-lock.js first (or add a terms object to the plan file)');
  }

  const cc = new JsonRpcProvider(env('CREDITCOIN_RPC_URL'), undefined, { staticNetwork: true });
  const seller = new Wallet(env('SELLER_PRIVATE_KEY'), cc);
  const buyer = new Wallet(env('BUYER_PRIVATE_KEY'), cc);

  const ascAddr = env('HANDSHAKE_ASC_ADDRESS');
  const ascSeller = new Contract(ascAddr, ASC_ABI, seller);
  const ascBuyer = new Contract(ascAddr, ASC_ABI, buyer);

  console.log('Settlement:', settlementId);
  console.log('Initial state:', STATE_NAMES[await state(ascSeller, settlementId)]);

  // Griefing bond both parties must post at PREPARE (forfeited in part on a dual-PREPARE stall).
  const bond = await ascSeller.bondAmount();
  console.log('Required prepare bond (wei):', bond.toString());

  // 1. Register the canonical terms: the coordinator recomputes the settlement id from
  //    these fields and rejects any mismatch — binding the id to the exact economics.
  console.log('\n[1/4] registerTerms (canonical id binding)...');
  await (await ascSeller.registerTerms(settlementId, [
    terms.leftChainId,
    terms.rightChainId,
    terms.leftParty,
    terms.rightParty,
    terms.leftToken,
    terms.rightToken,
    terms.leftAmount,
    terms.rightAmount,
    terms.leftLockReference,
    terms.rightLockReference,
    terms.expiry,
  ])).wait();

  // 2. Generate + verify the real Attestcoin proof, then prepare the attested (Ethereum)
  //    leg as the seller. The verifier matches the proven lock event's full economics
  //    (token, depositor, recipient, amount, expiry) against the registered terms.
  console.log('\n[2/4] Generating Attestcoin proof + prepareAttestedLeg (seller)...');
  const proof = await proveEthereumSepoliaTransaction({ transactionHash: assetTxHash });
  const legProof = encodeLegProof(proof);
  console.log('      Proof verified off-chain against precompile:', proof.verified);
  await (await ascSeller.prepareAttestedLeg(settlementId, legProof, { value: bond })).wait();
  console.log('      state:', STATE_NAMES[await state(ascSeller, settlementId)]);

  // 3. Prepare the native (Creditcoin) leg as the buyer. Full lock economics are checked
  //    against the registered terms; the SECOND verified prepare moves straight to READY.
  console.log('\n[3/4] prepareNativeLeg (buyer) — second verified leg -> READY...');
  await (await ascBuyer.prepareNativeLeg(settlementId, { value: bond })).wait();
  console.log('      state:', STATE_NAMES[await state(ascSeller, settlementId)]);

  // 4. commit -> COMMITTED (the irreversible boundary).
  console.log('\n[4/4] commit -> COMMITTED...');
  await (await ascSeller.commit(settlementId)).wait();
  console.log('      state:', STATE_NAMES[await state(ascSeller, settlementId)]);
  console.log('      isCommitted:', await ascSeller.isCommitted(settlementId));

  console.log('\n=== COMMIT reached. Point of no return crossed on Creditcoin. ===');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});

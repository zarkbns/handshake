require('dotenv').config({ override: true });
const { AbiCoder, Contract, JsonRpcProvider, Wallet, keccak256 } = require('ethers');
const { deriveSettlementId } = require('./settlement-id');
const { proveEthereumSepoliaTransaction } = require('./attestcoin-proof');

const coder = AbiCoder.defaultAbiCoder();

const ASC_ABI = [
  'function prepareAttestedLeg(bytes32 id, bytes proof)',
  'function prepareNativeLeg(bytes32 id)',
  'function submitProofs(bytes32 id, bytes attestations)',
  'function commit(bytes32 id)',
  'function settle(bytes32 id, bytes attestation)',
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

async function main() {
  const settlementId = env('SETTLEMENT_ID');
  const assetTxHash = env('ASSET_LOCK_TX');

  const cc = new JsonRpcProvider(env('CREDITCOIN_RPC_URL'), undefined, { staticNetwork: true });
  const seller = new Wallet(env('SELLER_PRIVATE_KEY'), cc);
  const buyer = new Wallet(env('BUYER_PRIVATE_KEY'), cc);

  const ascAddr = env('HANDSHAKE_ASC_ADDRESS');
  const ascSeller = new Contract(ascAddr, ASC_ABI, seller);
  const ascBuyer = new Contract(ascAddr, ASC_ABI, buyer);

  console.log('Settlement:', settlementId);
  console.log('Initial state:', STATE_NAMES[await state(ascSeller, settlementId)]);

  // 1. Generate + verify the real Attestcoin proof, then encode it for on-chain verification.
  console.log('\n[1/5] Generating Attestcoin proof for the Ethereum asset lock...');
  const proof = await proveEthereumSepoliaTransaction({ transactionHash: assetTxHash });
  const legProof = encodeLegProof(proof);
  console.log('      Proof verified off-chain against precompile:', proof.verified);

  // 2. Prepare the attested (Ethereum) leg as the seller.
  console.log('\n[2/5] prepareAttestedLeg (seller)...');
  await (await ascSeller.prepareAttestedLeg(settlementId, legProof)).wait();
  console.log('      state:', STATE_NAMES[await state(ascSeller, settlementId)]);

  // 3. Prepare the native (Creditcoin) leg as the buyer.
  console.log('\n[3/5] prepareNativeLeg (buyer)...');
  await (await ascBuyer.prepareNativeLeg(settlementId)).wait();
  console.log('      state:', STATE_NAMES[await state(ascSeller, settlementId)]);

  // 4. submitProofs -> READY. The aggregate attestation binds both prepare commitments.
  console.log('\n[4/5] submitProofs -> READY...');
  const record = await ascSeller.getHandshake(settlementId);
  const attestation = coder.encode(
    ['bytes32'],
    [keccak256(coder.encode(['bytes32', 'bytes32', 'bytes32'], [settlementId, record.leftCommit, record.rightCommit]))],
  );
  await (await ascSeller.submitProofs(settlementId, attestation)).wait();
  console.log('      state:', STATE_NAMES[await state(ascSeller, settlementId)]);

  // 5. commit -> COMMITTED (the irreversible boundary).
  console.log('\n[5/5] commit -> COMMITTED...');
  await (await ascSeller.commit(settlementId)).wait();
  console.log('      state:', STATE_NAMES[await state(ascSeller, settlementId)]);
  console.log('      isCommitted:', await ascSeller.isCommitted(settlementId));

  console.log('\n=== COMMIT reached. Point of no return crossed on Creditcoin. ===');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});

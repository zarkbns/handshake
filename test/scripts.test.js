const assert = require('node:assert/strict');
const { normalizePlan } = require('../scripts/settlement-plan');
const { ACTIONS, STATES, createRelayer } = require('../scripts/relayer');
const { buildCommitDigest } = require('../scripts/commit-relay');
const { AbiCoder, Wallet, keccak256, solidityPackedKeccak256 } = require('ethers');

const plan = normalizePlan({
  leftChainId: 11155111,
  rightChainId: 102031,
  leftParty: '0x00000000000000000000000000000000000000a1',
  rightParty: '0x00000000000000000000000000000000000000b2',
  leftToken: '0x0000000000000000000000000000000000000101',
  rightToken: '0x0000000000000000000000000000000000000202',
  leftAmount: '100',
  rightAmount: '200',
  leftLockReference: `0x${'11'.repeat(32)}`,
  rightLockReference: `0x${'22'.repeat(32)}`,
  expiry: 200,
  leftProof: '0x01',
  rightProof: '0x02',
  attestations: '0x03',
});

async function testRelayerOrdersDualPrepareBeforeProofsAndCommit() {
  let state = STATES.NONE;
  let now = 100;
  const calls = [];
  const storeData = new Map();
  const store = { get: async (id) => storeData.get(id), put: async (record) => storeData.set(record.id, record) };
  const client = (name) => ({
    contract: { runner: { address: name } },
    state: async () => state,
    prepareAttestedLeg: async () => { calls.push(name + 'prepareAttestedLeg'); state = STATES.PREPARE; return { hash: name }; },
    prepareNativeLeg: async () => { calls.push(name + 'prepareNativeLeg'); state = STATES.PREPARE; return { hash: name }; },
    submitProofs: async () => { calls.push(ACTIONS.PROOFS); state = STATES.READY; return { hash: 'proofs' }; },
    commit: async () => { calls.push(ACTIONS.COMMIT); state = STATES.COMMITTED; return { hash: 'commit' }; },
    unlockHeld: async () => { calls.push(ACTIONS.HELD); state = STATES.HELD; return { hash: 'held' }; },
    pendingWithdrawals: async () => 0n,
    withdrawBond: async () => { calls.push(ACTIONS.WITHDRAW_BOND); return { hash: 'withdraw' }; },
  });
  const relayer = createRelayer({ leftCoordinator: client('left'), rightCoordinator: client('right'), store, clock: () => now });

  await relayer.run(plan);
  assert.deepEqual(calls, ['leftprepareAttestedLeg', 'rightprepareNativeLeg']);
  await relayer.run(plan);
  await relayer.run(plan);
  assert.deepEqual(calls, ['leftprepareAttestedLeg', 'rightprepareNativeLeg', 'submitProofs', 'commit']);
  // COMMITTED is terminal; with zero pending bond no withdrawal should be attempted.
  await relayer.run(plan);
  assert.deepEqual(calls, ['leftprepareAttestedLeg', 'rightprepareNativeLeg', 'submitProofs', 'commit']);
}

async function testRelayerUsesHeldAfterExpiry() {
  let state = STATES.PREPARE;
  const store = { get: async () => undefined, put: async () => {} };
  const calls = [];
  const client = {
    contract: { runner: { address: '0xkeeper' } },
    state: async () => state,
    unlockHeld: async () => { calls.push(ACTIONS.HELD); state = STATES.HELD; return {}; },
    pendingWithdrawals: async () => 0n,
    withdrawBond: async () => { calls.push(ACTIONS.WITHDRAW_BOND); return {}; },
  };
  const relayer = createRelayer({ leftCoordinator: client, rightCoordinator: client, store, clock: () => 201 });
  await relayer.run(plan);
  assert.deepEqual(calls, [ACTIONS.HELD]);
}

async function testRelayerWithdrawsBondOnceAfterTerminalState() {
  let state = STATES.HELD;
  const storeData = new Map();
  const store = { get: async (id) => storeData.get(id), put: async (record) => storeData.set(record.id, record) };
  const calls = [];
  // Each party keeps its own balance, mirroring the on-chain mapping(address => uint256)
  // pendingWithdrawals. A single shared variable would let one withdrawal zero out the other.
  const client = (name) => {
    let pending = 5000000000000000n; // half of a 0.01 CTC bond survived the burn split
    return {
      contract: { runner: { address: name } },
      state: async () => state,
      pendingWithdrawals: async () => pending,
      withdrawBond: async () => { calls.push(name + ':withdraw'); pending = 0n; return { hash: name + 'w' }; },
    };
  };
  const relayer = createRelayer({ leftCoordinator: client('left'), rightCoordinator: client('right'), store, clock: () => 300 });

  await relayer.run(plan);
  // Both managed parties pull their surviving bond exactly once.
  assert.deepEqual(calls, ['left:withdraw', 'right:withdraw']);
  // Each balance was read and pulled independently (not one shared balance zeroed by the first pull).
  const stored = await store.get(plan.settlementId);
  assert.equal(stored.bondWithdrawals.length, 2);
  assert.deepEqual(stored.bondWithdrawals.map((w) => w.account), ['left', 'right']);
  // Idempotent: a second pass over the same terminal settlement withdraws nothing more.
  await relayer.run(plan);
  assert.deepEqual(calls, ['left:withdraw', 'right:withdraw']);
  assert.equal((await store.get(plan.settlementId)).bondWithdrawn, true);
}

// Regression tests for the operator commit-report digest. The relay must produce exactly
// what OperatorCommitStatus._recover verifies on-chain:
//   keccak256(abi.encode(chainId, commitStatus, settlementId, creditcoinBlock))
// The padded-vectors fixture below was produced with Foundry `cast abi-encode` + `cast keccak`,
// i.e. independently of ethers, so an ethers AbiCoder regression cannot silently re-break this.
async function testCommitRelayDigestMatchesOnChainAbiEncode() {
  const chainId = 11155111;
  const commitStatusAddress = '0x0000000000000000000000000000000000000001';
  const settlementId = '0x' + '01'.repeat(32);
  const creditcoinBlock = 12345n;

  const digest = buildCommitDigest({ chainId, commitStatusAddress, settlementId, creditcoinBlock });
  assert.equal(
    digest,
    '0x7cc3a276cb90113969d772ce15fcebb25b898b61f40ce6d498f5d4fe82ee7c9c',
    'digest must match the cast abi.encode reference vector',
  );
  // The packed (abi.encodePacked-style) digest differs and must never be what gets signed.
  const packed = solidityPackedKeccak256(
    ['uint256', 'address', 'bytes32', 'uint64'],
    [chainId, commitStatusAddress, settlementId, creditcoinBlock],
  );
  assert.notEqual(digest, packed, 'padded and packed digests must differ for these values');
}

// Round-trip: sign the relay digest and recover the signer exactly as the contract does
// (ecrecover over the raw digest, no EIP-191 prefix, v normalized to 27/28).
async function testCommitRelaySignatureRecoversOperator() {
  const { recoverAddress } = require('ethers');
  const operator = Wallet.createRandom();
  const digest = buildCommitDigest({
    chainId: 102031,
    commitStatusAddress: '0xbD42128dFDd2B381fF416FffE8D699F840562067',
    settlementId: '0x' + 'ab'.repeat(32),
    creditcoinBlock: 4242n,
  });
  const signature = operator.signingKey.sign(digest);
  const v = signature.v < 27 ? signature.v + 27 : signature.v;
  assert.equal(
    recoverAddress(digest, { r: signature.r, s: signature.s, v, yParity: signature.yParity }),
    operator.address,
    'recovered signer must be the operator wallet',
  );
}

// The relay digest must also equal the digest demo-release.js builds inline for the same
// inputs, so the manual demo path and the automated relay can never disagree.
async function testCommitRelayDigestMatchesDemoReleaseEncoding() {
  const coder = AbiCoder.defaultAbiCoder();
  const input = {
    chainId: 11155111,
    commitStatusAddress: '0x999326d027316C6CD0156a39ac8d3792f2EFC802',
    settlementId: '0x' + '77'.repeat(32),
    creditcoinBlock: 999n,
  };
  assert.equal(
    buildCommitDigest(input),
    keccak256(
      coder.encode(
        ['uint256', 'address', 'bytes32', 'uint64'],
        [input.chainId, input.commitStatusAddress, input.settlementId, input.creditcoinBlock],
      ),
    ),
  );
}

Promise.resolve()
  .then(testRelayerOrdersDualPrepareBeforeProofsAndCommit)
  .then(testRelayerUsesHeldAfterExpiry)
  .then(testRelayerWithdrawsBondOnceAfterTerminalState)
  .then(testCommitRelayDigestMatchesOnChainAbiEncode)
  .then(testCommitRelaySignatureRecoversOperator)
  .then(testCommitRelayDigestMatchesDemoReleaseEncoding)
  .then(() => process.stdout.write('script tests passed\n'));

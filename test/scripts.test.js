const assert = require('node:assert/strict');
const { normalizePlan } = require('../scripts/settlement-plan');
const { ACTIONS, STATES, createRelayer } = require('../scripts/relayer');
const { buildCommitDigest, resolveScanWindow } = require('../scripts/commit-relay');
const { deriveSettlementId } = require('../scripts/settlement-id');
const { AbiCoder, Wallet, keccak256, solidityPackedKeccak256 } = require('ethers');

const termsFixture = {
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
};

const plan = normalizePlan({
  ...termsFixture,
  leftProof: '0x01',
  rightProof: '0x02',
  attestations: '0x03',
});

async function testRelayerOrdersTermsPrepareAndCommit() {
  let state = STATES.NONE;
  let now = 100;
  const calls = [];
  const storeData = new Map();
  const store = { get: async (id) => storeData.get(id), put: async (record) => storeData.set(record.id, record) };
  const client = (name) => ({
    contract: { runner: { address: name } },
    state: async () => state,
    registerTerms: async () => { calls.push(name + 'registerTerms'); return { hash: name }; },
    prepareAttestedLeg: async () => { calls.push(name + 'prepareAttestedLeg'); state = STATES.PREPARE; return { hash: name }; },
    prepareNativeLeg: async () => { calls.push(name + 'prepareNativeLeg'); state = STATES.READY; return { hash: name }; },
    commit: async () => { calls.push(ACTIONS.COMMIT); state = STATES.COMMITTED; return { hash: 'commit' }; },
    unlockHeld: async () => { calls.push(ACTIONS.HELD); state = STATES.HELD; return { hash: 'held' }; },
    pendingWithdrawals: async () => 0n,
    withdrawBond: async () => { calls.push(ACTIONS.WITHDRAW_BOND); return { hash: 'withdraw' }; },
  });
  const relayer = createRelayer({ leftCoordinator: client('left'), rightCoordinator: client('right'), store, clock: () => now });

  // Pass 1: registerTerms + both prepares (registration leaves state NONE, so it rides
  // the same pass; the second verified leg lands READY directly).
  await relayer.run(plan);
  assert.deepEqual(calls, ['leftregisterTerms', 'leftprepareAttestedLeg', 'leftprepareNativeLeg']);
  // Pass 2: READY -> COMMIT. COMMITTED is terminal; no bond to withdraw.
  await relayer.run(plan);
  await relayer.run(plan);
  assert.deepEqual(calls, ['leftregisterTerms', 'leftprepareAttestedLeg', 'leftprepareNativeLeg', 'commit']);
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

// Byte-for-byte JS <-> Solidity settlement-id equivalence. The Solidity reference vectors were
// produced by script/IdVectors.s.sol (forge script, console.logBytes32) over the exact same
// fields as termsFixture — regenerate with: forge script script/IdVectors.s.sol
async function testSettlementIdMatchesSolidityByteForByte() {
  assert.equal(
    deriveSettlementId(termsFixture),
    '0xec0ec30610d7c3b9d7377ce85459c24a2e39739796047c35a65d46875c3171da',
    'JS encoder drifted from the Solidity SettlementId.derive vector 1',
  );
  // Maximal-value vector: catches truncation, padding, or field-order drift.
  const max = (n) => (2n ** 256n - BigInt(n)).toString();
  assert.equal(
    deriveSettlementId({
      leftChainId: max(1),
      rightChainId: max(1),
      leftParty: '0xffffffffffffffffffffffffffffffffffffffff',
      rightParty: '0x000000000000000000000000000000000000dead',
      leftToken: '0xffffffffffffffffffffffffffffffffffffffff',
      rightToken: '0x000000000000000000000000000000000000beef',
      leftAmount: max(2),
      rightAmount: max(3),
      leftLockReference: '0x' + 'ff'.repeat(31) + 'fc',
      rightLockReference: '0x' + 'ff'.repeat(31) + 'fb',
      expiry: max(6),
    }),
    '0x74fee2f06bfa0c6fb9e83dcc46adf6f167441fd52274d6bb470be72e36b0487b',
    'JS encoder drifted from the Solidity SettlementId.derive vector 2',
  );
}

// The relay's event scan must be bounded: the public Creditcoin RPC rejects full-history
// eth_getLogs (see chain-reader.ts + demo-release.js, which cap their windows for the same
// reason). The finality-safe upper bound must also hold so a not-yet-final commit is never
// relayed.
async function testCommitRelayScanWindowIsBounded() {
  // Default window: maxScanBlocks (5000) back from head, upper bound at head - finality.
  assert.deepEqual(
    resolveScanWindow({ head: 100000, finalityConfirmations: 10 }),
    { fromBlock: 95000, toBlock: 99990 },
    'default window must be [head-5000, head-finality]',
  );
  // An explicit fromBlock widens the lower bound but the upper bound stays finality-safe.
  assert.deepEqual(
    resolveScanWindow({ head: 100000, finalityConfirmations: 10, fromBlock: 0 }),
    { fromBlock: 0, toBlock: 99990 },
    'explicit fromBlock must widen only the lower bound',
  );
  // The window never goes below zero.
  assert.deepEqual(
    resolveScanWindow({ head: 5, finalityConfirmations: 10 }),
    { fromBlock: 0, toBlock: -5 },
    'clamped lower bound; empty window when head < finality',
  );
  // Input validation.
  assert.throws(() => resolveScanWindow({ head: -1, finalityConfirmations: 10 }), TypeError);
  assert.throws(() => resolveScanWindow({ head: 100, finalityConfirmations: 0 }), TypeError);
  assert.throws(() => resolveScanWindow({ head: 100, finalityConfirmations: 10, maxScanBlocks: 0 }), TypeError);
}

Promise.resolve()
  .then(testRelayerOrdersTermsPrepareAndCommit)
  .then(testRelayerUsesHeldAfterExpiry)
  .then(testRelayerWithdrawsBondOnceAfterTerminalState)
  .then(testCommitRelayDigestMatchesOnChainAbiEncode)
  .then(testCommitRelaySignatureRecoversOperator)
  .then(testCommitRelayDigestMatchesDemoReleaseEncoding)
  .then(testSettlementIdMatchesSolidityByteForByte)
  .then(testCommitRelayScanWindowIsBounded)
  .then(() => process.stdout.write('script tests passed\n'));

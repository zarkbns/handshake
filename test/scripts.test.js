const assert = require('node:assert/strict');
const { normalizePlan } = require('../scripts/settlement-plan');
const { ACTIONS, STATES, createRelayer } = require('../scripts/relayer');

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

Promise.resolve()
  .then(testRelayerOrdersDualPrepareBeforeProofsAndCommit)
  .then(testRelayerUsesHeldAfterExpiry)
  .then(testRelayerWithdrawsBondOnceAfterTerminalState)
  .then(() => process.stdout.write('script tests passed\n'));

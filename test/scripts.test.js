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
    state: async () => state,
    prepareAttestedLeg: async () => { calls.push(name + 'prepareAttestedLeg'); state = STATES.PREPARE; return { hash: name }; },
    prepareNativeLeg: async () => { calls.push(name + 'prepareNativeLeg'); state = STATES.PREPARE; return { hash: name }; },
    submitProofs: async () => { calls.push(ACTIONS.PROOFS); state = STATES.READY; return { hash: 'proofs' }; },
    commit: async () => { calls.push(ACTIONS.COMMIT); state = STATES.COMMITTED; return { hash: 'commit' }; },
    unlockHeld: async () => { calls.push(ACTIONS.HELD); state = STATES.HELD; return { hash: 'held' }; },
  });
  const relayer = createRelayer({ leftCoordinator: client('left'), rightCoordinator: client('right'), store, clock: () => now });

  await relayer.run(plan);
  assert.deepEqual(calls, ['leftprepareAttestedLeg', 'rightprepareNativeLeg']);
  await relayer.run(plan);
  await relayer.run(plan);
  assert.deepEqual(calls, ['leftprepareAttestedLeg', 'rightprepareNativeLeg', 'submitProofs', 'commit']);
}

async function testRelayerUsesHeldAfterExpiry() {
  let state = STATES.PREPARE;
  const store = { get: async () => undefined, put: async () => {} };
  const calls = [];
  const client = { state: async () => state, unlockHeld: async () => { calls.push(ACTIONS.HELD); state = STATES.HELD; return {}; } };
  const relayer = createRelayer({ leftCoordinator: client, rightCoordinator: client, store, clock: () => 201 });
  await relayer.run(plan);
  assert.deepEqual(calls, [ACTIONS.HELD]);
}

Promise.resolve()
  .then(testRelayerOrdersDualPrepareBeforeProofsAndCommit)
  .then(testRelayerUsesHeldAfterExpiry)
  .then(() => process.stdout.write('script tests passed\n'));

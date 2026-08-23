const STATES = Object.freeze({ NONE: 0, PREPARE: 1, READY: 2, COMMITTED: 3, SETTLED: 4, HELD: 5 });

const ACTIONS = Object.freeze({ PREPARE: 'prepare', PROOFS: 'submitProofs', COMMIT: 'commit', HELD: 'unlockHeld' });

function createRelayer({ leftCoordinator, rightCoordinator, store, clock = () => Math.floor(Date.now() / 1000), logger = () => {} }) {
  if (!leftCoordinator || !rightCoordinator || !store) {
    throw new TypeError('leftCoordinator, rightCoordinator, and store are required');
  }

  async function run(plan) {
    const id = plan.settlementId;
    const record = (await store.get(id)) || { id, attempts: {} };
    const state = await leftCoordinator.state(id);

    if (state === STATES.HELD || state === STATES.COMMITTED || state === STATES.SETTLED) {
      await store.put({ ...record, state });
      return state;
    }

    if (clock() >= plan.expiry && state !== STATES.NONE) {
      return execute(ACTIONS.HELD, id, record, leftCoordinator.unlockHeld);
    }
    if (state === STATES.NONE && plan.leftProof && plan.rightProof) {
      const leftAction = await execute(ACTIONS.PREPARE, id, record, leftCoordinator.prepare, plan.leftProof);
      const rightAction = await execute(ACTIONS.PREPARE, id, record, rightCoordinator.prepare, plan.rightProof);
      return { leftAction, rightAction };
    }
    if (state === STATES.PREPARE && plan.attestations) {
      return execute(ACTIONS.PROOFS, id, record, leftCoordinator.submitProofs, plan.attestations);
    }
    if (state === STATES.READY) {
      return execute(ACTIONS.COMMIT, id, record, leftCoordinator.commit);
    }
    return state;
  }

  async function execute(action, id, record, method, ...args) {
    const attempts = (record.attempts[action] || 0) + 1;
    const next = { ...record, attempts, lastAction: action, updatedAt: clock() };
    await store.put(next);
    try {
      const tx = await method.call(undefined, id, ...args);
      await store.put({ ...next, txHash: tx.hash || null });
      logger({ id, action, attempts, txHash: tx.hash || null });
      return action;
    } catch (error) {
      await store.put({ ...next, lastError: error.message });
      throw error;
    }
  }

  return { run };
}

module.exports = { ACTIONS, STATES, createRelayer };

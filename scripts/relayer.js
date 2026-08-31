const STATES = Object.freeze({ NONE: 0, PREPARE: 1, READY: 2, COMMITTED: 3, SETTLED: 4, HELD: 5 });

const ACTIONS = Object.freeze({ PREPARE: 'prepareAttestedLeg', PREPARE_NATIVE: 'prepareNativeLeg', PROOFS: 'submitProofs', COMMIT: 'commit', HELD: 'unlockHeld', WITHDRAW_BOND: 'withdrawBond' });

// A settlement is terminal once it can no longer change on-chain state; the griefing bond, if any,
// is resolved into pendingWithdrawals at COMMIT (full refund) or at unlockHeld (burn split / full
// refund) and can then be pulled unilaterally, without any attestor involvement.
const TERMINAL_STATES = new Set([STATES.COMMITTED, STATES.SETTLED, STATES.HELD]);

function isTerminal(state) {
  return TERMINAL_STATES.has(state);
}

function createRelayer({ leftCoordinator, rightCoordinator, store, clock = () => Math.floor(Date.now() / 1000), logger = () => {} }) {
  if (!leftCoordinator || !rightCoordinator || !store) {
    throw new TypeError('leftCoordinator, rightCoordinator, and store are required');
  }

  async function run(plan) {
    const id = plan.settlementId;
    const record = (await store.get(id)) || { id, attempts: {} };
    const state = await leftCoordinator.state(id);

    if (isTerminal(state)) {
      await store.put({ ...record, state });
      // Once terminal, reclaim any bond credited to our parties. Idempotent and attestor-free:
      // a zero balance is a no-op skip, so repeated relayer passes never double-withdraw.
      await withdrawBondsIfAny(id, record);
      return state;
    }

    if (clock() >= plan.expiry && state !== STATES.NONE) {
      return execute(ACTIONS.HELD, id, record, leftCoordinator.unlockHeld);
    }
    if (state === STATES.NONE && plan.leftProof && plan.rightProof) {
      const leftAction = await execute(ACTIONS.PREPARE, id, record, leftCoordinator.prepareAttestedLeg, plan.leftProof);
      const rightAction = await execute(ACTIONS.PREPARE_NATIVE, id, record, rightCoordinator.prepareNativeLeg);
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

  // Pulls each coordinator's bond back to its managed party after a terminal transition. Uses the
  // coordinator's own signer address (contract.runner.address) so the left coordinator withdraws
  // the attested party's bond and the right coordinator withdraws the native party's bond.
  async function withdrawBondsIfAny(id, record) {
    if (record.bondWithdrawn) return;
    const results = [];
    for (const coordinator of [leftCoordinator, rightCoordinator]) {
      if (typeof coordinator.pendingWithdrawals !== 'function' || typeof coordinator.withdrawBond !== 'function') {
        continue;
      }
      const account = coordinator.contract && coordinator.contract.runner && coordinator.contract.runner.address;
      if (!account) continue;
      const pending = await coordinator.pendingWithdrawals(account);
      if (BigInt(pending) === 0n) continue;
      const tx = await coordinator.withdrawBond();
      logger({ id, action: ACTIONS.WITHDRAW_BOND, account, amount: pending.toString(), txHash: tx.hash || null });
      results.push({ account, amount: pending.toString(), txHash: tx.hash || null });
    }
    if (results.length > 0) {
      await store.put({ ...record, bondWithdrawn: true, bondWithdrawals: results });
    }
    return results;
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

  return { run, withdrawBondsIfAny };
}

module.exports = { ACTIONS, STATES, isTerminal, createRelayer };

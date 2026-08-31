const { Contract, isHexString } = require('ethers');

const COORDINATOR_ABI = [
  'function prepareAttestedLeg(bytes32 id, bytes proof) payable',
  'function prepareNativeLeg(bytes32 id) payable',
  'function submitProofs(bytes32 id, bytes attestations)',
  'function commit(bytes32 id)',
  'function unlockHeld(bytes32 id)',
  'function withdrawBond()',
  'function bondAmount() view returns (uint256)',
  'function bondBurnBps() view returns (uint256)',
  'function pendingWithdrawals(address) view returns (uint256)',
  'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
  'function isCommitted(bytes32 id) view returns (bool)',
  'event Prepared(bytes32 indexed id)',
  'event CounterpartyPrepared(bytes32 indexed id)',
  'event Ready(bytes32 indexed id)',
  'event Committed(bytes32 indexed id)',
  'event Settled(bytes32 indexed id)',
  'event Held(bytes32 indexed id)',
  'event BondPosted(bytes32 indexed id, address indexed party, uint256 amount)',
  'event BondsResolved(bytes32 indexed id, uint256 burned)',
  'event BondWithdrawn(address indexed party, uint256 amount)',
];

const STATES = Object.freeze({ NONE: 0, PREPARE: 1, READY: 2, COMMITTED: 3, SETTLED: 4, HELD: 5 });

function assertProof(proof, name) {
  if (!isHexString(proof)) throw new TypeError(`${name} must be hex bytes`);
}

function createCoordinatorClient(signerOrProvider, address) {
  if (!address) throw new TypeError('coordinator address is required');
  const contract = new Contract(address, COORDINATOR_ABI, signerOrProvider);
  return {
    contract,
    async state(id) {
      const record = await contract.getHandshake(id);
      return Number(record.state);
    },
    async bondAmount() {
      return contract.bondAmount();
    },
    async prepareAttestedLeg(id, proof, overrides = {}) {
      assertProof(proof, 'attested-leg proof');
      const value = overrides.value !== undefined ? overrides.value : await contract.bondAmount();
      return contract.prepareAttestedLeg(id, proof, { value });
    },
    async prepareNativeLeg(id, overrides = {}) {
      const value = overrides.value !== undefined ? overrides.value : await contract.bondAmount();
      return contract.prepareNativeLeg(id, { value });
    },
    async submitProofs(id, attestations) {
      assertProof(attestations, 'attestations');
      return contract.submitProofs(id, attestations);
    },
    async commit(id) {
      return contract.commit(id);
    },
    async unlockHeld(id) {
      return contract.unlockHeld(id);
    },
    async withdrawBond() {
      return contract.withdrawBond();
    },
  };
}

module.exports = { COORDINATOR_ABI, STATES, createCoordinatorClient };

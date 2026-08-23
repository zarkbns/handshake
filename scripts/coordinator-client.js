const { Contract, isHexString } = require('ethers');

const COORDINATOR_ABI = [
  'function prepare(bytes32 id, bytes proof)',
  'function submitProofs(bytes32 id, bytes attestations)',
  'function commit(bytes32 id)',
  'function unlockHeld(bytes32 id)',
  'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
  'event Prepared(bytes32 indexed id)',
  'event CounterpartyPrepared(bytes32 indexed id)',
  'event Ready(bytes32 indexed id)',
  'event Committed(bytes32 indexed id)',
  'event Settled(bytes32 indexed id)',
  'event Held(bytes32 indexed id)',
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
    async prepare(id, proof) {
      assertProof(proof, 'prepare proof');
      return contract.prepare(id, proof);
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
  };
}

module.exports = { COORDINATOR_ABI, STATES, createCoordinatorClient };

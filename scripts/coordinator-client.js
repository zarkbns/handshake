const { Contract, isHexString } = require('ethers');

const TERMS_TYPE = '(uint256 leftChainId, uint256 rightChainId, address leftParty, address rightParty, address leftToken, address rightToken, uint256 leftAmount, uint256 rightAmount, bytes32 leftLockReference, bytes32 rightLockReference, uint256 expiry)';

const COORDINATOR_ABI = [
  'function registerTerms(bytes32 id, ' + TERMS_TYPE + ' terms)',
  'function prepareAttestedLeg(bytes32 id, bytes proof) payable',
  'function prepareNativeLeg(bytes32 id) payable',
  'function commit(bytes32 id)',
  'function settle(bytes32 id, bytes finalizationReport)',
  'function unlockHeld(bytes32 id)',
  'function withdrawBond()',
  'function bondAmount() view returns (uint256)',
  'function bondBurnBps() view returns (uint256)',
  'function totalSlashed() view returns (uint256)',
  'function pendingWithdrawals(address) view returns (uint256)',
  'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
  'function isCommitted(bytes32 id) view returns (bool)',
  'event TermsRegistered(bytes32 indexed id)',
  'event Prepared(bytes32 indexed id)',
  'event CounterpartyPrepared(bytes32 indexed id)',
  'event Ready(bytes32 indexed id)',
  'event Committed(bytes32 indexed id)',
  'event Settled(bytes32 indexed id)',
  'event Held(bytes32 indexed id)',
  'event BondPosted(bytes32 indexed id, address indexed party, uint256 amount)',
  'event BondsResolved(bytes32 indexed id, uint256 slashed)',
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
    async registerTerms(id, terms) {
      return contract.registerTerms(id, [
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
      ]);
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
    async commit(id) {
      return contract.commit(id);
    },
    async settle(id, finalizationReport) {
      assertProof(finalizationReport, 'finalization report');
      return contract.settle(id, finalizationReport);
    },
    async unlockHeld(id) {
      return contract.unlockHeld(id);
    },
    async pendingWithdrawals(account) {
      return contract.pendingWithdrawals(account);
    },
    async withdrawBond() {
      return contract.withdrawBond();
    },
  };
}

module.exports = { COORDINATOR_ABI, STATES, createCoordinatorClient };

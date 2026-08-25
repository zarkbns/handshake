const { Contract, JsonRpcProvider, Wallet, solidityPackedKeccak256 } = require('ethers');

const COORDINATOR_ABI = ['event Committed(bytes32 indexed id)'];

const COMMIT_STATUS_ABI = [
  'function reportCommitted(bytes32 settlementId, uint64 creditcoinBlock, bytes signature)',
  'function committedAt(bytes32) view returns (uint256)',
];

const STATES = Object.freeze({ NONE: 0, PREPARE: 1, READY: 2, COMMITTED: 3, SETTLED: 4, HELD: 5 });

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

/// Builds the exact digest OperatorCommitStatus recovers:
///   keccak256(abi.encode(chainId, commitStatus, settlementId, creditcoinBlock))
/// signed as a raw digest (no EIP-191 prefix), matching the on-chain ecrecover.
async function buildCommitSignature({ ethereum, commitStatusAddress, operator, settlementId, creditcoinBlock }) {
  const { chainId } = await ethereum.getNetwork();
  const innerDigest = solidityPackedKeccak256(
    ['uint256', 'address', 'bytes32', 'uint64'],
    [chainId, commitStatusAddress, settlementId, creditcoinBlock],
  );
  const signed = operator.signingKey.sign(innerDigest);
  return signed.serialized;
}

function createCommitRelay({
  creditcoinRpcUrl = requiredEnv('CREDITCOIN_RPC_URL'),
  ethereumRpcUrl = requiredEnv('ETHEREUM_SEPOLIA_RPC_URL'),
  coordinatorAddress = requiredEnv('HANDSHAKE_ASC_ADDRESS'),
  commitStatusAddress = requiredEnv('ETHEREUM_COMMIT_STATUS_ADDRESS'),
  operatorPrivateKey = process.env.OPERATOR_PRIVATE_KEY,
  finalityConfirmations = Number(process.env.CREDITCOIN_FINALITY_CONFIRMATIONS || 10),
} = {}) {
  if (!/^0x[0-9a-fA-F]{40}$/.test(coordinatorAddress)) throw new TypeError('coordinator address invalid');
  if (!/^0x[0-9a-fA-F]{40}$/.test(commitStatusAddress)) throw new TypeError('commit status address invalid');
  if (!Number.isSafeInteger(finalityConfirmations) || finalityConfirmations < 1) {
    throw new TypeError('finalityConfirmations must be a positive safe integer');
  }

  const creditcoin = new JsonRpcProvider(creditcoinRpcUrl);
  const ethereum = new JsonRpcProvider(ethereumRpcUrl);
  const coordinator = new Contract(coordinatorAddress, COORDINATOR_ABI, creditcoin);
  const commitStatus = new Contract(commitStatusAddress, COMMIT_STATUS_ABI, ethereum);
  const operator = operatorPrivateKey ? new Wallet(operatorPrivateKey) : null;

  async function reportCommitted(settlementId, creditcoinBlock) {
    if (!operator) throw new Error('OPERATOR_PRIVATE_KEY is required to submit reports');
    if (!/^0x[0-9a-fA-F]{64}$/.test(settlementId)) {
      throw new TypeError('settlementId must be a 32-byte hex hash');
    }
    const signature = await buildCommitSignature({
      ethereum,
      commitStatusAddress,
      operator,
      settlementId,
      creditcoinBlock,
    });
    const tx = await commitStatus
      .connect(operator.connect(ethereum))
      .reportCommitted(settlementId, creditcoinBlock, signature);
    const receipt = await tx.wait();
    return { settlementId, creditcoinBlock, txHash: receipt.hash };
  }

  /// Relays every Creditcoin `Committed` event that has reached the configured finality depth.
  async function relayFinalizedCommits({ fromBlock = 0 } = {}) {
    const head = await creditcoin.getBlockNumber();
    const safeHead = Math.max(fromBlock, head - finalityConfirmations);
    if (safeHead < fromBlock) return [];
    const events = await coordinator.queryFilter('Committed', fromBlock, safeHead);

    const reports = [];
    for (const event of events) {
      const settlementId = event.args[0];
      const alreadyReported = await commitStatus.committedAt(settlementId);
      if (alreadyReported !== 0n) continue; // idempotent retry-safe skip
      reports.push(await reportCommitted(settlementId, BigInt(event.blockNumber)));
    }
    return reports;
  }

  return { reportCommitted, relayFinalizedCommits };
}

module.exports = { STATES, createCommitRelay };

require('dotenv').config({ override: true });
const {
  AbiCoder,
  Contract,
  JsonRpcProvider,
  Wallet,
  formatEther,
  keccak256,
  solidityPackedKeccak256,
  getBytes,
} = require('ethers');

const coder = AbiCoder.defaultAbiCoder();

const LOCK_ABI = [
  'function release(bytes32 settlementId)',
  'function locks(bytes32) view returns (uint8 state, address token, address depositor, address recipient, uint256 amount, uint256 expiry)',
  'event Released(bytes32 indexed settlementId, address indexed recipient, uint256 amount)',
];

const ERC20_ABI = ['function balanceOf(address) view returns (uint256)'];

const ASC_ABI = [
  'function settle(bytes32 id, bytes attestation)',
  'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
  'function isCommitted(bytes32 id) view returns (bool)',
];

const COMMIT_STATUS_ABI = [
  'function reportCommitted(bytes32 settlementId, uint64 creditcoinBlock, bytes signature)',
  'function committedAt(bytes32) view returns (uint256)',
  'function isCommitted(bytes32) view returns (bool)',
];

const COORDINATOR_EVENT_ABI = ['event Committed(bytes32 indexed id)'];

const STATE_NAMES = ['NONE', 'PREPARE', 'READY', 'COMMITTED', 'SETTLED', 'HELD'];
const LOCK_STATE = ['NONE', 'LOCKED', 'RELEASED', 'REFUNDED'];

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v.trim();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const settlementId = env('SETTLEMENT_ID');

  const cc = new JsonRpcProvider(env('CREDITCOIN_RPC_URL'), undefined, { staticNetwork: true });
  const eth = new JsonRpcProvider(env('ETHEREUM_SEPOLIA_RPC_URL'), undefined, { staticNetwork: true });

  const seller = new Wallet(env('SELLER_PRIVATE_KEY'), eth); // releases Ethereum asset to buyer
  const buyer = new Wallet(env('BUYER_PRIVATE_KEY'), cc); // releases Creditcoin payment to seller
  const operator = new Wallet(env('OPERATOR_PRIVATE_KEY'), eth);

  const ccLock = new Contract(env('CREDITCOIN_LOCK_ADDRESS'), LOCK_ABI, buyer);
  const ethLock = new Contract(env('ETHEREUM_LOCK_ADDRESS'), LOCK_ABI, seller);
  const asc = new Contract(env('HANDSHAKE_ASC_ADDRESS'), ASC_ABI, buyer);
  const coordinatorReader = new Contract(env('HANDSHAKE_ASC_ADDRESS'), COORDINATOR_EVENT_ABI, cc);
  const opStatus = new Contract(env('ETHEREUM_COMMIT_STATUS_ADDRESS'), COMMIT_STATUS_ABI, operator);

  console.log('Settlement:', settlementId);
  console.log('State:', STATE_NAMES[Number((await asc.getHandshake(settlementId)).state)]);
  console.log('isCommitted:', await asc.isCommitted(settlementId), '\n');

  // --- 1. Release the Creditcoin payment leg to the seller (reads COMMIT directly) ---
  const ccLockState = Number((await ccLock.locks(settlementId)).state);
  if (ccLockState === 1) {
    console.log('[1/4] Releasing Creditcoin payment to seller...');
    const tx = await ccLock.release(settlementId);
    const rc = await tx.wait();
    console.log('      Released. tx:', rc.hash);
  } else {
    console.log('[1/4] Creditcoin payment leg already', LOCK_STATE[ccLockState]);
  }

  // --- 2. Relay the finalized COMMIT to the Ethereum adapter (operator-signed report) ---
  console.log('\n[2/4] Reporting Creditcoin COMMIT to the Ethereum adapter...');
  const alreadyReported = await opStatus.committedAt(settlementId);
  if (alreadyReported === 0n) {
    const finality = Number(process.env.CREDITCOIN_FINALITY_CONFIRMATIONS || 10);
    const head = await cc.getBlockNumber();
    // Query a bounded recent window to avoid full-history eth_getLogs timeouts on the Creditcoin RPC.
    let commitBlock = BigInt(Math.max(0, head - finality));
    try {
      const fromBlock = Math.max(0, head - 5000);
      const events = await coordinatorReader.queryFilter('Committed', fromBlock, head);
      const match = events.find((e) => e.args[0].toLowerCase() === settlementId.toLowerCase());
      if (match) commitBlock = BigInt(match.blockNumber);
    } catch (err) {
      console.log('      (event lookup skipped:', err.shortMessage || err.message, '- using head-finality)');
    }

    const { chainId } = await eth.getNetwork();
    // Must match OperatorCommitStatus: keccak256(abi.encode(chainId, this, settlementId, block)).
    const digest = keccak256(
      coder.encode(
        ['uint256', 'address', 'bytes32', 'uint64'],
        [chainId, env('ETHEREUM_COMMIT_STATUS_ADDRESS'), settlementId, commitBlock],
      ),
    );
    const signature = operator.signingKey.sign(digest).serialized;
    const tx = await opStatus.reportCommitted(settlementId, commitBlock, signature);
    const rc = await tx.wait();
    console.log('      Reported (Creditcoin block', commitBlock.toString() + '). tx:', rc.hash);
  } else {
    console.log('      Already reported at', new Date(Number(alreadyReported) * 1000).toISOString());
  }

  // --- 3. Wait for the commit delay, then release the Ethereum asset leg to the buyer ---
  const delay = Number(process.env.COMMIT_DELAY || 300);
  console.log(`\n[3/4] Waiting for the ${delay}s commit delay before Ethereum release...`);
  while (!(await opStatus.isCommitted(settlementId))) {
    await sleep(15000);
    process.stdout.write('.');
  }
  console.log('\n      Delay elapsed. Releasing Ethereum asset to buyer...');
  const ethLockState = Number((await ethLock.locks(settlementId)).state);
  if (ethLockState === 1) {
    const tx = await ethLock.release(settlementId);
    const rc = await tx.wait();
    console.log('      Released. tx:', rc.hash);
  } else {
    console.log('      Ethereum asset leg already', LOCK_STATE[ethLockState]);
  }

  // --- 4. Record finalization evidence on the coordinator ---
  console.log('\n[4/4] Recording settlement evidence (settle)...');
  const record = await asc.getHandshake(settlementId);
  if (Number(record.state) === 3) {
    const attestation = coder.encode(
      ['bytes32'],
      [keccak256(coder.encode(['bytes32', 'bytes32'], [settlementId, record.manifest]))],
    );
    const tx = await asc.settle(settlementId, attestation);
    const rc = await tx.wait();
    console.log('      Settled. tx:', rc.hash);
  } else {
    console.log('      Coordinator state is', STATE_NAMES[Number(record.state)], '- skipping settle');
  }

  // --- Final balances ---
  const finalState = STATE_NAMES[Number((await asc.getHandshake(settlementId)).state)];
  console.log('\n=== Settlement complete. Coordinator state:', finalState, '===');
  const ccTokenAddr = (await ccLock.locks(settlementId)).token;
  const ethTokenAddr = (await ethLock.locks(settlementId)).token;
  const ccToken = new Contract(ccTokenAddr, ERC20_ABI, cc);
  const ethToken = new Contract(ethTokenAddr, ERC20_ABI, eth);
  console.log('Seller received (Creditcoin payment):', formatEther(await ccToken.balanceOf(seller.address)));
  console.log('Buyer received  (Ethereum asset):   ', formatEther(await ethToken.balanceOf(buyer.address)));
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});

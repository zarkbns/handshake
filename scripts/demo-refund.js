require('dotenv').config({ override: true });
const { Contract, JsonRpcProvider, Wallet, parseEther, formatEther } = require('ethers');
const { deriveSettlementId } = require('./settlement-id');

const ERC20_ABI = [
  'function mint(address to, uint256 amount)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address) view returns (uint256)',
];

const LOCK_ABI = [
  'function lock(bytes32 settlementId, address token, address recipient, uint256 amount, uint256 expiry)',
  'function refund(bytes32 settlementId)',
  'function locks(bytes32) view returns (uint8 state, address token, address depositor, address recipient, uint256 amount, uint256 expiry)',
  'event Refunded(bytes32 indexed settlementId, address indexed depositor, uint256 amount)',
];

const ASC_ABI = [
  'function prepareNativeLeg(bytes32 id) payable',
  'function unlockHeld(bytes32 id)',
  'function withdrawBond()',
  'function bondAmount() view returns (uint256)',
  'function pendingWithdrawals(address) view returns (uint256)',
  'function isCommitted(bytes32 id) view returns (bool)',
  'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
];

const STATE_NAMES = ['NONE', 'PREPARE', 'READY', 'COMMITTED', 'SETTLED', 'HELD'];
const LOCK_STATE = ['NONE', 'LOCKED', 'RELEASED', 'REFUNDED'];

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v.trim();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Short local lock expiry so the refund path can be demonstrated quickly on testnet.
const LOCK_TTL_SECONDS = Number(process.env.REFUND_DEMO_TTL || 180);

async function main() {
  const cc = new JsonRpcProvider(env('CREDITCOIN_RPC_URL'), undefined, { staticNetwork: true });
  const buyer = new Wallet(env('BUYER_PRIVATE_KEY'), cc);
  const seller = new Wallet(env('SELLER_PRIVATE_KEY'), cc);

  const ccLock = new Contract(env('CREDITCOIN_LOCK_ADDRESS'), LOCK_ABI, buyer);
  const asc = new Contract(env('HANDSHAKE_ASC_ADDRESS'), ASC_ABI, buyer);
  const token = new Contract(env('DEMO_CTC_TOKEN_ADDRESS'), ERC20_ABI, buyer);

  const paymentAmount = parseEther('7');
  const expiry = Math.floor(Date.now() / 1000) + LOCK_TTL_SECONDS;

  // A brand new settlement that will deliberately NOT complete, to prove unilateral recovery.
  const settlementId = deriveSettlementId({
    leftChainId: 11155111,
    rightChainId: 102031,
    leftParty: seller.address,
    rightParty: buyer.address,
    leftToken: env('DEMO_ERC20_ADDRESS'),
    rightToken: env('DEMO_CTC_TOKEN_ADDRESS'),
    leftAmount: parseEther('3').toString(),
    rightAmount: paymentAmount.toString(),
    leftLockReference: '0x' + 'aa'.repeat(32),
    rightLockReference: '0x' + 'bb'.repeat(32),
    expiry,
  });

  console.log('Refund-demo settlement:', settlementId);
  console.log('Lock TTL:', LOCK_TTL_SECONDS, 'seconds\n');

  // 1. Buyer locks the payment on Creditcoin (counterparty never delivers the Ethereum leg).
  const bal = await token.balanceOf(buyer.address);
  if (bal < paymentAmount) {
    console.log('[1/5] Minting demo payment token to buyer...');
    await (await token.mint(buyer.address, paymentAmount)).wait();
  }
  console.log('[1/5] Approving + locking payment on Creditcoin...');
  await (await token.approve(env('CREDITCOIN_LOCK_ADDRESS'), paymentAmount)).wait();
  const balanceBefore = await token.balanceOf(buyer.address);
  await (await ccLock.lock(settlementId, env('DEMO_CTC_TOKEN_ADDRESS'), seller.address, paymentAmount, expiry)).wait();
  console.log('      Locked. Lock state:', LOCK_STATE[Number((await ccLock.locks(settlementId)).state)]);

  // 2. Register the native leg on the coordinator (settlement is now waiting on the missing leg).
  console.log('\n[2/5] prepareNativeLeg (coordinator enters PREPARE)...');
  const bond = await asc.bondAmount();
  await (await asc.prepareNativeLeg(settlementId, { value: bond })).wait();
  console.log('      Coordinator state:', STATE_NAMES[Number((await asc.getHandshake(settlementId)).state)]);
  console.log('      isCommitted:', await asc.isCommitted(settlementId), '(never commits - counterparty absent)');

  // 3. Wait for the local lock expiry. No attestor, no COMMIT, no counterparty needed.
  console.log(`\n[3/5] Waiting ${LOCK_TTL_SECONDS}s for the lock expiry (attestor-independent)...`);
  while (Math.floor(Date.now() / 1000) < expiry + 5) {
    await sleep(15000);
    process.stdout.write('.');
  }
  console.log('\n      Expiry reached.');

  // 4. Refund the locked payment unilaterally. Succeeds because the settlement never committed.
  console.log('\n[4/5] Refunding the locked payment (unilateral, no attestor)...');
  const refundTx = await ccLock.refund(settlementId);
  const refundRc = await refundTx.wait();
  console.log('      Refunded. tx:', refundRc.hash);
  console.log('      Lock state:', LOCK_STATE[Number((await ccLock.locks(settlementId)).state)]);

  // 5. Verify the buyer got their funds back.
  const balanceAfter = await token.balanceOf(buyer.address);
  console.log('\n[5/5] Balance check:');
  console.log('      before lock:', formatEther(balanceBefore));
  console.log('      after refund:', formatEther(balanceAfter));
  const recovered = balanceAfter >= balanceBefore;
  console.log('\n=== HELD refund complete. Funds recovered:', recovered, '===');
  console.log('Note: coordinator unlockHeld() becomes callable after its 1h prepare timeout;');
  console.log('the fund-returning refund above required no attestor, no COMMIT, and no counterparty.');

  // 6. Reclaim the griefing bond. This is a single-leg PREPARE that timed out with no counterparty,
  //    so the honest first mover is refunded in full (nothing burned). This still needs no attestor.
  console.log('\n[bonus] Reclaiming the prepare bond after unlockHeld (unilateral)...');
  const record = await asc.getHandshake(settlementId);
  if (Number(record.state) === 1 || Number(record.state) === 2) {
    // Not yet HELD on the coordinator (its 1h timeout hasn't elapsed in this short demo). Skip.
    console.log('      Coordinator still within its prepare window; run unlockHeld() after the 1h');
    console.log('      timeout to release the bond. Lock refund above already returned the principal.');
  } else {
    const pending = await asc.pendingWithdrawals(buyer.address);
    if (pending > 0n) {
      await (await asc.withdrawBond()).wait();
      console.log('      Bond reclaimed in full (wei):', pending.toString());
    } else {
      console.log('      No bond pending for buyer (already withdrawn).');
    }
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});

require('dotenv').config({ override: true });
const { Contract, JsonRpcProvider, Wallet, parseEther, formatEther } = require('ethers');
const { deriveSettlementId } = require('./settlement-id');

// Demonstrates the griefing bond BURN path: both parties reach the dual-PREPARE gate, then the
// settlement deliberately stalls without COMMIT. On unlockHeld the coordinator forfeits
// bondBurnBps of each posted bond (default 50%) and refunds only the remainder. This is the case
// the bond exists to punish - two parties who mutually locked each other into a stalled READY
// window - and it is distinct from demo-refund.js, where a single-leg no-show is refunded in full.
//
// Everything here runs on Creditcoin only: the native leg is verified directly, and the attested
// leg is faked into PREPARE via a mock proof so the demo needs no live Ethereum lock. The point is
// the economic outcome (burn split), not the cross-chain proof, which demo-settle.js already shows.
//
// IMPORTANT: because it submits a fabricated attested-leg proof, this script only works against a
// coordinator wired to the test MockAttestationVerifier (a local/dev deployment). Against a real
// AttestcoinVerifier the fake proof is rejected at prepareAttestedLeg and the demo fails closed -
// which is correct: a real deployment must never accept an unproven leg. Never point this at the
// production coordinator; use demo-settle.js for the real cross-chain proof path.

const ERC20_ABI = [
  'function mint(address to, uint256 amount)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address) view returns (uint256)',
];

const LOCK_ABI = [
  'function lock(bytes32 settlementId, address token, address recipient, uint256 amount, uint256 expiry)',
  'function locks(bytes32) view returns (uint8 state, address token, address depositor, address recipient, uint256 amount, uint256 expiry)',
];

const ASC_ABI = [
  'function prepareAttestedLeg(bytes32 id, bytes proof) payable',
  'function prepareNativeLeg(bytes32 id) payable',
  'function submitProofs(bytes32 id, bytes attestations)',
  'function unlockHeld(bytes32 id)',
  'function withdrawBond()',
  'function bondAmount() view returns (uint256)',
  'function bondBurnBps() view returns (uint256)',
  'function totalBurned() view returns (uint256)',
  'function pendingWithdrawals(address) view returns (uint256)',
  'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
  'function isCommitted(bytes32 id) view returns (bool)',
];

const STATE_NAMES = ['NONE', 'PREPARE', 'READY', 'COMMITTED', 'SETTLED', 'HELD'];

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v.trim();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function ascState(asc, id) {
  return Number((await asc.getHandshake(id)).state);
}

async function main() {
  const cc = new JsonRpcProvider(env('CREDITCOIN_RPC_URL'), undefined, { staticNetwork: true });

  // Both parties operate on Creditcoin for this native-only demo.
  const seller = new Wallet(env('SELLER_PRIVATE_KEY'), cc); // attested-leg party
  const buyer = new Wallet(env('BUYER_PRIVATE_KEY'), cc); // native-leg party

  const ascAddr = env('HANDSHAKE_ASC_ADDRESS');
  const ascSeller = new Contract(ascAddr, ASC_ABI, seller);
  const ascBuyer = new Contract(ascAddr, ASC_ABI, buyer);

  const ccLockAddr = env('CREDITCOIN_LOCK_ADDRESS');
  const ccLock = new Contract(ccLockAddr, LOCK_ABI, buyer);
  const token = new Contract(env('DEMO_CTC_TOKEN_ADDRESS'), ERC20_ABI, buyer);

  const bond = await ascSeller.bondAmount();
  const burnBps = Number(await ascSeller.bondBurnBps());
  if (bond === 0n) {
    console.log('bondAmount is 0 on this deployment - nothing to burn. Redeploy with a bond to run this demo.');
    return;
  }

  const paymentAmount = parseEther('4');
  // Short local lock expiry so the coordinator prepare timeout can be reached quickly on testnet.
  const ttl = Number(process.env.GRIEF_DEMO_TTL || 180);
  const expiry = Math.floor(Date.now() / 1000) + ttl;

  const settlementId = deriveSettlementId({
    leftChainId: 11155111,
    rightChainId: 102031,
    leftParty: seller.address,
    rightParty: buyer.address,
    leftToken: env('DEMO_ERC20_ADDRESS'),
    rightToken: env('DEMO_CTC_TOKEN_ADDRESS'),
    leftAmount: parseEther('2').toString(),
    rightAmount: paymentAmount.toString(),
    leftLockReference: '0x' + 'cc'.repeat(32),
    rightLockReference: '0x' + 'dd'.repeat(32),
    expiry,
  });

  console.log('Griefing-demo settlement:', settlementId);
  console.log('Bond per party (wei):', bond.toString(), '| burn on dual-PREPARE stall:', burnBps / 100, '%');
  console.log('Coordinator prepare timeout drives the stall; local lock TTL:', ttl, 's\n');

  // 1. Buyer locks the native payment leg so prepareNativeLeg can verify it.
  const bal = await token.balanceOf(buyer.address);
  if (bal < paymentAmount) {
    console.log('[1/6] Minting demo payment token to buyer...');
    await (await token.mint(buyer.address, paymentAmount)).wait();
  }
  console.log('[1/6] Approving + locking native payment leg...');
  await (await token.approve(ccLockAddr, paymentAmount)).wait();
  await (await ccLock.lock(settlementId, env('DEMO_CTC_TOKEN_ADDRESS'), seller.address, paymentAmount, expiry)).wait();

  // 2. Both parties PREPARE with a bond. This reaches the dual-PREPARE gate.
  console.log('\n[2/6] Both parties post bonds and PREPARE...');
  await (await ascSeller.prepareAttestedLeg(settlementId, '0x' + 'ab'.repeat(64), { value: bond })).wait();
  await (await ascBuyer.prepareNativeLeg(settlementId, { value: bond })).wait();
  console.log('      Coordinator state:', STATE_NAMES[await ascState(ascSeller, settlementId)], '(both legs prepared)');

  // 3. Advance to READY, then deliberately DO NOT commit - this is the stall.
  console.log('\n[3/6] submitProofs -> READY, then intentionally stalling (no COMMIT)...');
  // The mock verifier accepts any non-empty attestation for the dual-PREPARE binding in this demo.
  await (await ascSeller.submitProofs(settlementId, '0x' + 'ef'.repeat(32))).wait();
  const record = await ascSeller.getHandshake(settlementId);
  console.log('      Coordinator state:', STATE_NAMES[await ascState(ascSeller, settlementId)], '- neither party commits.');

  const burnedBefore = await ascSeller.totalBurned();

  // 4. Wait for the coordinator prepare/ready timeout so unlockHeld becomes callable.
  const timeoutDeadline = Number(record.readyTime) + 3600; // TIMEOUT == 1 hour on-chain
  console.log(`\n[4/6] Waiting for the coordinator commit window to expire...`);
  console.log('      (On-chain TIMEOUT is 1h; this loop polls until unlockHeld is accepted.)');
  // Try periodically; unlockHeld reverts with TimeoutNotReached until the window passes.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      await (await ascBuyer.unlockHeld(settlementId)).wait();
      break;
    } catch (e) {
      const now = Math.floor(Date.now() / 1000);
      if (now < timeoutDeadline) {
        process.stdout.write('.');
        await sleep(30000);
        continue;
      }
      throw e;
    }
  }
  console.log('\n      Coordinator state:', STATE_NAMES[await ascState(ascSeller, settlementId)]);

  // 5. Show the burn actually bit: totalBurned rose, and each party can only reclaim the remainder.
  const burnedAfter = await ascSeller.totalBurned();
  const expectedBurnPerBond = (bond * BigInt(burnBps)) / 10000n;
  const expectedKeptPerBond = bond - expectedBurnPerBond;
  console.log('\n[5/6] Bond forfeiture:');
  console.log('      totalBurned before:', formatEther(burnedBefore));
  console.log('      totalBurned after: ', formatEther(burnedAfter), `(+${formatEther(burnedAfter - burnedBefore)})`);
  console.log('      seller reclaimable:', formatEther(await ascSeller.pendingWithdrawals(seller.address)), '(expected', formatEther(expectedKeptPerBond) + ')');
  console.log('      buyer reclaimable: ', formatEther(await ascSeller.pendingWithdrawals(buyer.address)), '(expected', formatEther(expectedKeptPerBond) + ')');

  // 6. Each party pulls back only the surviving remainder - unilateral, no attestor.
  console.log('\n[6/6] Each party withdraws the surviving remainder of its bond...');
  const sellerBalBefore = await cc.getBalance(seller.address);
  const buyerBalBefore = await cc.getBalance(buyer.address);
  await (await ascSeller.withdrawBond()).wait();
  await (await ascBuyer.withdrawBond()).wait();
  console.log('      seller native balance delta:', formatEther((await cc.getBalance(seller.address)) - sellerBalBefore), '(minus gas)');
  console.log('      buyer native balance delta: ', formatEther((await cc.getBalance(buyer.address)) - buyerBalBefore), '(minus gas)');

  console.log('\n=== Griefing penalty demonstrated ===');
  console.log(`Both parties stalled a READY settlement; ${burnBps / 100}% of each bond was burned`);
  console.log('and is permanently unrecoverable. The remainder was reclaimed unilaterally, with no');
  console.log('attestor and no COMMIT - the bond makes stalling costly without touching custody.');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});

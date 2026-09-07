require('dotenv').config({ override: true });
const { Contract, JsonRpcProvider, Wallet } = require('ethers');

// Timeout keeper: scans recent coordinator settlements and drives the timeout-recovery
// path for any that are past their window — permissionlessly, with no attestor and no
// operator key required (any funded wallet can run this; the native-lock refunds
// themselves remain callable by anyone after the local lock expiry).
//
// Usage: node scripts/keeper-timeouts.js [--dry-run]
// Env:   CREDITCOIN_RPC_URL, HANDSHAKE_ASC_ADDRESS, KEEPER_PRIVATE_KEY (optional in dry-run)

const ASC_ABI = [
  'function getHandshake(bytes32 id) view returns (uint8 state, address initiator, uint256 prepareTime, uint256 readyTime, bytes32 leftCommit, bytes32 rightCommit, bytes32 manifest, bytes32 settlementEvidence)',
  'function unlockHeld(bytes32 id)',
  'function TIMEOUT() view returns (uint256)',
  'event Prepared(bytes32 indexed id)',
  'event CounterpartyPrepared(bytes32 indexed id)',
];

const STATE_NAMES = ['NONE', 'PREPARE', 'READY', 'COMMITTED', 'SETTLED', 'HELD'];
const PREPARE_STATE = 1;
const READY_STATE = 2;

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v.trim();
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const cc = new JsonRpcProvider(env('CREDITCOIN_RPC_URL'), undefined, { staticNetwork: true });
  const asc = new Contract(env('HANDSHAKE_ASC_ADDRESS'), ASC_ABI, cc);

  const timeout = Number(await asc.TIMEOUT());
  const head = await cc.getBlockNumber();
  const latest = await cc.getBlock(head);
  const now = Number(latest.timestamp);

  // Bounded recent window: settlements created but never driven are recent griefing
  // candidates; ancient ones have long since been recovered.
  const fromBlock = Math.max(0, head - Number(process.env.KEEPER_SCAN_BLOCKS || 20000));
  console.log(`Scanning blocks ${fromBlock}..${head} for timed-out settlements (timeout ${timeout}s)...`);

  const ids = new Set();
  for (const evt of ['Prepared', 'CounterpartyPrepared']) {
    try {
      const logs = await asc.queryFilter(evt, fromBlock, head);
      for (const log of logs) ids.add(log.args[0]);
    } catch (err) {
      console.log(`  (event scan for ${evt} skipped: ${err.shortMessage || err.message})`);
    }
  }
  console.log(`Found ${ids.size} settlement(s) with prepare activity.\n`);

  const keeper = dryRun ? null : new Wallet(env('KEEPER_PRIVATE_KEY'), cc);
  const actor = dryRun ? asc : asc.connect(keeper);
  let acted = 0;

  for (const id of ids) {
    const record = await actor.getHandshake(id);
    const state = Number(record.state);
    if (state !== PREPARE_STATE && state !== READY_STATE) continue; // terminal or NONE

    const windowStart = state === READY_STATE ? Number(record.readyTime) : Number(record.prepareTime);
    const deadline = windowStart + timeout;
    if (now < deadline) continue;

    console.log(`  ${id}: ${STATE_NAMES[state]} past its window (deadline block-time ${deadline}, now ${now})`);
    if (dryRun) {
      console.log('    dry-run: would call unlockHeld');
    } else {
      const tx = await actor.unlockHeld(id);
      await tx.wait();
      console.log(`    unlockHeld tx: ${tx.hash}`);
      acted++;
    }
  }

  if (dryRun) {
    console.log('\nDry run complete. Re-run without --dry-run (and KEEPER_PRIVATE_KEY) to act.');
  } else {
    console.log(`\nDone. ${acted} settlement(s) moved to HELD.`);
    console.log('The affected parties can now refund their native locks unilaterally after local expiry.');
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});

require('dotenv').config({ override: true });
const { Contract, JsonRpcProvider, formatEther } = require('ethers');

// Read-only liveness + wiring check for a live Handshake deployment.
// Verifies each documented address has code, both networks are the expected
// chains, and the contracts are wired to each other (no misconfigured pair).
// Exits non-zero on any failed check so it can gate CI or a demo checklist.

const EXPECTED = {
  creditcoinChainId: 102031n, // CC3 Testnet (the only chain the USC precompile whitelist accepts)
  ethereumChainId: 11155111n, // Sepolia
};

const ASC_ABI = [
  'function verifier() view returns (address)',
  'function creditcoinLock() view returns (address)',
  'function bondAmount() view returns (uint256)',
  'function bondBurnBps() view returns (uint256)',
];
const VERIFIER_ABI = [
  'function sourceChainKey() view returns (uint64)',
  'function sourceLock() view returns (address)',
];
const CC_COMMIT_ABI = ['function coordinator() view returns (address)'];
const LOCK_ABI = ['function commitStatus() view returns (address)'];
const ETH_COMMIT_ABI = [
  'function operator() view returns (address)',
  'function commitDelay() view returns (uint256)',
];

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required (see .env.example)`);
  return v.trim();
}

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}
function warn(name, detail) {
  console.log(`WARN  ${name}${detail ? ` — ${detail}` : ''}`);
}

async function hasCode(provider, address, label) {
  const code = await provider.getCode(address);
  check(`${label} has contract code (${address})`, code !== '0x', code === '0x' ? 'no bytecode at address' : `${(code.length - 2) / 2} bytes`);
  return code !== '0x';
}

async function main() {
  const cc = new JsonRpcProvider(env('CREDITCOIN_RPC_URL'), undefined, { staticNetwork: true });
  const eth = new JsonRpcProvider(env('ETHEREUM_SEPOLIA_RPC_URL'), undefined, { staticNetwork: true });

  const ascAddr = env('HANDSHAKE_ASC_ADDRESS');
  const ethLockAddr = env('ETHEREUM_LOCK_ADDRESS');
  const ccLockAddr = env('CREDITCOIN_LOCK_ADDRESS');
  const verifierAddr = process.env.ATTESTCOIN_VERIFIER_ADDRESS || '';
  const ccCommitAddr = process.env.CREDITCOIN_COMMIT_STATUS_ADDRESS || '';
  const ethCommitAddr = env('ETHEREUM_COMMIT_STATUS_ADDRESS');

  // --- Network identity ---
  const ccChain = (await cc.getNetwork()).chainId;
  const ethChain = (await eth.getNetwork()).chainId;
  check('Creditcoin RPC is CC3 Testnet (102031)', ccChain === EXPECTED.creditcoinChainId, `got ${ccChain}`);
  check('Ethereum RPC is Sepolia (11155111)', ethChain === EXPECTED.ethereumChainId, `got ${ethChain}`);

  // --- Bytecode presence ---
  await hasCode(cc, ascAddr, 'HandshakeASC (Creditcoin)');
  await hasCode(eth, ethLockAddr, 'Ethereum asset lock (Sepolia)');
  const verifierPresent = verifierAddr ? await hasCode(cc, verifierAddr, 'AttestcoinVerifier (Creditcoin)') : false;
  const ccCommitPresent = ccCommitAddr ? await hasCode(cc, ccCommitAddr, 'CreditcoinCommitStatus (Creditcoin)') : false;
  await hasCode(eth, ethCommitAddr, 'OperatorCommitStatus (Sepolia)');
  await hasCode(cc, ccLockAddr, 'Creditcoin payment lock (Creditcoin)');

  // --- Coordinator wiring ---
  const asc = new Contract(ascAddr, ASC_ABI, cc);
  const [verifier, creditcoinLock] = await Promise.all([asc.verifier(), asc.creditcoinLock()]);

  // Bond config is optional at the deployment level: a coordinator deployed before the
  // griefing-bond upgrade has no bond getters. Report it loudly but don't fail the check.
  try {
    const [bondAmount, bondBurnBps] = await Promise.all([asc.bondAmount(), asc.bondBurnBps()]);
    console.log(`\nCoordinator config: bond = ${formatEther(bondAmount)} CTC, burn = ${Number(bondBurnBps) / 100}% of a dual-PREPARE stall`);
  } catch {
    warn('Coordinator has no bond config', 'pre-bond deployment: griefing-bond demos need a redeploy of HandshakeASC (see DEPLOYMENT.md)');
  }

  const ethLock = new Contract(ethLockAddr, LOCK_ABI, eth);
  const ethLockCommitStatus = await ethLock.commitStatus();
  check('Ethereum lock commitStatus == OperatorCommitStatus', ethLockCommitStatus.toLowerCase() === ethCommitAddr.toLowerCase(),
    `${ethLockCommitStatus}`);

  const ccLock = new Contract(ccLockAddr, LOCK_ABI, cc);
  const ccLockCommitStatus = await ccLock.commitStatus();
  if (ccCommitPresent) {
    check('Creditcoin lock commitStatus == CreditcoinCommitStatus', ccLockCommitStatus.toLowerCase() === ccCommitAddr.toLowerCase(),
      `${ccLockCommitStatus}`);
    const ccCommit = new Contract(ccCommitAddr, CC_COMMIT_ABI, cc);
    const coordinator = await ccCommit.coordinator();
    check('CreditcoinCommitStatus.coordinator == HandshakeASC', coordinator.toLowerCase() === ascAddr.toLowerCase(), `${coordinator}`);
  }

  check('HandshakeASC.creditcoinLock == Creditcoin payment lock', creditcoinLock.toLowerCase() === ccLockAddr.toLowerCase(),
    `${creditcoinLock}`);

  // The verifier adapter must trust the SAME Ethereum lock the asset leg uses.
  const verifierContract = new Contract(verifier, VERIFIER_ABI, cc);
  const sourceLock = await verifierContract.sourceLock();
  check('AttestcoinVerifier.sourceLock == Ethereum asset lock', sourceLock.toLowerCase() === ethLockAddr.toLowerCase(),
    `${sourceLock}`);
  if (verifierPresent && verifierAddr) {
    check('HandshakeASC.verifier == deployed AttestcoinVerifier', verifier.toLowerCase() === verifierAddr.toLowerCase(), `${verifier}`);
  }

  // --- Configuration readout ---
  if (process.env.OPERATOR_ADDRESS) {
    const ethCommit = new Contract(ethCommitAddr, ETH_COMMIT_ABI, eth);
    const operator = await ethCommit.operator();
    check('OperatorCommitStatus.operator == OPERATOR_ADDRESS', operator.toLowerCase() === process.env.OPERATOR_ADDRESS.toLowerCase(),
      `${operator}`);
    const delay = await ethCommit.commitDelay();
    console.log(`Ethereum release delay: ${delay}s after a commit report`);
  }

  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${failed === 0 ? 'All checks passed' : `${failed} check(s) failed`} (${results.length} total).`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});

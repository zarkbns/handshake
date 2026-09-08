const { ethers } = require("ethers");
require("dotenv").config();

const { readFileSync } = require("fs");
const { join } = require("path");

async function main() {
  const rpc = process.env.CREDITCOIN_RPC_URL;
  if (!rpc) throw new Error("CREDITCOIN_RPC_URL required");
  const key = process.env.DEPLOYER_PRIVATE_KEY;
  if (!key) throw new Error("DEPLOYER_PRIVATE_KEY required");

  const provider = new ethers.JsonRpcProvider(rpc);
  const deployer = new ethers.Wallet(key, provider);
  const chainKey = BigInt(process.env.ATTESTCOIN_CHAIN_KEY || "1");
  const ethereumLock = process.env.ETHEREUM_LOCK_ADDRESS;
  if (!ethereumLock) throw new Error("ETHEREUM_LOCK_ADDRESS required");
  const bondAmount = process.env.HANDSHAKE_BOND_AMOUNT_WEI
    ? BigInt(process.env.HANDSHAKE_BOND_AMOUNT_WEI)
    : ethers.parseEther("0.01");
  const bondBurnBps = BigInt(process.env.HANDSHAKE_BOND_BURN_BPS || "5000");

  console.log(`Deployer: ${deployer.address}`);
  console.log(`Chain key: ${chainKey}`);
  console.log(`Ethereum lock: ${ethereumLock}`);
  console.log(`Bond: ${ethers.formatEther(bondAmount)} CTC, burn ${bondBurnBps} bps`);

  const artifacts = {};
  for (const name of ["AttestcoinVerifier", "HandshakeASC", "CreditcoinCommitStatus", "NativeSettlementLock"]) {
    const p = join(__dirname, "..", "out", `${name}.sol`, `${name}.json`);
    const raw = JSON.parse(readFileSync(p, "utf-8"));
    artifacts[name] = {
      abi: raw.abi,
      bytecode: raw.bytecode?.object,
    };
  }

  const nonce = await provider.getTransactionCount(deployer.address);
  const predictedLock = ethers.getCreateAddress({ from: deployer.address, nonce: nonce + 3 });

  console.log(`\nNonce: ${nonce} → predicting lock at ${predictedLock}\n`);

  // 1. AttestcoinVerifier(chainKey, ethereumLock)
  const verifierFactory = new ethers.ContractFactory(artifacts.AttestcoinVerifier.abi, artifacts.AttestcoinVerifier.bytecode, deployer);
  console.log("Deploying AttestcoinVerifier...");
  const verifier = await verifierFactory.deploy(chainKey, ethereumLock);
  await verifier.waitForDeployment();
  console.log(`  AttestcoinVerifier: ${await verifier.getAddress()}`);

  // 2. HandshakeASC(verifier, predictedLock, bondAmount, bondBurnBps)
  const coordinatorFactory = new ethers.ContractFactory(artifacts.HandshakeASC.abi, artifacts.HandshakeASC.bytecode, deployer);
  console.log("Deploying HandshakeASC...");
  const coordinator = await coordinatorFactory.deploy(
    await verifier.getAddress(),
    predictedLock,
    bondAmount,
    bondBurnBps
  );
  await coordinator.waitForDeployment();
  console.log(`  HandshakeASC: ${await coordinator.getAddress()}`);

  // 3. CreditcoinCommitStatus(coordinator)
  const commitStatusFactory = new ethers.ContractFactory(artifacts.CreditcoinCommitStatus.abi, artifacts.CreditcoinCommitStatus.bytecode, deployer);
  console.log("Deploying CreditcoinCommitStatus...");
  const commitStatus = await commitStatusFactory.deploy(await coordinator.getAddress());
  await commitStatus.waitForDeployment();
  console.log(`  CreditcoinCommitStatus: ${await commitStatus.getAddress()}`);

  // 4. NativeSettlementLock(commitStatus) — must match predictedLock
  const lockFactory = new ethers.ContractFactory(artifacts.NativeSettlementLock.abi, artifacts.NativeSettlementLock.bytecode, deployer);
  console.log("Deploying NativeSettlementLock (payment lock)...");
  const paymentLock = await lockFactory.deploy(await commitStatus.getAddress());
  await paymentLock.waitForDeployment();
  const lockAddr = await paymentLock.getAddress();
  console.log(`  NativeSettlementLock: ${lockAddr}`);

  if (lockAddr.toLowerCase() !== predictedLock.toLowerCase()) {
    throw new Error(`Lock address mismatch! Predicted: ${predictedLock}, got: ${lockAddr}`);
  }

  console.log(`\n✅ All 4 contracts deployed and address prediction verified!`);
  console.log(`\nAdd these to .env:`);
  console.log(`ATTESTCOIN_VERIFIER_ADDRESS=${await verifier.getAddress()}`);
  console.log(`HANDSHAKE_ASC_ADDRESS=${await coordinator.getAddress()}`);
  console.log(`CREDITCOIN_COMMIT_STATUS_ADDRESS=${await commitStatus.getAddress()}`);
  console.log(`CREDITCOIN_LOCK_ADDRESS=${lockAddr}`);
}

main().catch((e) => {
  console.error("Deployment failed:", e.message);
  process.exit(1);
});
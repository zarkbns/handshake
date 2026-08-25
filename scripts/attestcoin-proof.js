require('dotenv').config({ override: true });
const { JsonRpcProvider, Wallet } = require('ethers');
const { blockProver, proofProvider } = require('@gluwa/usc-sdk');

const DEFAULT_CHAIN_KEY = 1;
const DEFAULT_PROOF_BUILDER_URL = 'https://prover.cc3-testnet.creditcoin.network';

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

async function proveEthereumSepoliaTransaction({
  transactionHash,
  sourceRpcUrl = requiredEnv('ETHEREUM_SEPOLIA_RPC_URL'),
  creditcoinRpcUrl = requiredEnv('CREDITCOIN_RPC_URL'),
  proofBuilderUrl = process.env.ATTESTCOIN_PROOF_BUILDER_URL || DEFAULT_PROOF_BUILDER_URL,
  chainKey = Number(process.env.ATTESTCOIN_CHAIN_KEY || DEFAULT_CHAIN_KEY),
  privateKey,
}) {
  if (!/^0x[0-9a-fA-F]{64}$/.test(transactionHash)) {
    throw new TypeError('transactionHash must be a 32-byte hex transaction hash');
  }
  if (!Number.isSafeInteger(chainKey) || chainKey <= 0) {
    throw new TypeError('chainKey must be a positive safe integer');
  }

  const sourceProvider = new JsonRpcProvider(sourceRpcUrl, undefined, { staticNetwork: true });
  const creditcoinProvider = new JsonRpcProvider(creditcoinRpcUrl, undefined, { staticNetwork: true });
  const transaction = await sourceProvider.getTransaction(transactionHash);
  if (!transaction || transaction.blockNumber === null) {
    throw new Error('transaction is not mined on Ethereum Sepolia');
  }

  const proofBuilder = new proofProvider.service.ProofBuilder(chainKey, proofBuilderUrl);
  await proofBuilder.waitUntilHeightAttested(chainKey, transaction.blockNumber);
  const result = await proofBuilder.getProof(transactionHash);
  if (!result.success || !result.data) {
    throw new Error(`Attestcoin proof generation failed: ${result.error || 'unknown error'}`);
  }

  const { chainKey: proofChainKey, headerNumber, txBytes, merkleProof, continuityProof } = result.data;
  const prover = new blockProver.PrecompileBlockProver(creditcoinProvider);
  const verified = await prover.verifySingle(
    proofChainKey,
    headerNumber,
    txBytes,
    merkleProof,
    continuityProof,
  );
  if (!verified) throw new Error('Creditcoin Block Prover rejected the proof');

  const output = {
    chainKey: proofChainKey,
    headerNumber,
    transactionHash,
    txBytes,
    merkleProof,
    continuityProof,
    verified,
  };

  if (privateKey) {
    const signer = new Wallet(privateKey, creditcoinProvider);
    const tx = await prover.verifyAndEmitSingle(
      signer,
      proofChainKey,
      headerNumber,
      txBytes,
      merkleProof,
      continuityProof,
    );
    const receipt = await tx.wait();
    output.verificationTransactionHash = receipt.hash;
  }

  return output;
}

if (require.main === module) {
  const transactionHash = process.argv[2];
  if (!transactionHash) {
    console.error('Usage: node scripts/attestcoin-proof.js <ethereum-sepolia-tx-hash>');
    process.exitCode = 1;
  } else {
    proveEthereumSepoliaTransaction({
      transactionHash,
      privateKey: process.env.CREDITCOIN_WALLET_PRIVATE_KEY,
    })
      .then((result) => process.stdout.write(`${JSON.stringify(result, null, 2)}\n`))
      .catch((error) => {
        console.error(error.message);
        process.exitCode = 1;
      });
  }
}

module.exports = { proveEthereumSepoliaTransaction };

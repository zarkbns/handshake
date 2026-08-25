require('dotenv').config({ override: true });
const {
  Contract,
  JsonRpcProvider,
  Wallet,
  parseEther,
} = require('ethers');
const { deriveSettlementId } = require('./settlement-id');

const ERC20_ABI = [
  'function mint(address to, uint256 amount)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function balanceOf(address) view returns (uint256)',
];

const LOCK_ABI = [
  'function lock(bytes32 settlementId, address token, address recipient, uint256 amount, uint256 expiry)',
  'function locks(bytes32) view returns (uint8 state, address token, address depositor, address recipient, uint256 amount, uint256 expiry)',
  'event Locked(bytes32 indexed settlementId, address indexed token, address indexed depositor, address recipient, uint256 amount, uint256 expiry)',
];

function env(name) {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is required`);
  return v.trim();
}

async function main() {
  const eth = new JsonRpcProvider(env('ETHEREUM_SEPOLIA_RPC_URL'), undefined, { staticNetwork: true });
  const cc = new JsonRpcProvider(env('CREDITCOIN_RPC_URL'), undefined, { staticNetwork: true });

  const seller = new Wallet(env('SELLER_PRIVATE_KEY'), eth);
  const buyer = new Wallet(env('BUYER_PRIVATE_KEY'), cc);

  const ethLock = env('ETHEREUM_LOCK_ADDRESS');
  const ccLock = env('CREDITCOIN_LOCK_ADDRESS');
  const demoErc20 = env('DEMO_ERC20_ADDRESS');
  const demoCtcToken = env('DEMO_CTC_TOKEN_ADDRESS');

  const assetAmount = parseEther('10');
  const paymentAmount = parseEther('25');
  const expiry = Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60; // 3 days

  // Deterministic, replay-resistant settlement id shared by BOTH legs.
  const settlementId = deriveSettlementId({
    leftChainId: 11155111, // Ethereum Sepolia (attested leg)
    rightChainId: 102031, // Creditcoin (native leg)
    leftParty: seller.address,
    rightParty: buyer.address,
    leftToken: demoErc20,
    rightToken: demoCtcToken,
    leftAmount: assetAmount.toString(),
    rightAmount: paymentAmount.toString(),
    leftLockReference: '0x' + '11'.repeat(32),
    rightLockReference: '0x' + '22'.repeat(32),
    expiry,
  });

  console.log('Settlement ID:', settlementId);

  // --- Ethereum Sepolia asset leg (seller) ---
  const erc20 = new Contract(demoErc20, ERC20_ABI, seller);
  const sellerAssetLock = new Contract(ethLock, LOCK_ABI, seller);

  const sellerBal = await erc20.balanceOf(seller.address);
  if (sellerBal < assetAmount) {
    console.log('Minting demo ERC-20 to seller...');
    await (await erc20.mint(seller.address, assetAmount)).wait();
  }
  console.log('Approving asset lock...');
  await (await erc20.approve(ethLock, assetAmount)).wait();

  console.log('Locking asset on Ethereum Sepolia...');
  const assetTx = await sellerAssetLock.lock(settlementId, demoErc20, buyer.address, assetAmount, expiry);
  const assetReceipt = await assetTx.wait();
  console.log('Ethereum asset lock tx:', assetReceipt.hash);

  // --- Creditcoin native payment leg (buyer) ---
  const ctcToken = new Contract(demoCtcToken, ERC20_ABI, buyer);
  const buyerPaymentLock = new Contract(ccLock, LOCK_ABI, buyer);

  const buyerBal = await ctcToken.balanceOf(buyer.address);
  if (buyerBal < paymentAmount) {
    console.log('Minting demo payment token to buyer...');
    await (await ctcToken.mint(buyer.address, paymentAmount)).wait();
  }
  console.log('Approving payment lock...');
  await (await ctcToken.approve(ccLock, paymentAmount)).wait();

  console.log('Locking payment on Creditcoin...');
  const payTx = await buyerPaymentLock.lock(settlementId, demoCtcToken, seller.address, paymentAmount, expiry);
  const payReceipt = await payTx.wait();
  console.log('Creditcoin payment lock tx:', payReceipt.hash);

  console.log('\n=== Both legs locked ===');
  console.log(JSON.stringify({
    settlementId,
    ethereumAssetLockTx: assetReceipt.hash,
    creditcoinPaymentLockTx: payReceipt.hash,
    expiry,
  }, null, 2));
  console.log('\nNext: wait for Sepolia block attestation, then:');
  console.log('  npm run prove:ethereum ' + assetReceipt.hash);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});

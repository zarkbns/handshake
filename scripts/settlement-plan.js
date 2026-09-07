const { getAddress, isAddress, isHexString } = require('ethers');
const { deriveSettlementId } = require('./settlement-id');

function requirePositiveInteger(value, name) {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive safe integer`);
  }
}

function requireBytes32(value, name) {
  if (!isHexString(value, 32)) throw new TypeError(`${name} must be bytes32`);
}

function requireProof(value, name) {
  if (value !== undefined && !isHexString(value)) throw new TypeError(`${name} must be hex bytes`);
}

function normalizePlan(input) {
  if (!input || typeof input !== 'object') throw new TypeError('settlement plan is required');

  for (const name of ['leftParty', 'rightParty', 'leftToken', 'rightToken']) {
    if (!isAddress(input[name])) throw new TypeError(`${name} must be an address`);
  }
  if (getAddress(input.leftParty) === getAddress(input.rightParty)) {
    throw new TypeError('settlement parties must be distinct');
  }
  for (const name of ['leftChainId', 'rightChainId', 'leftAmount', 'rightAmount', 'expiry']) {
    if (input[name] === undefined || input[name] === null) throw new TypeError(`${name} is required`);
  }

  requirePositiveInteger(input.leftChainId, 'leftChainId');
  requirePositiveInteger(input.rightChainId, 'rightChainId');
  requirePositiveInteger(input.expiry, 'expiry');
  if (BigInt(input.leftAmount) <= 0n || BigInt(input.rightAmount) <= 0n) {
    throw new TypeError('amounts must be positive');
  }
  requireBytes32(input.leftLockReference, 'leftLockReference');
  requireBytes32(input.rightLockReference, 'rightLockReference');
  requireProof(input.leftProof, 'leftProof');
  requireProof(input.rightProof, 'rightProof');
  requireProof(input.attestations, 'attestations');

  const plan = {
    leftChainId: input.leftChainId,
    rightChainId: input.rightChainId,
    leftParty: getAddress(input.leftParty),
    rightParty: getAddress(input.rightParty),
    leftToken: getAddress(input.leftToken),
    rightToken: getAddress(input.rightToken),
    leftAmount: BigInt(input.leftAmount).toString(),
    rightAmount: BigInt(input.rightAmount).toString(),
    leftLockReference: input.leftLockReference,
    rightLockReference: input.rightLockReference,
    expiry: input.expiry,
    leftProof: input.leftProof,
    rightProof: input.rightProof,
    attestations: input.attestations,
  };
  // The relayer registers these canonical terms on the coordinator (registerTerms) before
  // any prepare, binding the settlement id to the exact on-chain economics.
  const terms = {
    leftChainId: plan.leftChainId,
    rightChainId: plan.rightChainId,
    leftParty: plan.leftParty,
    rightParty: plan.rightParty,
    leftToken: plan.leftToken,
    rightToken: plan.rightToken,
    leftAmount: plan.leftAmount,
    rightAmount: plan.rightAmount,
    leftLockReference: plan.leftLockReference,
    rightLockReference: plan.rightLockReference,
    expiry: plan.expiry,
  };
  return { ...plan, terms, settlementId: deriveSettlementId(terms) };
}

module.exports = { normalizePlan };

const { AbiCoder, keccak256 } = require('ethers');

const coder = AbiCoder.defaultAbiCoder();

function deriveSettlementId(fields) {
  const values = [
    fields.leftChainId,
    fields.rightChainId,
    fields.leftParty,
    fields.rightParty,
    fields.leftToken,
    fields.rightToken,
    fields.leftAmount,
    fields.rightAmount,
    fields.leftLockReference,
    fields.rightLockReference,
    fields.expiry,
  ];

  if (values.some((value) => value === undefined || value === null)) {
    throw new TypeError('all settlement fields are required');
  }

  return keccak256(
    coder.encode(
      [
        'uint256',
        'uint256',
        'address',
        'address',
        'address',
        'address',
        'uint256',
        'uint256',
        'bytes32',
        'bytes32',
        'uint256',
      ],
      values
    )
  );
}

module.exports = { deriveSettlementId };

if (require.main === module) {
  const input = JSON.parse(process.env.SETTLEMENT_JSON || '{}');
  process.stdout.write(`${deriveSettlementId(input)}\n`);
}

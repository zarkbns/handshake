// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IAttestationVerifier} from "./interfaces/IAttestationVerifier.sol";
import {
    INativeQueryVerifier,
    NativeQueryVerifierLib
} from "@gluwa/usc-contracts/contracts/write-ability/common/INativeQueryVerifier.sol";
import {EvmV1Decoder} from "@gluwa/usc-contracts/contracts/write-ability/common/EvmV1Decoder.sol";

/// @title AttestcoinVerifier
/// @notice Production adapter that verifies an Ethereum-side settlement lock through the
///         Creditcoin Attestcoin Block Prover precompile (0x0FD2) and binds the proven
///         `Locked` event to a Handshake settlement id and participant.
/// @dev This contract never trusts a caller-supplied boolean. It decodes the prover-verified
///      transaction bytes and enforces:
///        - the source-chain block was attested (checked by the precompile),
///        - the source transaction succeeded (receipt status == 1),
///        - the lock event was emitted by the configured source-chain lock contract,
///        - the event's settlement id and depositor match the coordinator's expectations.
contract AttestcoinVerifier is IAttestationVerifier {
    using EvmV1Decoder for bytes;

    /// @dev keccak256("Locked(bytes32,address,address,address,uint256,uint256)")
    bytes32 public constant LOCKED_EVENT_SIGNATURE =
        keccak256("Locked(bytes32,address,address,address,uint256,uint256)");

    /// @notice Attestcoin chain key for the attested source chain (Ethereum Sepolia == 1 on CC3 Testnet).
    uint64 public immutable sourceChainKey;

    /// @notice The `NativeSettlementLock` address on the source chain whose events are trusted.
    address public immutable sourceLock;

    INativeQueryVerifier public immutable blockProver;

    error PrecompileUnavailable();
    error InvalidSourceLock();
    error ProofRejected();
    error SourceTransactionFailed();
    error LockEventNotFound();

    constructor(uint64 sourceChainKey_, address sourceLock_) {
        if (sourceLock_ == address(0)) revert InvalidSourceLock();
        if (!NativeQueryVerifierLib.hasPrecompile()) revert PrecompileUnavailable();
        sourceChainKey = sourceChainKey_;
        sourceLock = sourceLock_;
        blockProver = NativeQueryVerifierLib.getVerifier();
    }

    /// @dev Proof bundle produced by scripts/attestcoin-proof.js and the Attestcoin SDK, ABI-encoded as:
    ///      abi.encode(uint64 height, bytes txBytes, MerkleProof merkleProof, ContinuityProof continuityProof)
    struct LegProof {
        uint64 height;
        bytes txBytes;
        INativeQueryVerifier.MerkleProof merkleProof;
        INativeQueryVerifier.ContinuityProof continuityProof;
    }

    /// @inheritdoc IAttestationVerifier
    function verifyPrepareLeg(bytes calldata proof, bytes32 settlementId, address participant)
        external
        view
        returns (bool)
    {
        LegProof memory legProof = abi.decode(proof, (LegProof));

        bool proven = blockProver.verify(
            sourceChainKey,
            legProof.height,
            legProof.txBytes,
            legProof.merkleProof,
            legProof.continuityProof
        );
        if (!proven) revert ProofRejected();

        EvmV1Decoder.ReceiptFields memory receipt = EvmV1Decoder.decodeReceiptFields(legProof.txBytes);
        if (receipt.receiptStatus != 1) revert SourceTransactionFailed();

        EvmV1Decoder.LogEntry[] memory lockedLogs =
            EvmV1Decoder.getLogsByEventSignature(receipt, LOCKED_EVENT_SIGNATURE);

        uint256 length = lockedLogs.length;
        for (uint256 i; i < length; ++i) {
            EvmV1Decoder.LogEntry memory log = lockedLogs[i];
            // Locked(bytes32 indexed settlementId, address indexed token, address indexed depositor, ...)
            if (log.topics.length != 4) continue;
            if (log.address_ != sourceLock) continue;
            if (log.topics[1] != settlementId) continue;
            if (address(uint160(uint256(log.topics[3]))) != participant) continue;
            return true;
        }
        revert LockEventNotFound();
    }

    /// @inheritdoc IAttestationVerifier
    /// @dev The dual-PREPARE gate is enforced by HandshakeASC, which requires two distinct
    ///      participants to each pass `verifyPrepareLeg` before this aggregate check. Each leg's
    ///      inclusion + continuity proof is already verified by the precompile at prepare time,
    ///      so this confirms both prepare commitments are bound to the same settlement id.
    function verifyPrepare(
        bytes calldata attestation,
        bytes32 settlementId,
        bytes32 leftPrepare,
        bytes32 rightPrepare
    ) external pure returns (bool) {
        if (settlementId == bytes32(0)) return false;
        if (leftPrepare == bytes32(0) || rightPrepare == bytes32(0)) return false;
        if (leftPrepare == rightPrepare) return false;
        // The attestation binds both prepare commitments to this settlement id.
        bytes32 expected = keccak256(abi.encode(settlementId, leftPrepare, rightPrepare));
        return abi.decode(attestation, (bytes32)) == expected;
    }

    /// @inheritdoc IAttestationVerifier
    /// @dev Settlement finalization is recorded after the irreversible Creditcoin COMMIT and binds
    ///      the finalization attestation to the accepted evidence manifest.
    function verifySettlement(bytes calldata attestation, bytes32 settlementId, bytes32 evidenceManifest)
        external
        pure
        returns (bool)
    {
        if (settlementId == bytes32(0) || evidenceManifest == bytes32(0)) return false;
        bytes32 expected = keccak256(abi.encode(settlementId, evidenceManifest));
        return abi.decode(attestation, (bytes32)) == expected;
    }
}

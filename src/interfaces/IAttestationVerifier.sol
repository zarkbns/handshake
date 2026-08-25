// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title IAttestationVerifier
/// @notice Narrow adapter for the Attestcoin verifier/precompile on Creditcoin.
/// @dev The concrete verifier is supplied by the deployment environment. This
///      contract never interprets or trusts attestation bytes on its own.
interface IAttestationVerifier {
    /// @notice Verifies one source-chain prepare/lock event.
    /// @dev The adapter must enforce the configured source-chain finality buffer,
    ///      bind the event to `settlementId` and `participant`, and reject a proof
    ///      that has already been reorged out.
    function verifyPrepareLeg(
        bytes calldata proof,
        bytes32 settlementId,
        address participant
    ) external view returns (bool);

    function verifyPrepare(
        bytes calldata attestation,
        bytes32 settlementId,
        bytes32 leftPrepare,
        bytes32 rightPrepare
    ) external view returns (bool);

    function verifySettlement(
        bytes calldata attestation,
        bytes32 settlementId,
        bytes32 evidenceManifest
    ) external view returns (bool);
}

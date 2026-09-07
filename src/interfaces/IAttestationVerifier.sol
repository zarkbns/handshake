// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title IAttestationVerifier
/// @notice Narrow adapter for the Attestcoin verifier/precompile on Creditcoin.
/// @dev The concrete verifier is supplied by the deployment environment. This
///      contract never interprets or trusts attestation bytes on its own.
interface IAttestationVerifier {
    /// @notice Expected on-chain economics of one settlement leg, matched against the
    ///         proven lock event and the native lock state.
    struct ExpectedLeg {
        address token;
        address recipient;
        uint256 amount;
        uint256 expiry;
    }

    /// @notice Verifies one source-chain prepare/lock event and binds its full economics
    ///         to the expected settlement terms.
    /// @dev The adapter must enforce the configured source-chain finality buffer, verify the
    ///      Attestcoin inclusion + continuity proof of the lock transaction, and decode the
    ///      proven `Locked` event to require that its settlement id, token, depositor
    ///      (participant), recipient, amount and expiry all match the expected terms.
    function verifyPrepareLeg(
        bytes calldata proof,
        bytes32 settlementId,
        address participant,
        ExpectedLeg calldata expected
    ) external view returns (bool);
}

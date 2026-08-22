// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IAttestationVerifier} from "../src/interfaces/IAttestationVerifier.sol";

/// @dev Deterministic local adapter used only for contract tests. Production
/// deployments must point HandshakeASC at the Creditcoin verifier/precompile.
contract MockAttestationVerifier is IAttestationVerifier {
    bool public prepareValid;
    bool public settlementValid;
    bool public prepareLegValid;

    function setPrepareValid(bool valid) external {
        prepareValid = valid;
    }

    function setSettlementValid(bool valid) external {
        settlementValid = valid;
    }

    function setPrepareLegValid(bool valid) external {
        prepareLegValid = valid;
    }

    function verifyPrepareLeg(bytes calldata, bytes32, address)
        external
        view
        returns (bool)
    {
        return prepareLegValid;
    }

    function verifyPrepare(bytes calldata, bytes32, bytes32, bytes32)
        external
        view
        returns (bool)
    {
        return prepareValid;
    }

    function verifySettlement(bytes calldata, bytes32, bytes32)
        external
        view
        returns (bool)
    {
        return settlementValid;
    }
}

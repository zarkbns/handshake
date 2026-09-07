// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IAttestationVerifier} from "../src/interfaces/IAttestationVerifier.sol";

/// @dev Deterministic local adapter used only for contract tests. Production
///      deployments must point HandshakeASC at the Creditcoin verifier/precompile.
///      Models the production adapter's contract: when `strictLeg` is set, the leg
///      proof only verifies if the coordinator passed through the exact expected
///      leg economics — so a coordinator that failed to bind terms would fail these
///      tests. The removed aggregate paths (verifyPrepare/verifySettlement) return
///      false: no aggregate-attestation layer exists in the protocol anymore.
contract MockAttestationVerifier is IAttestationVerifier {
    bool public prepareLegValid;
    bool public strictLeg;
    ExpectedLeg public expectedLeg;

    function setPrepareLegValid(bool valid) external {
        prepareLegValid = valid;
    }

    function setStrictLeg(ExpectedLeg calldata expected) external {
        strictLeg = true;
        expectedLeg = expected;
    }

    function clearStrictLeg() external {
        strictLeg = false;
    }

    function verifyPrepareLeg(bytes calldata, bytes32, address, ExpectedLeg calldata passed)
        external
        view
        returns (bool)
    {
        if (!prepareLegValid) return false;
        if (strictLeg) {
            return passed.token == expectedLeg.token && passed.recipient == expectedLeg.recipient
                && passed.amount == expectedLeg.amount && passed.expiry == expectedLeg.expiry;
        }
        return true;
    }

    function verifyPrepare(bytes calldata, bytes32, bytes32, bytes32) external pure returns (bool) {
        return false;
    }

    function verifySettlement(bytes calldata, bytes32, bytes32) external pure returns (bool) {
        return false;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title IHandshake - Cross-chain DvP settlement state machine (Creditcoin ASC).
/// @notice Interface for the Handshake settlement coordinator built on the Attestcoin
///         Protocol. Assets stay under native custody on their source chains; only
///         cryptographically attested settlement state transitions are recorded here.
    /// @dev Canonical lifecycle:
    ///          NONE -> PREPARE -> READY -> COMMITTED -> SETTLED
    ///          (pre-commit timeout at any stage) -> HELD -> unilateral refund via unlockHeld
///      Implementation invariants (see GUIDE.md):
///      - `commit` is the single point of no return and executes only on Creditcoin.
///      - Nothing on any source chain may become irreversible before `commit`.
///      - Recovery via `unlockHeld` must be reachable without attestor cooperation.
///      - Every state transition MUST emit its corresponding event.
interface IHandshake {
    /// @notice Canonical settlement terms. The settlement id is derived from exactly these
    ///         fields (see SettlementId), and both legs are verified against them at PREPARE.
    /// @dev `left` is the attested (foreign-chain, e.g. Ethereum Sepolia) asset leg;
    ///      `right` is the Creditcoin-native payment leg. Recipients are the counterparty:
    ///      the asset leg pays `rightParty`, the payment leg pays `leftParty`.
    struct Terms {
        uint256 leftChainId;
        uint256 rightChainId;
        address leftParty;
        address rightParty;
        address leftToken;
        address rightToken;
        uint256 leftAmount;
        uint256 rightAmount;
        bytes32 leftLockReference;
        bytes32 rightLockReference;
        uint256 expiry;
    }

    /// @notice Lifecycle state of a settlement identified by its `bytes32` id.
    enum State {
        /// @dev No settlement registered under this id.
        NONE,
        /// @dev At least one party has proven a source-chain prepare/lock; awaiting
        ///      the counterparty's prepare and/or valid proofs (dual-PREPARE gate).
        PREPARE,
        /// @dev Both prepares proven against an attestor quorum; the bounded,
        ///      irreversible-commit window is open.
        READY,
        /// @dev COMMIT executed on Creditcoin. Point of no return for this settlement.
        COMMITTED,
        /// @dev Delivery-versus-payment completed; both legs finalized.
        SETTLED,
        /// @dev Pre-commit timeout expired; unilateral, attestor-independent refund
        ///      path is available.
        HELD
    }

    /// @notice Emitted when a settlement first leaves NONE and enters PREPARE.
    /// @param id Settlement identifier.
    event Prepared(bytes32 indexed id);

    /// @notice Emitted when the counterparty submits the second prepare.
    /// @param id Settlement identifier.
    event CounterpartyPrepared(bytes32 indexed id);

    /// @notice Emitted when the dual-PREPARE gate is satisfied and proofs verify,
    ///         moving the settlement into READY.
    /// @param id Settlement identifier.
    event Ready(bytes32 indexed id);

    /// @notice Emitted when the irreversible COMMIT is executed on Creditcoin.
    /// @param id Settlement identifier.
    event Committed(bytes32 indexed id);

    /// @notice Emitted when native-chain finalization is attested after COMMIT.
    /// @param id Settlement identifier.
    event Settled(bytes32 indexed id);

    /// @notice Emitted when the pre-commit timeout expires and the settlement
    ///         enters HELD, enabling the unilateral refund path.
    /// @param id Settlement identifier.
    event Held(bytes32 indexed id);

    /// @notice Emitted when a party posts its griefing-protection performance bond at PREPARE.
    /// @param id Settlement identifier.
    /// @param party The address that posted the bond.
    /// @param amount Bond amount in wei of native CTC.
    event BondPosted(bytes32 indexed id, address indexed party, uint256 amount);

    /// @notice Emitted when canonical settlement terms are registered for `id`.
    /// @dev The registered terms hash to `id` via SettlementId.derive — this event is the
    ///      on-chain record that the id-to-terms binding was verified at the trust boundary.
    event TermsRegistered(bytes32 indexed id);

    /// @notice Emitted when bond balances are resolved on a terminal transition.
    /// @param id Settlement identifier.
    /// @param burned Total bond value burned as griefing penalty (0 on COMMIT / single-leg HELD).
    event BondsResolved(bytes32 indexed id, uint256 burned);

    /// @notice Emitted when a party withdraws its credited bond balance (pull payment).
    /// @param party The address withdrawing.
    /// @param amount Amount withdrawn in wei of native CTC.
    event BondWithdrawn(address indexed party, uint256 amount);

    /// @notice Returns the hash of the evidence manifest accepted for `id`.
    /// @dev The manifest binds both prepare proof hashes.
    function evidenceManifest(bytes32 id) external view returns (bytes32);

    /// @notice Registers the canonical settlement terms for `id`.
    /// @dev Permissionless and idempotent (same terms only). The coordinator recomputes
    ///      `SettlementId.derive` over the given terms and requires it to equal `id`, so the
    ///      id is enforced as the canonical binding of every economic field at the trust
    ///      boundary. Both prepare functions verify their leg's on-chain lock economics
    ///      (token, depositor, recipient, amount, expiry) against these terms.
    ///      Must be called before the first prepare.
    function registerTerms(bytes32 id, Terms calldata terms) external;

    /// @notice Prepares the Attestcoin-proven leg (an Ethereum Sepolia lock).
    /// @dev Drives NONE -> PREPARE and satisfies one half of the dual-PREPARE gate. The proof is
    ///      an Attestcoin inclusion/continuity proof of the caller's source-chain lock event; the
    ///      verifier binds the proven lock's token, depositor, recipient, amount and expiry to the
    ///      registered terms. The caller MUST attach exactly the configured griefing bond as
    ///      `msg.value`.
    /// @param id Unique settlement identifier.
    /// @param proof ABI-encoded Attestcoin proof of the caller's source-chain lock event.
    function prepareAttestedLeg(bytes32 id, bytes calldata proof) external payable;

    /// @notice Prepares the Creditcoin-native leg, verified directly against the native lock state.
    /// @dev No Attestcoin proof is required because the native lock lives on the coordinator's own
    ///      chain. The caller must hold an active LOCKED position under `id` whose token,
    ///      depositor, recipient, amount and expiry all match the registered terms. The caller
    ///      MUST attach exactly the configured griefing bond as `msg.value`.
    /// @param id Unique settlement identifier.
    function prepareNativeLeg(bytes32 id) external payable;

    /// @notice Records finalization evidence after both native legs have delivered.
    /// @dev Deliberately evidence-recording only: the release authorization itself lives in the
    ///      native locks (release is only possible after the coordinator's COMMIT). The payload
    ///      is the operator's finalization report (e.g. delivery transaction hashes) and is not
    ///      treated as a cryptographic attestation — no aggregate attestation layer exists in
    ///      this protocol. Only reachable after the irreversible Creditcoin COMMIT.
    function settle(bytes32 id, bytes calldata finalizationReport) external;

    /// @notice Executes the irreversible COMMIT on Creditcoin (point of no return).
    /// @dev Permissionless and callable only while READY and within the commit window; MUST NOT
    ///      be reachable once the settlement is HELD. READY itself is the authorization: it is
    ///      reached only after BOTH legs were individually verified — the attested leg through a
    ///      precompile-verified Attestcoin inclusion + continuity proof whose lock event matched
    ///      the registered canonical terms, and the native leg directly against the Creditcoin
    ///      lock state (full economics matched). After this succeeds, parties may safely
    ///      finalize delivery/release on their native chains.
    /// @param id Unique settlement identifier.
    function commit(bytes32 id) external;

    /// @notice Unilaterally completes the refund path for a HELD settlement,
    ///         authorizing the source-chain unlock.
    /// @dev Timeout-driven and permissionless (or initiator-invoked) per GUIDE.md;
    ///      MUST NOT require attestor signatures or attestor liveness so that no
    ///      party remains locked indefinitely.
    /// @param id Unique settlement identifier.
    function unlockHeld(bytes32 id) external;

    /// @notice Withdraws the caller's credited griefing-bond balance (pull payment).
    /// @dev Bonds are credited on the terminal transition: COMMIT refunds both bonds in full;
    ///      a dual-PREPARE HELD applies the configured burn split before crediting the remainder;
    ///      a single-leg HELD refunds the honest first mover in full. MUST never require attestor
    ///      cooperation, matching the refund-path invariant.
    function withdrawBond() external;

    /// @notice Returns whether `id` has reached the irreversible COMMIT boundary.
    function isCommitted(bytes32 id) external view returns (bool);

    /// @notice Returns the coordinator record and evidence references for `id`.
    function getHandshake(bytes32 id)
        external
        view
        returns (
            State state,
            address initiator,
            uint256 prepareTime,
            uint256 readyTime,
            bytes32 leftCommit,
            bytes32 rightCommit,
            bytes32 manifest,
            bytes32 settlementEvidence
        );
}

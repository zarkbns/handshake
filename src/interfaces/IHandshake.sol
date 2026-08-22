// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

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

    /// @notice Returns the hash of the evidence manifest accepted for `id`.
    /// @dev The manifest binds both prepare proofs and the attestation payload.
    function evidenceManifest(bytes32 id) external view returns (bytes32);

    /// @notice Records the caller's side of settlement `id`, backed by an Attestcoin
    ///         proof of their source-chain prepare/lock transaction.
    /// @dev Drives NONE -> PREPARE (first valid prepare) and satisfies one half of
    ///      the dual-PREPARE gate thereafter. Must remain non-custodial and
    ///      reversible: no source-chain value moves irrevocably at this stage.
    /// @param id Unique settlement identifier.
    /// @param proof ABI-encoded Attestcoin inclusion/continuity proof of the
    ///        caller's source-chain prepare event.
    function prepare(bytes32 id, bytes calldata proof) external;

    /// @notice Submits aggregated attestor attestations covering BOTH parties'
    ///         prepare events. On successful quorum verification the settlement
    ///         becomes READY and the commit window opens.
    /// @dev Transitions PREPARE -> READY only; enforces the dual-PREPARE gate.
    ///      Per-source-chain reorg/finality buffers must be respected before
    ///      proofs are accepted.
    /// @param id Unique settlement identifier.
    /// @param attestations ABI-encoded BLS-aggregated attestations (with continuity
    ///        proofs) attesting to both source-chain prepare events.
    function submitProofs(bytes32 id, bytes calldata attestations) external;

    /// @notice Executes the irreversible COMMIT on Creditcoin (point of no return).
    /// @dev Callable only while READY and within the commit window; MUST NOT be
    ///      reachable once the settlement is HELD. After this succeeds, parties may
    ///      safely finalize delivery/release on their native chains.
    /// @param id Unique settlement identifier.
    function commit(bytes32 id) external;

    /// @notice Records attested finalization of both native-chain legs.
    /// @dev This is only reachable after the irreversible Creditcoin COMMIT.
    function settle(bytes32 id, bytes calldata attestation) external;

    /// @notice Unilaterally completes the refund path for a HELD settlement,
    ///         authorizing the source-chain unlock.
    /// @dev Timeout-driven and permissionless (or initiator-invoked) per GUIDE.md;
    ///      MUST NOT require attestor signatures or attestor liveness so that no
    ///      party remains locked indefinitely.
    /// @param id Unique settlement identifier.
    function unlockHeld(bytes32 id) external;

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

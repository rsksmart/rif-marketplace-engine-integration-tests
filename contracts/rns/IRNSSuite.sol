// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

// This is temporary until we fix the AbstractRNS solidity version to one that is compatible.
interface IRNS {
    function owner(bytes32 node) external view returns (address);

    function resolver(bytes32 node) external view returns (address);

    function ttl(bytes32 node) external view returns (uint64);

    function setOwner(bytes32 node, address ownerAddress) external;

    function setSubnodeOwner(
        bytes32 node,
        bytes32 label,
        address ownerAddress
    ) external;

    function setResolver(bytes32 node, address resolverAddress) external;

    function setTTL(bytes32 node, uint64 ttlValue) external;

    // Logged when the owner of a node assigns a new owner to a subnode.
    event NewOwner(
        bytes32 indexed node,
        bytes32 indexed label,
        address ownerAddress
    );

    // Logged when the owner of a node transfers ownership to a new account.
    event Transfer(bytes32 indexed node, address ownerAddress);

    // Logged when the resolver for a node changes.
    event NewResolver(bytes32 indexed node, address resolverAddress);

    // Logged when the TTL of a node changes
    event NewTTL(bytes32 indexed node, uint64 ttlValue);
}

interface IRSKFIFSRegistrar {
    /// ----------------------------
    /// @title First-in first-served registrar.
    /// @notice You can use this contract to register .rsk names in RNS.
    /// @dev This contract has permission to register in RSK Owner.
    /*
        0. Caclulate makeCommitment hash of the domain to be registered (off-chain)
        1. Commit the calculated hash
        2. Wait minCommitmentAge
        3. Execute registration via inheriting contract.
    */

    // 0.
    /// @notice Create a commitment for register action.
    /// @dev Don't use this method on-chain when commiting.
    /// @param label keccak256 of the name to be registered.
    /// @param nameOwner Owner of the name to be registered.
    /// @param secret Secret to protect the name to be registered.
    /// @return The commitment hash.
    function makeCommitment(
        bytes32 label,
        address nameOwner,
        bytes32 secret
    ) external pure returns (bytes32);

    // {
    //     return keccak256(abi.encodePacked(label, nameOwner, secret));
    // }
    // 1.
    /// @notice Commit before registring a name.
    /// @dev A valid commitment can be calculated using makeCommitment off-chain.
    /// @param commitment A valid commitment hash.
    function commit(bytes32 commitment) external;

    // {
    //     require(commitmentRevealTime[commitment] < 1, "Existent commitment");
    //     commitmentRevealTime[commitment] = now.add(minCommitmentAge);
    // }
}

interface IRSKOwner {
    function transferFrom(
        address nodeOwner,
        address newOwner,
        uint256 tokenId
    ) external;
}

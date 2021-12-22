// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

interface RNSNameGenerationStrategy {
    function generate(address _asset) external returns (bytes32);
}

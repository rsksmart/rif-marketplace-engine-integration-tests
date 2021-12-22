// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

interface IDGenerationStrategy {
    function generate() external returns (uint256);
}

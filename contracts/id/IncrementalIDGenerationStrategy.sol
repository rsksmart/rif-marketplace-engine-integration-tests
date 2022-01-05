// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {IDGenerationStrategy} from "./IDGenerationStrategy.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

/**
    @author RIF Protocols Team @IOVLabs
    @title IncrementalOrderIDGenerationStrategy

    @dev Partial marketplace contract, defining an incremental strategy for ids.
 */
contract IncrementalIDGenerationStrategy is IDGenerationStrategy {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    function getTokenCounter() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
        @notice Generates the id using openzeppelin Counter. 
        @return result an uint256 with the id value.
    */
    function generate() external override returns (uint256) {
        _tokenIdCounter.increment();
        return _tokenIdCounter.current();
    }
}

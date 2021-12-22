// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {RNSNameGenerationStrategy} from "./RNSNameGenerationStrategy.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract NFTRNSNameGenerationStrategy is RNSNameGenerationStrategy {
    /**
        @notice Generates the domain name using openzeppelin IERC721Metadata interface. 
        @param _asset an IERC721Metadata contract address, to retreive the token details.
        @return result it consists of the asset name and a literal string: name and .mkpdomain.rsk.
    */
    function generate(address _asset) external view override returns (bytes32) {
        string memory name = IERC721Metadata(_asset).name();

        return
            bytes(name).length == 0
                ? bytes32(0)
                : keccak256(abi.encodePacked(name, ".mkpdomain.rsk"));
    }
}

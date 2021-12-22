// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IMarketplace} from "../IMarketplace.sol";

interface ISaleStrategy {
    /**
        @notice Execute order for sell.
        @param _buyerAddr contract address for buyer.
        @param _nft NFT.
        @param _mkp marketplace.
        @param _tokenId token owned by provider in order.
        @param _orderId Id of an Order put on Marketplace for sell.
        @return bool.
     */
    function execute(
        address _buyerAddr,
        IERC721 _nft,
        IMarketplace _mkp,
        uint256 _tokenId,
        uint256 _orderId
    ) external returns (bool);
}

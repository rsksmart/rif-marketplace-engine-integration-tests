// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {ISaleStrategy} from "./ISaleStrategy.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Order, OrderStatus} from "../order/Order.sol";
import {IMarketplace} from "../IMarketplace.sol";

contract FixedRateSellStrategy is ISaleStrategy {
    /**
        @dev Sell order execution using IERC721 and IERC20 interfaces from openzeppelin.
        @inheritdoc ISaleStrategy
    */
    function execute(
        address _buyerAddr,
        IERC721 _nft,
        IMarketplace _mkp,
        uint256 _tokenId,
        uint256 _orderId
    ) external override returns (bool) {
        Order memory _order = _mkp.getOrder(_orderId);
        IERC20 _currencyAddr = _order.currency;

        require(
            _order.status == OrderStatus.Active,
            "Order state must be Active for selling"
        );
        require(
            _currencyAddr.allowance(_buyerAddr, msg.sender) >= _order.price,
            "Buyer have insufficient funds for this order price"
        );
        require(
            _currencyAddr.transferFrom(_buyerAddr, msg.sender, _order.price),
            "Transfer to Marketplace unsuccessful"
        );

        IERC721(_nft).safeTransferFrom(_order.provider, _buyerAddr, _tokenId);

        return true;
    }
}

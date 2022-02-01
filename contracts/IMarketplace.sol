// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {Order} from "./order/Order.sol";
import {ISaleStrategy} from "./asset/ISaleStrategy.sol";

interface IMarketplace {
    function addAcceptedCurrency(address _tokenERC20) external;

    function removeAcceptedCurrency(address _tokenERC20) external;

    function withdraw(address payable _to, uint256 amount) external;

    function assignRnsDomain(bytes32 _rnsDomainNode) external;

    function assignRnsNameGenerationStrategy(address _strategy) external;

    function approveAsset(address assetValidator, address token_) external;

    function rejectAsset(address assetValidator, address token_) external;

    function assignOrderIdGeneratorStrategy(address _strategy) external;

    function sellAsset(address token_) external returns (bool);

    function getOrder(uint256 _orderId) external returns (Order memory);

    function addSaleStrategy(ISaleStrategy _saleStrategy) external;

    function getSaleStrategyIndex() external returns (uint8);
}

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISaleStrategy} from "contracts/asset/ISaleStrategy.sol";

enum OrderStatus {
    Created,
    Active,
    Completed
}

struct Order {
    int256 orderId;
    OrderStatus status;
    ISaleStrategy strategy;
    int256 blockNumber;
    uint256 price;
    IERC20 currency;
    address provider;
}

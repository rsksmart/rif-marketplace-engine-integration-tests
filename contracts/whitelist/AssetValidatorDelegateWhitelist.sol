// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {MarketplaceConfiguration} from "../config/MarketplaceConfiguration.sol";
import {MarketplaceAccessControl, ASSET_VALIDATOR} from "../access/MarketplaceAccessControl.sol";

abstract contract AssetValidatorDelegateWhitelist is
    MarketplaceAccessControl,
    MarketplaceConfiguration
{
    mapping(address => mapping(address => bool))
        private _assetValidatorDelegateWhitelist;

    function addAssetValidatorDelegate(address _address)
        external
        requiresAssetValidation
        onlyRole(ASSET_VALIDATOR)
    {
        _assetValidatorDelegateWhitelist[msg.sender][_address] = true;
    }

    function removeAssetValidatorDelegate(address _address)
        external
        requiresAssetValidation
        onlyRole(ASSET_VALIDATOR)
    {
        _assetValidatorDelegateWhitelist[msg.sender][_address] = false;
    }

    function isAssetValidatorDelegate(address _address)
        external
        view
        returns (bool)
    {
        return _assetValidatorDelegateWhitelist[msg.sender][_address];
    }
}

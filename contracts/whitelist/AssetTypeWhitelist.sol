// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {MarketplaceConfiguration} from "../config/MarketplaceConfiguration.sol";
import {ASSET_MANAGER} from "../access/MarketplaceAccessControl.sol";

string constant ER_MSG_WL_NOT_REQUIRED = "Whitelist not required";
string constant ER_MSG_NOT_WL = "Asset type not allowed";

abstract contract AssetTypeWhitelist is MarketplaceConfiguration {
    mapping(address => bool) private _assetTypeWhitelist;

    function addAssetTypeToWhitelist(address _address)
        external
        onlyRole(ASSET_MANAGER)
    {
        require(_requireWhitelistedAssetType, ER_MSG_WL_NOT_REQUIRED);
        _assetTypeWhitelist[_address] = true;
    }

    function removeAssetTypeFromWhitelist(address _address)
        external
        onlyRole(ASSET_MANAGER)
    {
        require(_requireWhitelistedAssetType, ER_MSG_WL_NOT_REQUIRED);
        _assetTypeWhitelist[_address] = false;
    }

    function isAssetTypeWhitelisted(address _address)
        public
        view
        returns (bool)
    {
        return _assetTypeWhitelist[_address];
    }

    // FIXME: Checks that the token implements a whitelisted protocol
    modifier onlyWhitelistedAssetType(address _address) {
        require(_assetTypeWhitelist[_address], ER_MSG_NOT_WL);
        _;
    }
}

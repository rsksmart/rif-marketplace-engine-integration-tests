// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {IMarketplaceConfiguration} from "./IMarketplaceConfiguration.sol";
import {MarketplaceAccessControl, ADMINISTRATOR, ER_MSG_ROLE_NOT_REQUIRED} from "../access/MarketplaceAccessControl.sol";

/** 
    @author RIF Protocols Team @IOVLabs
    @title MarketplaceConfiguration

    @dev A partial contract for the main marketplace contract. Handles the initial configuratoin of marketplace, as well as subsequent changes to its settings.
*/
abstract contract MarketplaceConfiguration is
    MarketplaceAccessControl,
    IMarketplaceConfiguration
{
    bool internal _requireWhitelistedAssetType;
    bool internal _requireWhitelistedAssetProvider;
    bool internal _requireAssetValidation;
    bool internal _requireSaleStrategyPerAsset;
    bool internal _requireSameCurrencyPerAsset;
    bool internal _requireAssetSubdomain;
    bool internal _supportStakingAndSlashing;

    /**
      @dev constructor takes a set of `bool`s to initialise the marketplace.
      @param requireWhitelistedAssetType - if `true` only whitelisted asset types will be accepted.
      @param requireWhitelistedAssetProvider - if `true` only whitelisted asset providers will be able to list assets.
      @param requireAssetValidation - if `true` only validated asset will be able to be added. This will cause the asset to call it's validator(s) prior to listing.
      @param requireSaleStrategyPerAsset - if `true` each asset will have to specify it's own sale strategy (e.g. english auction, purchase, etc.).
      @param requireSameCurrencyPerAsset - if `true` all assets will accept only currencies defined by the owner of the contract, otherwise any currency may be used.
      @param requireAssetSubdomain - if `true` all assets will have an  RNS subdomain assiciated with it. If `false` no subdomain will be assiciated.
      @param supportStakingAndSlashing - allows staking and slashing for assets. If `true`, providers may required to stake funds prior to providing services/assets. If `false` staking and slashing will be disabled. 
    */
    constructor(
        bool requireWhitelistedAssetType,
        bool requireWhitelistedAssetProvider,
        bool requireAssetValidation,
        bool requireSaleStrategyPerAsset,
        bool requireSameCurrencyPerAsset,
        bool requireAssetSubdomain,
        bool supportStakingAndSlashing
    ) {
        _requireWhitelistedAssetType = requireWhitelistedAssetType;
        _requireWhitelistedAssetProvider = requireWhitelistedAssetProvider;
        _requireAssetValidation = requireAssetValidation;
        _requireSaleStrategyPerAsset = requireSaleStrategyPerAsset;
        _requireSameCurrencyPerAsset = requireSameCurrencyPerAsset;
        _requireAssetSubdomain = requireAssetSubdomain;
        _supportStakingAndSlashing = supportStakingAndSlashing;
    }

    modifier requiresAssetValidation() {
        require(_requireAssetValidation, ER_MSG_ROLE_NOT_REQUIRED);
        _;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function isWhitelistedAssetRequired()
        external
        view
        override
        returns (bool)
    {
        return _requireWhitelistedAssetType;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function isWhitelistedAssetProviderRequired()
        external
        view
        override
        returns (bool)
    {
        return _requireWhitelistedAssetProvider;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function isAssetValidationRequired() external view override returns (bool) {
        return _requireAssetValidation;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function isSaleStrategyPerAssetRequired()
        external
        view
        override
        returns (bool)
    {
        return _requireSaleStrategyPerAsset;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function isSameCurrencyPerAssetRequired()
        external
        view
        override
        returns (bool)
    {
        return _requireSameCurrencyPerAsset;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function isAssetSubdomainRequired() external view override returns (bool) {
        return _requireAssetSubdomain;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function isStakingAndSlashingSupported()
        external
        view
        override
        returns (bool)
    {
        return _supportStakingAndSlashing;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function setRequireWhitelistedAsset(bool _newValue)
        external
        override
        onlyRole(ADMINISTRATOR)
    {
        _requireWhitelistedAssetType = _newValue;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function setRequireWhitelistedAssetProvider(bool _newValue)
        external
        override
        onlyRole(ADMINISTRATOR)
    {
        _requireWhitelistedAssetProvider = _newValue;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function setRequireAssetValidation(bool _newValue)
        external
        override
        onlyRole(ADMINISTRATOR)
    {
        _requireAssetValidation = _newValue;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function setRequireSaleStrategyPerAsset(bool _newValue)
        external
        override
        onlyRole(ADMINISTRATOR)
    {
        _requireSaleStrategyPerAsset = _newValue;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function setRequireSameCurrencyPerAsset(bool _newValue)
        external
        override
        onlyRole(ADMINISTRATOR)
    {
        _requireSameCurrencyPerAsset = _newValue;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function setRequireAssetSubdomain(bool _newValue)
        external
        override
        onlyRole(ADMINISTRATOR)
    {
        _requireAssetSubdomain = _newValue;
    }

    /**
        @inheritdoc IMarketplaceConfiguration
    */
    function setSupportsStakingSlashing(bool _newValue)
        external
        override
        onlyRole(ADMINISTRATOR)
    {
        _supportStakingAndSlashing = _newValue;
    }
}

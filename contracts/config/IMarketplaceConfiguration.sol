// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

interface IMarketplaceConfiguration {
    /**
        @dev Returns `true` if asset type whitelisting is enabled 
    */
    function isWhitelistedAssetRequired() external view returns (bool);

    /**
        @dev sets a new value for requireWhitelistedAssetType
        Only executable by the contract owner. 
    */
    function setRequireWhitelistedAsset(bool _newValue) external;

    /**
        @dev Returns `true` if asset provider whitelisting is enabled 
    */
    function isWhitelistedAssetProviderRequired() external view returns (bool);

    /**
        @dev sets a new value for requireWhitelistedAssetProvider
        Only executable by the contract owner. 
    */
    function setRequireWhitelistedAssetProvider(bool _newValue) external;

    /**
        @dev Returns `true` if asset validation is enabled 
    */
    function isAssetValidationRequired() external view returns (bool);

    /**
        @dev sets a new value for requireAssetValidation
        Only executable by the contract owner. 
    */
    function setRequireAssetValidation(bool _newValue) external;

    /**
        @dev Returns `true` if per-asset sale strategy is enabled 
    */
    function isSaleStrategyPerAssetRequired() external view returns (bool);

    /**
        @dev sets a new value for requireSaleStrategyPerAsset
        Only executable by the contract owner. 
    */
    function setRequireSaleStrategyPerAsset(bool _newValue) external;

    /**
        @dev Returns `true` if all assets use the same set of whitelisted currencies 
    */
    function isSameCurrencyPerAssetRequired() external view returns (bool);

    /**
        @dev sets a new value for requireSameCurrencyPerAsset
        Only executable by the contract owner. 
    */
    function setRequireSameCurrencyPerAsset(bool _newValue) external;

    /**
        @dev Returns `true` if asset subdomain is enabled 
    */
    function isAssetSubdomainRequired() external view returns (bool);

    /**
        @dev sets a new value for requireAssetSubdomain
        Only executable by the contract owner. 
    */
    function setRequireAssetSubdomain(bool _newValue) external;

    /**
        @dev Returns `true` if staking and slashing is enabled 
    */
    function isStakingAndSlashingSupported() external view returns (bool);

    /**
        @dev sets a new value for supportStakingAndSlashing
        Only executable by the contract owner. 
    */
    function setSupportsStakingSlashing(bool _newValue) external;
}

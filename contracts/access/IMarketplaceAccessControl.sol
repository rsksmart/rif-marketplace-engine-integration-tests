// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

interface IMarketplaceAccessControl {
    /**
        @dev Returns `true` if address has been granted the OWNER role.
    */
    function isOwnerRole(address _ownerAddr) external view returns (bool);

    /**
        @dev Returns `true` if address has been granted the ADMINISTRATOR role 
    */
    function isAdministrator(address _adminAddr) external view returns (bool);

    /**
        @dev Grants address all MANAGER roles.
        Only executable by the owner.
    */
    function addAdministrator(address _adminAddr) external;

    /**
        @dev Revoikes address all MANAGER roles.
        Only executable by the owner.
    */
    function removeAdministrator(address _adminAddr) external;

    /**
        @dev Returns `true` if address has been granted the ASSET_MANAGER role 
    */
    function isAssetManager(address _assetManagerAddr)
        external
        view
        returns (bool);

    /**
        @dev Grants address the ASSET_MANAGER role.
    */
    function addAssetManager(address _assetManagerAddr) external;

    /**
        @dev Revokes address the ASSET_MANAGER role.
    */
    function removeAssetManager(address _assetManagerAddr) external;

    /**
        @dev Returns `true` if address has been granted the ASSET_VALIDATOR_MANAGER role 
    */
    function isAssetValidatorManager(address _assetManagerAddr)
        external
        view
        returns (bool);

    /**
        @dev Grants address the ASSET_VALIDATOR_MANAGER role.
    */
    function addAssetValidatorManager(address _assetValidatorManagerAddr)
        external;

    /**
        @dev Revokes address the ASSET_VALIDATOR_MANAGER role.
    */
    function removeAssetValidatorManager(address _assetValidatorAddr) external;

    /**
        @dev Returns `true` if address has been granted the ASSET_VALIDATOR role 
    */
    function isAssetValidator(address _assetValidatorAddr)
        external
        view
        returns (bool);

    /**
        @dev Grants address the ASSET_VALIDATOR role.
    */
    function addAssetValidator(address _assetValidatorManagerAddr) external;

    /**
        @dev Revokes address the ASSET_VALIDATOR role.
    */
    function removeAssetValidator(address _assetValidatorAddr) external;

    /**
        @dev Returns `true` if address has been granted the FINANCE role 
    */
    function isFinance(address _financeAddr) external view returns (bool);

    /**
        @dev Grants address the FINANCE role.
    */
    function addFinance(address _financeAddr) external;

    /**
        @dev Revokes address the FINANCE role.
    */
    function removeFinance(address _financeAddr) external;

    /**
        @dev Returns `true` if address has been granted the FINANCE_MANAGER role 
    */
    function isFinanceManager(address _financeManagerAddr)
        external
        view
        returns (bool);

    /**
        @dev Grants address the FINANCE_MANAGER role.
    */
    function addFinanceManager(address _financeManagerAddr) external;

    /**
        @dev Revokes address the FINANCE_MANAGER role.
    */
    function removeFinanceManager(address _financeManagerAddr) external;

    /**
        @dev Returns `true` if address has been granted the ASSET_PROVIDER_MANAGER role 
    */
    function isAssetProviderManager(address _assetProviderManagerAddr)
        external
        view
        returns (bool);

    /**
        @notice Grants address the ASSET_PROVIDER_MANAGER role.
    */
    function addAssetProviderManager(address _assetProviderManagerAddr)
        external;

    /**
        @dev Revokes address the ASSET_PROVIDER_MANAGER role.
    */
    function removeAssetProviderManager(address _assetProviderManagerAddr)
        external;

    /**
        @dev Returns `true` if address has been granted the ASSET_PROVIDER role 
    */
    function isAssetProvider(address _assetProviderAddr)
        external
        view
        returns (bool);

    /**
        @notice Grants address the ASSET_PROVIDER role.
    */
    function addAssetProvider(address _assetProviderAddr) external;

    /**
        @dev Revokes address the ASSET_PROVIDER role.
    */
    function removeAssetProvider(address _assetProviderAddr) external;
}

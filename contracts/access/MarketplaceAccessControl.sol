// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

import {IMarketplaceAccessControl} from "./IMarketplaceAccessControl.sol";

bytes32 constant OWNER = keccak256("OWNER");
bytes32 constant ADMINISTRATOR = keccak256("ADMINISTRATOR");
bytes32 constant ASSET_MANAGER = keccak256("ASSET_MANAGER");
bytes32 constant ASSET_VALIDATOR_MANAGER = keccak256("ASSET_VALIDATOR_MANAGER");
bytes32 constant ASSET_VALIDATOR = keccak256("ASSET_VALIDATOR");
bytes32 constant FINANCE_MANAGER = keccak256("FINANCE_MANAGER");
bytes32 constant FINANCE = keccak256("FINANCE");
bytes32 constant ASSET_PROVIDER_MANAGER = keccak256("ASSET_PROVIDER_MANAGER");
bytes32 constant ASSET_PROVIDER = keccak256("ASSET_PROVIDER");

string constant ER_MSG_ROLE_NOT_REQUIRED = "Role not required.";

/** 
    @author RIF Protocols Team @IOVLabs
    @title MarketplaceAccessControl

    @dev The main contract that that handles the role and their access within the marketplace.
    At the moment this contract is somewhat rigid.
    The hierarchy is achieved by cascade of permission, e.g. ADMINISTRATOR is also a member of ASSET_MANAGER.
    Also note that owener is also ADMINISTRATOR.
*/
abstract contract MarketplaceAccessControl is
    IMarketplaceAccessControl,
    AccessControl,
    Ownable
{
    /**
        @dev Sets OWNER the ADMINISTRATOR and OWNER roles' admin.
        Grants deployer address ALL MANAGER, ADMIN and OWNER roles.
        Sets ADMINISTRATOR the admin of all MANAGER roles.
        Sets each MANAGER role the admin of their respective functional roles.
    */
    constructor() {
        address _owner = msg.sender;
        // makes owner the role admin of admin roles
        _setRoleAdmin(OWNER, OWNER);
        _setRoleAdmin(ADMINISTRATOR, OWNER);

        // makes the owner the first admin for each MANAGER role
        _setupRole(OWNER, _owner);
        _setupRole(ADMINISTRATOR, _owner);
        _setupRole(ASSET_MANAGER, _owner);
        _setupRole(ASSET_VALIDATOR_MANAGER, _owner);
        _setupRole(FINANCE_MANAGER, _owner);
        _setupRole(ASSET_PROVIDER_MANAGER, _owner);

        // makes ADMINISTRATOR the admin role of MANAGERs
        _setRoleAdmin(ASSET_MANAGER, ADMINISTRATOR);
        _setRoleAdmin(ASSET_VALIDATOR_MANAGER, ADMINISTRATOR);
        _setRoleAdmin(FINANCE_MANAGER, ADMINISTRATOR);
        _setRoleAdmin(ASSET_PROVIDER_MANAGER, ADMINISTRATOR);

        // assigns individual MANAGERs to their respective areas
        _setRoleAdmin(ASSET_VALIDATOR, ASSET_VALIDATOR_MANAGER);
        _setRoleAdmin(FINANCE, FINANCE_MANAGER);
        _setRoleAdmin(ASSET_PROVIDER, ASSET_PROVIDER_MANAGER);
    }

    function transferOwnership(address newOwner) public override {
        super.transferOwnership(newOwner);
        // Grant roles to new owner top down
        grantRole(OWNER, newOwner);
        grantRole(ADMINISTRATOR, newOwner);
        grantRole(ASSET_MANAGER, newOwner);
        grantRole(ASSET_VALIDATOR_MANAGER, newOwner);
        grantRole(FINANCE_MANAGER, newOwner);
        grantRole(ASSET_PROVIDER_MANAGER, newOwner);

        // Revoke roles for the old owner bottom up
        address sender = msg.sender;
        revokeRole(ASSET_PROVIDER_MANAGER, sender);
        revokeRole(FINANCE_MANAGER, sender);
        revokeRole(ASSET_VALIDATOR_MANAGER, sender);
        revokeRole(ASSET_MANAGER, sender);
        revokeRole(ADMINISTRATOR, sender);
        revokeRole(OWNER, sender);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function isOwnerRole(address _ownerAddr)
        external
        view
        override
        returns (bool)
    {
        return hasRole(OWNER, _ownerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function isAdministrator(address _adminAddr)
        external
        view
        override
        returns (bool)
    {
        return hasRole(ADMINISTRATOR, _adminAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function addAdministrator(address _adminAddr) external override onlyOwner {
        grantRole(ADMINISTRATOR, _adminAddr);
        grantRole(ASSET_MANAGER, _adminAddr);
        grantRole(ASSET_VALIDATOR_MANAGER, _adminAddr);
        grantRole(FINANCE_MANAGER, _adminAddr);
        grantRole(ASSET_PROVIDER_MANAGER, _adminAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function removeAdministrator(address _adminAddr)
        external
        override
        onlyOwner
    {
        revokeRole(ADMINISTRATOR, _adminAddr);
        revokeRole(ASSET_MANAGER, _adminAddr);
        revokeRole(ASSET_VALIDATOR_MANAGER, _adminAddr);
        revokeRole(FINANCE_MANAGER, _adminAddr);
        revokeRole(ASSET_PROVIDER_MANAGER, _adminAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function isAssetManager(address _assetManagerAddr)
        external
        view
        override
        returns (bool)
    {
        return hasRole(ASSET_MANAGER, _assetManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function addAssetManager(address _assetManagerAddr) external override {
        grantRole(ASSET_MANAGER, _assetManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function removeAssetManager(address _assetManagerAddr) external override {
        revokeRole(ASSET_MANAGER, _assetManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function isAssetValidatorManager(address _assetManagerAddr)
        external
        view
        override
        returns (bool)
    {
        return hasRole(ASSET_VALIDATOR_MANAGER, _assetManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function addAssetValidatorManager(address _assetValidatorManagerAddr)
        external
        virtual
        override
    {
        grantRole(ASSET_VALIDATOR_MANAGER, _assetValidatorManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function removeAssetValidatorManager(address _assetValidatorManagerAddr)
        external
        override
    {
        revokeRole(ASSET_VALIDATOR_MANAGER, _assetValidatorManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function isAssetValidator(address _assetValidatorAddr)
        external
        view
        override
        returns (bool)
    {
        return hasRole(ASSET_VALIDATOR, _assetValidatorAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function addAssetValidator(address _assetValidatorAddr)
        external
        virtual
        override
    {
        grantRole(ASSET_VALIDATOR, _assetValidatorAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function removeAssetValidator(address _assetValidatorAddr)
        external
        override
    {
        revokeRole(ASSET_VALIDATOR, _assetValidatorAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function isFinance(address _financeAddr)
        external
        view
        override
        returns (bool)
    {
        return hasRole(FINANCE, _financeAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function addFinance(address _financeAddr) external override {
        grantRole(FINANCE, _financeAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function removeFinance(address _financeAddr) external override {
        revokeRole(FINANCE, _financeAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function isFinanceManager(address _financeManagerAddr)
        external
        view
        override
        returns (bool)
    {
        return hasRole(FINANCE_MANAGER, _financeManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function addFinanceManager(address _financeManagerAddr) external override {
        grantRole(FINANCE_MANAGER, _financeManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function removeFinanceManager(address _financeManagerAddr)
        external
        override
    {
        revokeRole(FINANCE_MANAGER, _financeManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function isAssetProviderManager(address _assetProviderManagerAddr)
        external
        view
        override
        returns (bool)
    {
        return hasRole(ASSET_PROVIDER_MANAGER, _assetProviderManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function addAssetProviderManager(address _assetProviderManagerAddr)
        external
        virtual
        override;

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function removeAssetProviderManager(address _assetProviderManagerAddr)
        external
        override
    {
        revokeRole(ASSET_PROVIDER_MANAGER, _assetProviderManagerAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function isAssetProvider(address _assetProviderAddr)
        external
        view
        override
        returns (bool)
    {
        return hasRole(ASSET_PROVIDER, _assetProviderAddr);
    }

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function addAssetProvider(address _assetProviderAddr)
        external
        virtual
        override;

    /**
        @inheritdoc IMarketplaceAccessControl
    */
    function removeAssetProvider(address _assetProviderAddr) external override {
        revokeRole(ASSET_PROVIDER, _assetProviderAddr);
    }
}

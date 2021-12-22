// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IRNS} from "./rns/IRNSSuite.sol";
import {MarketplaceAccessControl, ASSET_PROVIDER, ASSET_PROVIDER_MANAGER, FINANCE_MANAGER, ASSET_VALIDATOR, ASSET_VALIDATOR_MANAGER, ER_MSG_ROLE_NOT_REQUIRED} from "./access/MarketplaceAccessControl.sol";
import {MarketplaceConfiguration} from "./config/MarketplaceConfiguration.sol";
import {AssetManagement} from "./asset/AssetManagement.sol";
import {AssetState} from "./asset/Asset.sol";
import {IMarketplace} from "./IMarketplace.sol";
import {AssetTypeWhitelist} from "./whitelist/AssetTypeWhitelist.sol";
import {AssetValidatorDelegateWhitelist} from "./whitelist/AssetValidatorDelegateWhitelist.sol";
import {RNSNameGenerationStrategy} from "./rns/RNSNameGenerationStrategy.sol";
import {Order} from "./order/Order.sol";

/**
    @author RIF Protocols Team @IOVLabs
    @title MarketplaceAcceptedCurrency

    @dev Structure that defines a currency
*/
struct MarketplaceAcceptedCurrency {
    string name;
    string symbol;
    uint8 decimals;
}

/**
    @author RIF Protocols Team @IOVLabs
    @title Marketplace

    @dev Customisable marketplace contract. Provides the ability to buy and sell assets/services via custom exchange methods (sale, auction, etc).
    extended by MarketplaceConfiguration to provide configuration
    and by MarketplaceAccessControl to provide system roles and hierarchy
*/
contract Marketplace is
    IMarketplace,
    MarketplaceAccessControl,
    MarketplaceConfiguration,
    AssetValidatorDelegateWhitelist,
    AssetTypeWhitelist,
    AssetManagement
{
    IRNS private _rns;
    bytes32 public rnsDomain;
    RNSNameGenerationStrategy private _rnsNameGenerationStrategy;

    /**
     *  @dev Stores the currencies accepted by the marketplace (ERC20 tokens)
     */
    mapping(address => MarketplaceAcceptedCurrency) private _acceptedCurrencies;

    /**
     *  @dev Stores the currencies accepted by the marketplace (ERC20 tokens)
     */
    mapping(uint256 => Order) private _orders;

    constructor(
        bool _requireWhitelistedAssetType,
        bool _requireWhitelistedAssetProvider,
        bool _requireAssetValidation,
        bool _requireSaleStrategyPerAsset,
        bool _requireSameCurrencyPerAsset,
        bool _requireAssetSubdomain,
        bool _supportStakingAndSlashing
    )
        MarketplaceConfiguration(
            _requireWhitelistedAssetType,
            _requireWhitelistedAssetProvider,
            _requireAssetValidation,
            _requireSaleStrategyPerAsset,
            _requireSameCurrencyPerAsset,
            _requireAssetSubdomain,
            _supportStakingAndSlashing
        )
    {}

    /***************
        RNS 
    ****************/
    /**
        @notice Returns the address of RNS contract associated with this marketplace
        @return IRNS - RNS contract address
    */
    function rns() public view returns (IRNS) {
        return _rns;
    }

    /**
        @notice Sets the RNS contract address
        @dev Only available to OWNER
        @param rns_ - RNS contract address
    */
    function setRNSRegistry(IRNS rns_) external onlyOwner {
        _rns = rns_;
    }

    /**
        @notice Stores RNS domain node after validation of its ownership
        @dev calls third-party contract assigned by OWNER of this Marketplace
        @dev Only callable by OWNER
        @param rnsDomainNode - bytes32 representation of an RNS domain name
    */
    function assignRnsDomain(bytes32 rnsDomainNode)
        external
        override
        onlyOwner
    {
        require(_rns.owner(rnsDomainNode) == msg.sender, "Not domain owner");
        rnsDomain = rnsDomainNode;
    }

    /**
        @notice Creates a subdomain on this Marketplace's RNS domain
        @dev Only callable by OWNER
        @param label - bytes32 representation of an RNS domain name to be assigned as subdomain
    */
    function createSubdomain(bytes32 label) public onlyOwner {
        _rns.setSubnodeOwner(rnsDomain, label, address(this));
    }

    /**
        @notice Returns the assigned RNS subdomain name generation strategy
        @return the strategy contract address
    */
    function getRnsNameGenerationStrategy()
        public
        view
        returns (RNSNameGenerationStrategy)
    {
        return _rnsNameGenerationStrategy;
    }

    /**
        @notice Sets a RNS subdomain name generation strategy contract address to use to automatically generate subdomain names for assets
        @param _strategy - the strategy contract address
    */
    function assignRnsNameGenerationStrategy(address _strategy)
        external
        override
    {
        _rnsNameGenerationStrategy = RNSNameGenerationStrategy(_strategy);
    }

    /***************
        Currency 
    ****************/

    /**
        @notice Shows whether or not a given erc20 token is an accepted currency
        @param _tokenERC20 - the address of an ERC20 token 
    */
    function isAcceptedCurrency(address _tokenERC20)
        public
        view
        returns (bool)
    {
        return _acceptedCurrencies[_tokenERC20].decimals != 0;
    }

    /**
        @dev Adds an accepted currency into the marketplace
        @param _tokenERC20 - the address of an ERC20 token 
     */
    function addAcceptedCurrency(address _tokenERC20)
        external
        override
        onlyRole(FINANCE_MANAGER)
    {
        string memory name = ERC20(_tokenERC20).name();
        string memory symbol = ERC20(_tokenERC20).symbol();
        uint8 decimals = ERC20(_tokenERC20).decimals();

        require(decimals > 0, "Not a valid ERC20 contract");

        _acceptedCurrencies[_tokenERC20] = MarketplaceAcceptedCurrency(
            name,
            symbol,
            decimals
        );
    }

    /**
        @dev Removes an accepted currency from the marketplace
        @param _tokenERC20 - the address of an ERC20 token 
     */
    function removeAcceptedCurrency(address _tokenERC20)
        external
        override
        onlyRole(FINANCE_MANAGER)
    {
        delete _acceptedCurrencies[_tokenERC20];
    }

    function withdraw(address _to, int256 amount) external override {
        // TODO: add logic
    }

    /***************
        Asset 
    ****************/

    /**
     * @dev Approve an asset with validator role.
     */
    function _approveTokenAsValidator(address token_) private {
        _evaluateToken(token_, msg.sender, true);
    }

    /**
     * @dev Approve an asset with delegate permission.
     */
    function _approveTokenAsDelegate(address token_, address validator_)
        private
    {
        _evaluateToken(token_, validator_, true);
    }

    /**
        @notice Approve an asset for registration.
        @dev if approving as delegate use the address of the validator on behalf of whom the task is performed.
        @dev if approving as validator, use your own address.
        @param assetValidator - account address of the validator on whose behalf the asset is being approved
        @param token_ - the asset's token address 
     */
    function approveAsset(address assetValidator, address token_)
        external
        override
        requiresAssetValidation
        onlyRole(ASSET_VALIDATOR)
        tokenInState(token_, AssetState.PendingValidation)
    {
        if (assetValidator == msg.sender) {
            _approveTokenAsValidator(token_);
            return;
        }
        _approveTokenAsDelegate(token_, assetValidator);
    }

    /**
     * @dev Reject an asset with validator role.
     */
    function _rejectTokenAsValidator(address token_) private {
        _evaluateToken(token_, msg.sender, false);
    }

    /**
     * @dev Reject an asset with delegate permission.
     */
    function _rejectTokenAsDelegate(address token_, address validator_)
        private
    {
        _evaluateToken(token_, validator_, false);
    }

    /**
        @dev Reject an asset for registration.
        @dev if rejecting as delegate use the address of the validator on behalf of whom the task is performed.
        @dev if rejecting as validator, use your own address.
        @param assetValidator - account address of the validator on whose behalf the asset is being rejected
        @param token_ - the asset's token address
     */
    function rejectAsset(address assetValidator, address token_)
        external
        override
        requiresAssetValidation
        onlyRole(ASSET_VALIDATOR)
        tokenInState(token_, AssetState.PendingValidation)
    {
        if (assetValidator == msg.sender) {
            _rejectTokenAsValidator(token_);
            return;
        }
        _rejectTokenAsDelegate(token_, assetValidator);
    }

    /**
        @notice transitions an Asset to `AssetRegistered` state if it is in the `ReadyToRegister` state
        @dev if validation is not required this step 
        @param token_ address of the _token
        @inheritdoc AssetManagement
     */
    function registerAsset(address token_)
        external
        override
        tokenInState(token_, AssetState.ReadyToRegister)
    {
        if (_requireAssetSubdomain) {
            // create subdomain for asset
            bytes32 label = _rnsNameGenerationStrategy.generate(token_);
            createSubdomain(label);
            _setSubdomain(token_, label);
        }

        _transitionAsset(token_, AssetState.AssetRegistered);
    }

    function sellAsset(address token_) external override returns (bool) {
        // TODO: add logic
    }

    /**
        @dev Grants address the ASSET_VALIDATOR_MANAGER role if `requireAssetValidation` is `true`.
    */
    function addAssetValidatorManager(address _assetValidatorManagerAddr)
        external
        override
        requiresAssetValidation
    {
        grantRole(ASSET_VALIDATOR_MANAGER, _assetValidatorManagerAddr);
    }

    /**
        @dev Grants address the ASSET_VALIDATOR role if `requireAssetValidation` is `true`
    */
    function addAssetValidator(address _assetValidatorAddr)
        external
        override
        requiresAssetValidation
    {
        grantRole(ASSET_VALIDATOR, _assetValidatorAddr);
    }

    /**
        @dev Grants address the ASSET_PROVIDER_MANAGER role if `_requireWhitelistedAssetProvider` is `true`
        @inheritdoc MarketplaceAccessControl
    */
    function addAssetProviderManager(address _assetProviderManagerAddr)
        external
        override
    {
        require(_requireWhitelistedAssetProvider, ER_MSG_ROLE_NOT_REQUIRED);

        grantRole(ASSET_PROVIDER_MANAGER, _assetProviderManagerAddr);
    }

    /**
        @dev Grants address the ASSET_PROVIDER role if `_requireWhitelistedAssetProvider` is `true`
        @inheritdoc MarketplaceAccessControl
    */
    function addAssetProvider(address _assetProviderAddr) external override {
        require(_requireWhitelistedAssetProvider, ER_MSG_ROLE_NOT_REQUIRED);

        grantRole(ASSET_PROVIDER, _assetProviderAddr);
    }

    /***************
        Order 
    ****************/
    function assignOrderIdGeneratorStrategy(address _strategy)
        external
        override
    {
        // TODO: add logic
    }

    function getOrder(uint256 _orderId)
        public
        view
        override
        returns (Order memory)
    {
        return _orders[_orderId];
    }
}

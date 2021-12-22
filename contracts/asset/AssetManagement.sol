// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

import {MarketplaceConfiguration} from "../config/MarketplaceConfiguration.sol";
import {ASSET_PROVIDER} from "../access/MarketplaceAccessControl.sol";
import {AssetTypeWhitelist} from "../whitelist/AssetTypeWhitelist.sol";
import {Asset, AssetState, AssetValidationRecord} from "./Asset.sol";

/**
    @author RIF Protocols Team @IOVLabs
    @title AssetManagement

    @dev Partial marketplace contract, defining asset state transitions
 */
abstract contract AssetManagement is
    MarketplaceConfiguration,
    AssetTypeWhitelist
{
    mapping(address => Asset) internal _tokenToAsset;

    modifier tokenInState(address token_, AssetState state_) {
        require(
            _tokenToAsset[token_].state == state_,
            "Incorrect state transition"
        );
        _;
    }

    /**
        @notice Retreives Asset information of a token
        @param token_ address of the token
        @return Asset - which would be an array of:
        @custom:zero validatorHistory - [{ address validator, address deletage, bool approved }]
        @custom:one state - InitialState = 0 | PendingValidation | ReadyToRegister | AssetInvalidated | AssetRegistered
        @custom:two subdomain - bytes32;
    */
    function getAsset(address token_) external view returns (Asset memory) {
        return _tokenToAsset[token_];
    }

    /**
        @dev Assigns a subdomain to an Asset
        @param token_ address of the _token
        @param subdomain_ hashed name of the subdomain
    */
    function _setSubdomain(address token_, bytes32 subdomain_) internal {
        _tokenToAsset[token_].subdomain = subdomain_;
    }

    /**
        @notice Transisions an Asset to a different state
        @dev Transisions an Asset to a different state. The state property of the Asset that the token points to will change according to the state parameter
        @param token_ address of the _token
        @param state_ InitialState = 0 | PendingValidation | ReadyToRegister | AssetInvalidated | AssetRegistered
    */
    function _transitionAsset(address token_, AssetState state_) internal {
        _tokenToAsset[token_].state = state_;
    }

    /**
        @dev Makes use of the error messaging of the AssetTypeWhitelist
        @param token_ address of the _token
        @return true
        @custom:throws accordng to AssetTypeWhitelist.onlyWhitelistedAssetType
    */
    function _checkAssetWL(address token_)
        internal
        view
        onlyWhitelistedAssetType(token_)
        returns (bool)
    {
        return true;
    }

    /**
        @dev Makes use of the error messaging of the AccessControl
        @return true
        @custom:throws accordng to AccessControl.onlyRole
    */
    function _checkAssetProviderWL()
        internal
        view
        onlyRole(ASSET_PROVIDER)
        returns (bool)
    {
        return true;
    }

    /**
        @notice transitions an Asset to `AssetRegistered` state if it is in the `ReadyToRegister` state
        @dev virtual method to be implemented in the concrete contract for it requires access to RNS definitions
        @param token_ address of the _token
     */
    function registerAsset(address token_) external virtual;

    /**
        @notice Makes necessary checks and transitions to either AssetRegistered or PendingValidation state (if asset validation is required).
        @dev first it transitions to ReadyToRegister (if no validation is required or it has been approved), before the next state transition to AssetRegistered
        @param token_ address of the _token
        @custom:throws "Asset type not allowed" if asset whitelisting is required and not satisfied
        @custom:throws "Provider not whitelisted" if such whitelisting is required and not satisfied
    */
    function requestAssetRegistration(address token_)
        external
        tokenInState(token_, AssetState.InitialState)
    {
        if (_requireWhitelistedAssetType) {
            _checkAssetWL(token_);
        }
        if (_requireWhitelistedAssetProvider) {
            _checkAssetProviderWL();
        }

        if (_requireAssetValidation) {
            _transitionAsset(token_, AssetState.PendingValidation);
            return ();
        }

        _transitionAsset(token_, AssetState.ReadyToRegister);
        this.registerAsset(token_);
    }

    function _evaluateToken(
        address token_,
        address validator_,
        bool approve_
    ) internal {
        _transitionAsset(
            token_,
            approve_ ? AssetState.ReadyToRegister : AssetState.AssetInvalidated
        );

        AssetValidationRecord memory validationRecord = AssetValidationRecord(
            msg.sender,
            validator_,
            approve_
        );

        _tokenToAsset[token_].validatorHistory.push(validationRecord);
    }
}

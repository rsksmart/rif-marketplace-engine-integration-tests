// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.4;

struct AssetValidationRecord {
    address validator;
    address deletage;
    bool approved;
}

enum AssetState {
    InitialState,
    PendingValidation,
    ReadyToRegister,
    AssetInvalidated,
    AssetRegistered
}

struct Asset {
    AssetValidationRecord[] validatorHistory;
    AssetState state;
    bytes32 subdomain;
}

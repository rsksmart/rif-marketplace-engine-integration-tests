import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

// TODO: fix absolute imports in the engine repo for reusing these functions
export const defaultMarketplaceOptions = {
  requireWhitelistedAsset: false,
  requireWhitelistedAssetProvider: false,
  requireAssetValidation: false,
  requireSaleStrategyPerAsset: false,
  requireSameCurrencyPerAsset: false,
  requireAssetSubdomain: false,
  supportStakingAndSlashing: false,
};

export type MarketplaceOptions = typeof defaultMarketplaceOptions;

export type ContractDeployed<C extends Contract> = {
  contract: C;
  signers: SignerWithAddress[];
  contractFactory: Factory<C>;
};

export interface Factory<C extends Contract> extends ContractFactory {
  deploy: (...args: Array<unknown>) => Promise<C>;
}

export const deployContract = async <C extends Contract, A>(
  contractName: string,
  constructorArgs: A,
  factory?: Factory<C>
): Promise<ContractDeployed<C>> => {
  const options = Object.values(constructorArgs);
  const contractFactory =
    factory ?? ((await ethers.getContractFactory(contractName)) as Factory<C>);

  const contract = await contractFactory.deploy(...options);
  const signers = await ethers.getSigners();
  const [owner] = signers;

  console.log(
    `Owner ${owner.address} deployed Marketplace to address: ${
      contract.address
    }, with config: \n 
          ${JSON.stringify(constructorArgs, null, 2)}`
  );

  return {
    contract,
    signers,
    contractFactory,
  };
};

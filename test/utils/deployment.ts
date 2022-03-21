import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { Contract, ContractFactory } from 'ethers';
import { Marketplace } from 'rif-marketplace-engine/typechain-types';

export interface Factory<C extends Contract> extends ContractFactory {
  deploy: (...args: Array<unknown>) => Promise<C>;
}

export const deployContract = async <C extends Contract, A>(
  contractName: string,
  constructorArgs: A,
  factory?: Factory<C>
): Promise<{
  contract: C;
  signers: SignerWithAddress[];
  contractFactory: Factory<C>;
}> => {
  const options = Object.values(constructorArgs);
  const contractFactory =
    factory || ((await ethers.getContractFactory(contractName)) as Factory<C>);

  const contract = await contractFactory.deploy(...options);

  return {
    contract: (await contract.deployed()) as C,
    signers: await ethers.getSigners(),
    contractFactory,
  };
};

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

export const deployMarketplace = <MT extends Marketplace>(
  marketplaceOptions: MarketplaceOptions = defaultMarketplaceOptions,
  factory?: Factory<MT>
) =>
  deployContract<MT, MarketplaceOptions>(
    'Marketplace',
    marketplaceOptions,
    factory
  );

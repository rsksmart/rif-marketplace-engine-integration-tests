import { expect } from 'chai';
import {
  ConfigAttribute,
  createMarketplaceConfiguration,
  createMarketplaceContract,
  MARKETPLACE_CONFIG_GETTERS,
} from 'rif-marketplace-engine-sdk';
import { ethers } from 'hardhat';
import { RSK_NODE } from '../../env';
import { Provider } from '@ethersproject/providers';
import { Marketplace } from 'rif-marketplace-engine/typechain';
import {
  defaultMarketplaceOptions,
  deployMarketplace,
  MarketplaceOptions,
} from '../utils/deployment';
import { Signer } from 'ethers';

export type MarketplaceSetUp = {
  deployer: Signer;
  otherSigners: Signer[];
  provider: Provider;
  marketplace: Marketplace;
  marketplaceAddress: string;
};

export const prepareMarkerplace = async (
  marketplaceOptions: MarketplaceOptions = defaultMarketplaceOptions
): Promise<MarketplaceSetUp> => {
  const provider: Provider = new ethers.providers.StaticJsonRpcProvider(
    RSK_NODE
  );
  const [deployer, ...otherSigners] = await ethers.getSigners();
  const { contract: marketplace } = await deployMarketplace(marketplaceOptions);
  const marketplaceAddress = marketplace.address;

  return {
    deployer,
    otherSigners,
    provider,
    marketplace,
    marketplaceAddress,
  };
};

export const assertMarketplaceConfiguration = async (
  marketplaceOptions: MarketplaceOptions = defaultMarketplaceOptions
) => {
  let deployer: Signer;
  let marketplaceAddress: string;

  const marketplaceArgs: MarketplaceOptions = {
    ...defaultMarketplaceOptions,
    ...marketplaceOptions,
  };

  before(async () => {
    ({ deployer, marketplaceAddress } = await prepareMarkerplace(
      marketplaceArgs
    ));
  });

  const marketplaceAttributes = Object.keys(
    MARKETPLACE_CONFIG_GETTERS
  ) as ConfigAttribute[];
  const marketplaceAttributeValues = Object.values(marketplaceArgs);

  marketplaceAttributes.map((attribute: ConfigAttribute, i: number) => {
    const marketplaceAttributeValue = marketplaceAttributeValues[i];

    it(`should return ${marketplaceAttributeValue} when "${attribute}" attribute is ${
      marketplaceAttributeValue ? 'enabled' : 'disabled'
    }`, async () => {
      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );

      const config = createMarketplaceConfiguration(marketplaceInstance);
      await expect(config.get(attribute)).to.eventually.be.equal(
        marketplaceAttributeValue
      );
    });
  });
};

import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  createMarketplaceConfiguration,
  createMarketplaceContract,
} from 'rif-marketplace-engine-sdk';
import { Contract, ContractTransaction, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { Marketplace } from 'rif-marketplace-engine/typechain';
import {
  assertMarketplaceConfiguration,
  getMarketplaceConfiguration,
  prepareMarkerplace,
} from './configuration.utils';

export type MarketplaceSetUp = {
  deployer: Signer;
  otherSigners: Signer[];
  provider: Provider;
  marketplace: Marketplace;
  marketplaceAddress: string;
};

chai.use(chaiAsPromised);

describe('Marketplace Configuration', () => {
  it('should create a marketplace contract instance', async () => {
    const { deployer, marketplaceAddress } = await prepareMarkerplace();

    const marketplaceInstance = createMarketplaceContract(
      marketplaceAddress,
      deployer
    );
    expect(marketplaceInstance).instanceOf(Contract);
  });

  describe('Default configuration', () => {
    // Tests that marketplace has the right configuration at deployment
    assertMarketplaceConfiguration();
  });

  describe('All attributes enabled', () => {
    // Tests that marketplace has the right configuration when setting all attributtes
    assertMarketplaceConfiguration({
      requireWhitelistedAsset: true,
      requireWhitelistedAssetProvider: true,
      requireAssetValidation: true,
      requireSaleStrategyPerAsset: true,
      requireSameCurrencyPerAsset: true,
      requireAssetSubdomain: true,
      supportStakingAndSlashing: true,
    });
  });

  describe('Getting & setting marketplace configurations', () => {
    describe('Getter', () => {
      // Tests that marketplace has the right configuration at deployment
      getMarketplaceConfiguration();
    });

    describe('Setter', () => {
      let deployer: Signer;
      let marketplaceAddress: string;
      let marketplaceInstance: Marketplace;

      beforeEach(async () => {
        ({ deployer, marketplaceAddress } = await prepareMarkerplace());

        marketplaceInstance = createMarketplaceContract(
          marketplaceAddress,
          deployer
        );
      });
      // Tests that marketplace has the right configuration at deployment
      it('should return true when "whitelistedAsset" attribute is set enabled', async () => {
        const marketplaceConfig =
          createMarketplaceConfiguration(marketplaceInstance);
        const tx = (await marketplaceConfig.set(
          'whitelistedAsset',
          true
        )) as ContractTransaction;
        await tx.wait();
        await expect(marketplaceConfig.get('whitelistedAsset')).to.eventually.be
          .true;
      });

      it('should return true when "whitelistedAssetProvider" attribute is set enabled', async () => {
        const marketplaceConfig =
          createMarketplaceConfiguration(marketplaceInstance);
        const tx = (await marketplaceConfig.set(
          'whitelistedAssetProvider',
          true
        )) as ContractTransaction;
        await tx.wait();
        await expect(marketplaceConfig.get('whitelistedAssetProvider')).to
          .eventually.be.true;
      });

      it('should return true when "assetValidation" attribute is set enabled', async () => {
        const marketplaceConfig =
          createMarketplaceConfiguration(marketplaceInstance);
        const tx = (await marketplaceConfig.set(
          'assetValidation',
          true
        )) as ContractTransaction;
        await tx.wait();
        await expect(marketplaceConfig.get('assetValidation')).to.eventually.be
          .true;
      });

      it('should return true when "saleStrategyPerAsset" attribute is set enabled', async () => {
        const marketplaceConfig =
          createMarketplaceConfiguration(marketplaceInstance);
        const tx = (await marketplaceConfig.set(
          'saleStrategyPerAsset',
          true
        )) as ContractTransaction;
        await tx.wait();
        await expect(marketplaceConfig.get('saleStrategyPerAsset')).to
          .eventually.be.true;
      });

      it('should return true when "sameCurrencyPerAsset" attribute is set enabled', async () => {
        const marketplaceConfig =
          createMarketplaceConfiguration(marketplaceInstance);
        const tx = (await marketplaceConfig.set(
          'sameCurrencyPerAsset',
          true
        )) as ContractTransaction;
        await tx.wait();
        await expect(marketplaceConfig.get('sameCurrencyPerAsset')).to
          .eventually.be.true;
      });

      it('should return true when "assetSubdomain" attribute is set enabled', async () => {
        const marketplaceConfig =
          createMarketplaceConfiguration(marketplaceInstance);
        const tx = (await marketplaceConfig.set(
          'assetSubdomain',
          true
        )) as ContractTransaction;
        await tx.wait();
        await expect(marketplaceConfig.get('assetSubdomain')).to.eventually.be
          .true;
      });

      it('should return true when "stakingAndSlashing" attribute is set enabled', async () => {
        const marketplaceConfig =
          createMarketplaceConfiguration(marketplaceInstance);
        const tx = (await marketplaceConfig.set(
          'stakingAndSlashing',
          true
        )) as ContractTransaction;
        await tx.wait();
        await expect(marketplaceConfig.get('stakingAndSlashing')).to.eventually
          .be.true;
      });
    });
  });
});

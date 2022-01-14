import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { createMarketplaceContract } from 'rif-marketplace-engine-sdk';
import { Contract } from 'ethers';
import {
  assertMarketplaceConfiguration,
  prepareMarkerplace,
} from '~/utils/marketpladeConfiguration';

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
    /**
     * Test that marketplace has the right configuration at deployment
     */
    assertMarketplaceConfiguration();
  });

  describe('All attributes enabled', () => {
    /**
     * Test that marketplace has the right configuration at deployment
     */
    assertMarketplaceConfiguration({ 
      requireWhitelistedAsset: true,
      requireWhitelistedAssetProvider: true,
      requireAssetValidation: true,
      requireSaleStrategyPerAsset: true,
      requireSameCurrencyPerAsset: true,
      requireAssetSubdomain: true,
      supportStakingAndSlashing: true
    });
  });
});

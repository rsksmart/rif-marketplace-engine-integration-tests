import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  createMarketplaceConfiguration,
  createMarketplaceContract,
} from 'rif-marketplace-engine-sdk';
// FIXME: point to the correct json file
import { ethers } from 'ethers';
import deployedMarketPlaceData from '../build/contracts/Marketplace.json';

chai.use(chaiAsPromised);
const providerUrl = 'http://127.0.0.1:4444';

describe('Marketplace Engine Integration Tests', async () => {
  it('should create a marketplace contract instance', async () => {
    const marketplace = createMarketplaceContract(
      deployedMarketPlaceData.networks[33].address,
      new ethers.providers.StaticJsonRpcProvider(providerUrl)
    );
    expect(marketplace).not.to.be.undefined;
  });

  describe('Marketplace config attributes', async () => {
    it('should get true for marketplace configuration for "whitelistedAsset"', async () => {
      const marketplace = createMarketplaceContract(
        deployedMarketPlaceData.networks[33].address,
        new ethers.providers.StaticJsonRpcProvider(providerUrl)
      );
      const config = createMarketplaceConfiguration(marketplace);
      await expect(config.get('whitelistedAsset')).to.eventually.be.true;
    });

    it('should get true for marketplace configuration for "whitelistedAssetProvider"', async () => {
      const marketplace = createMarketplaceContract(
        deployedMarketPlaceData.networks[33].address,
        new ethers.providers.StaticJsonRpcProvider(providerUrl)
      );
      const config = createMarketplaceConfiguration(marketplace);
      await expect(config.get('whitelistedAssetProvider')).to.eventually.be
        .true;
    });

    it('should get true for marketplace configuration for "assetValidation"', async () => {
      const marketplace = createMarketplaceContract(
        deployedMarketPlaceData.networks[33].address,
        new ethers.providers.StaticJsonRpcProvider(providerUrl)
      );
      const config = createMarketplaceConfiguration(marketplace);
      await expect(config.get('assetValidation')).to.eventually.be.true;
    });

    it('should get true for marketplace configuration for "saleStrategyPerAsset"', async () => {
      const marketplace = createMarketplaceContract(
        deployedMarketPlaceData.networks[33].address,
        new ethers.providers.StaticJsonRpcProvider(providerUrl)
      );
      const config = createMarketplaceConfiguration(marketplace);
      await expect(config.get('saleStrategyPerAsset')).to.eventually.be.true;
    });

    it('should get true for marketplace configuration for "sameCurrencyPerAsset"', async () => {
      const marketplace = createMarketplaceContract(
        deployedMarketPlaceData.networks[33].address,
        new ethers.providers.StaticJsonRpcProvider(providerUrl)
      );
      const config = createMarketplaceConfiguration(marketplace);
      await expect(config.get('sameCurrencyPerAsset')).to.eventually.be.true;
    });

    it('should get true for marketplace configuration for "assetSubdomain"', async () => {
      const marketplace = createMarketplaceContract(
        deployedMarketPlaceData.networks[33].address,
        new ethers.providers.StaticJsonRpcProvider(providerUrl)
      );
      const config = createMarketplaceConfiguration(marketplace);
      await expect(config.get('assetSubdomain')).to.eventually.be.true;
    });

    it('should get true for marketplace configuration for "stakingAndSlashing"', async () => {
      const marketplace = createMarketplaceContract(
        deployedMarketPlaceData.networks[33].address,
        new ethers.providers.StaticJsonRpcProvider(providerUrl)
      );
      const config = createMarketplaceConfiguration(marketplace);
      await expect(config.get('stakingAndSlashing')).to.eventually.be.true;
    });
  });
});

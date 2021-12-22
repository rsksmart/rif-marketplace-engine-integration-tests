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

describe('MarketPlace Engine Integration Tests', async () => {
  it('should create a  marketplace contract instance', async () => {
    // Unit under test
    const marketplace = createMarketplaceContract(
      deployedMarketPlaceData.networks[33].address,
      new ethers.providers.StaticJsonRpcProvider(providerUrl)
    );
    expect(marketplace).not.to.be.undefined;
    // Verify results
  });

  it('should get the marketplace configuration for "assetValidation"', async () => {
    // Unit under test
    const marketplace = createMarketplaceContract(
      deployedMarketPlaceData.networks[33].address,
      new ethers.providers.StaticJsonRpcProvider(providerUrl)
    );

    const config = createMarketplaceConfiguration(marketplace);
    await expect(config.get('assetValidation')).to.eventually.be.rejected;
    // Verify results
  });
});

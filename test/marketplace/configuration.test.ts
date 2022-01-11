import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  createMarketplaceConfiguration,
  createMarketplaceContract,
} from 'rif-marketplace-engine-sdk';
import { Wallet, ethers, Contract } from 'ethers';
import { PRIV_KEY_1, RSK_NODE } from '../env';
import { Provider } from '@ethersproject/providers';
import { Marketplace } from 'rif-marketplace-engine/typechain';
import {
  defaultMarketplaceOptions,
  deployMarketplace,
} from '../utils/deployment';

chai.use(chaiAsPromised);

describe('Marketplace Configuration', () => {
  // let owner: SignerWithAddress;
  let wallet: Wallet;
  let provider: Provider;
  let marketplace: Marketplace;
  let marketplaceAddress: string;

  beforeEach(async () => {
    // [owner] = await ethers.getSigners();
    provider = new ethers.providers.JsonRpcProvider(RSK_NODE);
    wallet = new Wallet(PRIV_KEY_1, provider);

    // example marketplace deployment
    ({ contract: marketplace } = await deployMarketplace(
      defaultMarketplaceOptions // here you'd overwrite marketplace options
    ));
    marketplaceAddress = marketplace.address;
  });

  it('should create a marketplace contract instance', async () => {
    const marketplaceInstance = createMarketplaceContract(
      marketplaceAddress,
      wallet
    );

    expect(marketplaceInstance).instanceOf(Contract);
  });

  it('should get true for marketplace configuration for "whitelistedAsset"', async () => {
    const marketplaceInstance = createMarketplaceContract(
      marketplaceAddress,
      wallet
    );
    const config = createMarketplaceConfiguration(marketplaceInstance);
    console.log(await config.get('whitelistedAssetProvider'));

    await expect(config.get('whitelistedAsset')).to.eventually.be.true;
  });
  /*
  it('should get true for marketplace configuration for "whitelistedAssetProvider"', async () => {
    const marketplaceInstance = createMarketplaceContract(
      marketplaceAddress,
      wallet
    );
    const config = createMarketplaceConfiguration(marketplaceInstance);
    await expect(config.get('whitelistedAssetProvider')).to.eventually.be.true;
  });

  it('should get true for marketplace configuration for "assetValidation"', async () => {
    const marketplaceInstance = createMarketplaceContract(
      marketplaceAddress,
      wallet
    );
    const config = createMarketplaceConfiguration(marketplaceInstance);
    await expect(config.get('assetValidation')).to.eventually.be.true;
  });

  it('should get true for marketplace configuration for "saleStrategyPerAsset"', async () => {
    const marketplaceInstance = createMarketplaceContract(
      marketplaceAddress,
      wallet
    );
    const config = createMarketplaceConfiguration(marketplaceInstance);
    await expect(config.get('saleStrategyPerAsset')).to.eventually.be.true;
  });

  it('should get true for marketplace configuration for "sameCurrencyPerAsset"', async () => {
    const marketplaceInstance = createMarketplaceContract(
      marketplaceAddress,
      wallet
    );
    const config = createMarketplaceConfiguration(marketplaceInstance);
    await expect(config.get('sameCurrencyPerAsset')).to.eventually.be.true;
  });

  it('should get true for marketplace configuration for "assetSubdomain"', async () => {
    const marketplaceInstance = createMarketplaceContract(
      marketplaceAddress,
      wallet
    );
    const config = createMarketplaceConfiguration(marketplaceInstance);
    await expect(config.get('assetSubdomain')).to.eventually.be.true;
  });

  it('should get true for marketplace configuration for "stakingAndSlashing"', async () => {
    const marketplaceInstance = createMarketplaceContract(
      marketplaceAddress,
      wallet
    );
    const config = createMarketplaceConfiguration(marketplaceInstance);
    await expect(config.get('stakingAndSlashing')).to.eventually.be.true;
  });
   */
});

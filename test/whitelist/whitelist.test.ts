import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import {
  createAdministrator,
  createAssetProviderManager,
  createAssetValidatorManager,
  createFinanceManager,
  createMarketplaceConfiguration,
  createMarketplaceContract,
  createOwner,
} from 'rif-marketplace-engine-sdk';
import { ContractTransaction, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { Marketplace } from 'rif-marketplace-engine/typechain';
import { prepareMarkerplace } from '../configuration/configuration.utils';

export type MarketplaceSetUp = {
  deployer: Signer;
  otherSigners: Signer[];
  provider: Provider;
  marketplace: Marketplace;
  marketplaceAddress: string;
};

chai.use(chaiAsPromised);

describe('Whitelist Factory', () => {
  describe('Finance Manager Whitelist', () => {
    it('should return true when `financeWhitelist` is added correctly', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createFinanceManager(marketplaceInstance);
      const tx = (await marketplaceRole.financeWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await tx.wait();
      await expect(
        await marketplaceRole.financeWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `financeWhitelist` is removed correctly', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createFinanceManager(marketplaceInstance);
      const tx = (await marketplaceRole.financeWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await tx.wait();
      const txr = (await marketplaceRole.financeWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.financeWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Asset Provider Manager Whitelist', () => {
    it('should return true when `assetProviderWhitelist` is added correctly', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'whitelistedAssetProvider',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createAssetProviderManager(marketplaceInstance);
      const txa = (await marketplaceRole.assetProviderWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.assetProviderWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `assetProviderWhitelist` is removed correctly', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'whitelistedAssetProvider',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createAssetProviderManager(marketplaceInstance);
      const txa = (await marketplaceRole.assetProviderWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.assetProviderWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.assetProviderWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Asset Validator Manager Whitelist', () => {
    it('should return true when `assetValidatorWhitelist` is added correctly', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'assetValidation',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createAssetValidatorManager(marketplaceInstance);
      const txa = (await marketplaceRole.assetValidatorWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.assetValidatorWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `assetValidatorWhitelist` is removed correctly', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'assetValidation',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createAssetValidatorManager(marketplaceInstance);
      const txa = (await marketplaceRole.assetValidatorWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.assetValidatorWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.assetValidatorWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Administrator - Finance Manager Whitelist', () => {
    it('should return true when `financeManagerWhitelist` is added correctly as administrator', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createAdministrator(marketplaceInstance);
      const txa = (await marketplaceRole.financeManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.financeManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `financeManagerWhitelist` is removed correctly as administrator', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createAdministrator(marketplaceInstance);
      const txa = (await marketplaceRole.financeManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.financeManagerWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.financeManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Administrator - Asset Provider Manager Whitelist', () => {
    it('should return true when `assetProviderManagerWhitelist` is added correctly as administrator', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'whitelistedAssetProvider',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createAdministrator(marketplaceInstance);
      const txa = (await marketplaceRole.assetProviderManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.assetProviderManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `assetProviderManagerWhitelist` is removed correctly as administrator', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'whitelistedAssetProvider',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createAdministrator(marketplaceInstance);
      const txa = (await marketplaceRole.assetProviderManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.assetProviderManagerWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.assetProviderManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Administrator - Asset Validator Manager Whitelist', () => {
    it('should return true when `assetValidatorManagerWhitelist` is added correctly as administrator', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'assetValidation',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createAdministrator(marketplaceInstance);
      const txa = (await marketplaceRole.assetValidatorManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.assetValidatorManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `assetValidatorManagerWhitelist` is removed correctly as administrator', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'assetValidation',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createAdministrator(marketplaceInstance);
      const txa = (await marketplaceRole.assetValidatorManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.assetValidatorManagerWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.assetValidatorManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Owner - Administrator Whitelist', () => {
    it('should return true when `adminitratorWhitelist` is added correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createOwner(marketplaceInstance);
      const tx = (await marketplaceRole.adminitratorWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await tx.wait();
      await expect(
        await marketplaceRole.adminitratorWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return true when `adminitratorWhitelist` is removed correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createOwner(marketplaceInstance);
      const tx = (await marketplaceRole.adminitratorWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await tx.wait();
      const txr = (await marketplaceRole.adminitratorWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.adminitratorWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Owner - Asset Manager Whitelist', () => {
    it('should return true when `assetManagerWhitelist` is added correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.assetManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `assetManagerWhitelist` is removed correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.assetManagerWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.assetManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Owner - Asset Provider Manager Whitelist', () => {
    it('should return true when `assetProviderManagerWhitelist` is added correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'whitelistedAssetProvider',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetProviderManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.assetProviderManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `assetProviderManagerWhitelist` is removed correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'whitelistedAssetProvider',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetProviderManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.assetProviderManagerWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.assetProviderManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Owner - Asset Provider Whitelist', () => {
    it('should return true when `assetProviderWhitelist` is added correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'whitelistedAssetProvider',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetProviderWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.assetProviderWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `assetProviderWhitelist` is removed correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'whitelistedAssetProvider',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetProviderWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.assetProviderWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.assetProviderWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Owner - Asset Validator Manager Whitelist', () => {
    it('should return true when `assetValidatorManagerWhitelist` is added correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'assetValidation',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetValidatorManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.assetValidatorManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `assetValidatorManagerWhitelist` is removed correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'assetValidation',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetValidatorManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.assetValidatorManagerWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.assetValidatorManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Owner - Asset Validator Whitelist', () => {
    it('should return true when `assetValidatorWhitelist` is added correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'assetValidation',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetValidatorWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.assetValidatorWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `assetValidatorWhitelist` is removed correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceConfig =
        createMarketplaceConfiguration(marketplaceInstance);
      const tx = (await marketplaceConfig.set(
        'assetValidation',
        true
      )) as ContractTransaction;
      await tx.wait();
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.assetValidatorWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.assetValidatorWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.assetValidatorWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Owner - Asset Finance Manager Whitelist', () => {
    it('should return true when `financeManagerWhitelist` is added correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.financeManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.financeManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `financeManagerWhitelist` is removed correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.financeManagerWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.financeManagerWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.financeManagerWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });

  describe('Owner - Asset Finance Whitelist', () => {
    it('should return true when `financeWhitelist` is added correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.financeWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      await expect(
        await marketplaceRole.financeWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.true;
    });

    it('should return false when `financeWhitelist` is removed correctly as owner', async () => {
      const { deployer, marketplaceAddress, otherSigners } =
        await prepareMarkerplace();

      const marketplaceInstance = createMarketplaceContract(
        marketplaceAddress,
        deployer
      );
      const marketplaceRole = createOwner(marketplaceInstance);
      const txa = (await marketplaceRole.financeWhitelist.add(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txa.wait();
      const txr = (await marketplaceRole.financeWhitelist.remove(
        await otherSigners[0].getAddress()
      )) as ContractTransaction;
      await txr.wait();
      await expect(
        await marketplaceRole.financeWhitelist.isListed(
          await otherSigners[0].getAddress()
        )
      ).to.be.false;
    });
  });
});

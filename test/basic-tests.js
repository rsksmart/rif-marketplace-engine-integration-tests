const chai = require('chai');
const assert = require('chai').assert;
const MarketPlaceData = require('../build/contracts/MarketPlace.json');
const ethers = require('ethers');
const Contract = ethers.Contract;
const Wallet = ethers.Wallet;

const chaiAsPromised = require("chai-as-promised");

const marketplaceContract = new Contract();

describe(`MarketPlace Engine Integration Tests`, function () {
    beforeEach(() => {
        marketplaceContract = MarketplaceContract.getInstance(
            MarketPlaceData.networks[33].address,
            new Wallet(
                '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826'
            )
        );
    });

    it('should create a single marketplace contract instance', async () => {
        // Unit under test
        const marketplaceContractInstance = MarketplaceContract.getInstance(
            MarketPlaceData.networks[33].address,
          new Wallet(
            '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826'
          )
        );
    
        // Verify results
        expect(marketplaceContract).to.be.equal(marketplaceContractInstance);
      });



});
const chai = require('chai');
const assert = require('chai').assert;
const MarketPlaceData = require('../build/contracts/MarketPlace.json');
const ethers = require('ethers');
const Contract = ethers.Contract;
const Wallet = ethers.Wallet;

const chaiAsPromised = require("chai-as-promised");
let provider;
let marketplaceContract;

describe('MarketPlace Engine Integration Tests', async () => {

  before(async () => {

    let url = "http://127.0.0.1:4444";
    provider = new ethers.providers.StaticJsonRpcProvider(url);
    const signer = provider.getSigner();
    marketplaceContract = new ethers.Contract(MarketPlaceData.networks[33].address, MarketPlaceData.abi, provider);
console.log(JSON.stringify(marketplaceContract));
  });
  beforeEach(() => {

  });

  it('should create a single marketplace contract instance', async () => {
    // Unit under test


    // Verify results
  });

});
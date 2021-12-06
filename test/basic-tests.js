const assert = require('chai').assert;
const MarketPlaceData = require('./build/contracts/MarketPlace.json');
import {
    Contract,
    Wallet
} from 'ethers';

describe(`MarketPlace Engine Integration Tests`, function () {
    beforeEach(() => {
            marketplaceContract = MarketplaceContract.getInstance(
                MarketPlaceData.networks[33].address,
                new Wallet(
                    '0xc85ef7d79691fe79573b1a7064c19c1a9819ebdbd1faaab1a8ec92344438aaf4'
                )
            );
        }
    };


    it('First test', async () => {
        assert(true);
    })



});
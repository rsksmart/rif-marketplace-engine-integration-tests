import { config } from 'dotenv';
import {
  defaultMarketplaceOptions,
  deployContract,
  MarketplaceOptions,
} from '../src/utils/deployment';

config();

async function main() {
  const marketplaceOptions: MarketplaceOptions = defaultMarketplaceOptions;
  const { contract: marketplace, signers } = await deployContract(
    'Marketplace',
    marketplaceOptions
  );

  console.log(
    `Owner ${signers[0].address} deployed Marketplace to address: ${
      marketplace.address
    }, with config:\n${JSON.stringify(marketplaceOptions, null, 2)}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

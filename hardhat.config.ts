import { HardhatUserConfig } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import 'tsconfig-paths/register';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    rskRegtest: {
      url: ``,
      accounts: 'remote',
      timeout: 4000,
    },
  },
};

export default config;

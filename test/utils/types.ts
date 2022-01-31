import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';
import { Factory } from '../utils/deployment';

export type ContractDeployed<C extends Contract> = {
  contract: C;
  signers: SignerWithAddress[];
  contractFactory: Factory<C>;
};

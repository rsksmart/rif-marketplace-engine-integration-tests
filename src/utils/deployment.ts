import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract } from 'ethers';
import { Factory } from 'rif-marketplace-engine/utils/deployment.utils';

export type ContractDeployed<C extends Contract> = {
  contract: C;
  signers: SignerWithAddress[];
  contractFactory: Factory<C>;
};

export async function deployContract<C extends Contract, T>(
  deployContract: <C extends Contract>(
    constructorArgs: T,
    factory?: Factory<C>
  ) => Promise<ContractDeployed<C>>,
  constructorArgs: T,
  factory?: Factory<C>
) {
  const { contract, signers } = await deployContract<C>(
    constructorArgs,
    factory
  );

  const [owner, ...otherUsers] = signers;

  console.log(
    `Owner ${owner.address} deployed Marketplace to address: ${
      contract.address
    }, with config: \n 
        ${JSON.stringify(constructorArgs, null, 2)}`
  );

  return { contract, owner, otherUsers };
}

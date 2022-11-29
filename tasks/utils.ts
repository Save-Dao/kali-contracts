import '@nomiclabs/hardhat-ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { Contract, ContractTransaction } from 'ethers';
import fs from 'fs';
import { HardhatRuntimeEnvironment } from 'hardhat/types';


export function getAddrs(): any {
  const json = fs.readFileSync('addresses.json', 'utf8');
  const addrs = JSON.parse(json);
  return addrs;
}

export async function waitForTx(tx: Promise<ContractTransaction>) {
  await (await tx).wait();
}

export async function deployContract(tx: any): Promise<Contract> {
  const result = await tx;
  await result.deployTransaction.wait();
  return result;
}

export async function initEnv(hre: HardhatRuntimeEnvironment): Promise<SignerWithAddress[]> {
  const ethers = hre.ethers; // This allows us to access the hre (Hardhat runtime environment)'s injected ethers instance easily

  const accounts = await ethers.getSigners(); // This returns an array of the default signers connected to the hre's ethers instance
  const dev = accounts[0];
  const governance = accounts[1];
  const treasury = accounts[2];
  const user = accounts[3];

  return [governance, treasury, user, dev];
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

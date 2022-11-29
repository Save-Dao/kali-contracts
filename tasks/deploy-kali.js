import '@nomiclabs/hardhat-ethers';
import { hexlify, keccak256, RLP } from 'ethers/lib/utils';
import fs from 'fs';
import { task } from 'hardhat/config';
import {
  LensHub__factory,
  ApprovalFollowModule__factory,
  CollectNFT__factory,
  Currency__factory,
  FreeCollectModule__factory,
  FeeCollectModule__factory,
  FeeFollowModule__factory,
  FollowerOnlyReferenceModule__factory,
  FollowNFT__factory,
  InteractionLogic__factory,
  LimitedFeeCollectModule__factory,
  LimitedTimedFeeCollectModule__factory,
  ModuleGlobals__factory,
  PublishingLogic__factory,
  RevertCollectModule__factory,
  TimedFeeCollectModule__factory,
  TransparentUpgradeableProxy__factory,
  ProfileTokenURILogic__factory,
  LensPeriphery__factory,
  UIDataProvider__factory,
  ProfileFollowModule__factory,
} from '../typechain-types';
import { deployContract, waitForTx } from './helpers/utils';


const DEV_ADDRESS = '0x4e66A769563d419a75A0C043f307960166165B17';
// Add Proxy admin address to 'Deploying Hub Proxy'
const DEV_PROXY_ADDRESS = '0x599759f1F068fA830876FC230Ec236DCe5db7F18';

// eslint-disable-next-line no-empty-pattern
task('deploy-kali', 'deploys the entire Kali Protocol').setAction(async ({}, hre) => {
  // Note that the use of these signers is a placeholder and is not meant to be used in
  // production.
  const ethers = hre.ethers;
  const accounts = await ethers.getSigners();
  const deployer = accounts[0];
  const governance = accounts[0];
  const treasuryAddress = DEV_ADDRESS;

  // CHIGAG - Proxy admin address must be different than deployer and governance addresses.
  const proxyAdminAddress = DEV_PROXY_ADDRESS;
  const profileCreatorAddress = DEV_ADDRESS;

  // Nonce management in case of deployment issues
  let deployerNonce = await ethers.provider.getTransactionCount(deployer.address);

 

  // Save and log the addresses
  const addrs = {
    'lensHub proxy': lensHub.address,
    'lensHub impl:': lensHubImpl.address,
    'publishing logic lib': publishingLogic.address,
    'interaction logic lib': interactionLogic.address,
    'follow NFT impl': followNFTImplAddress,
    'collect NFT impl': collectNFTImplAddress,
    currency: currency.address,
    'lens periphery': lensPeriphery.address,
    'module globals': moduleGlobals.address,
    'fee collect module': feeCollectModule.address,
    'limited fee collect module': limitedFeeCollectModule.address,
    'timed fee collect module': timedFeeCollectModule.address,
    'limited timed fee collect module': limitedTimedFeeCollectModule.address,
    'revert collect module': revertCollectModule.address,
    'free collect module': freeCollectModule.address,
    'fee follow module': feeFollowModule.address,
    'profile follow module': profileFollowModule.address,
    // --- COMMENTED OUT AS THIS IS NOT A LAUNCH MODULE ---
    // 'approval follow module': approvalFollowModule.address,
    'follower only reference module': followerOnlyReferenceModule.address,
    'UI data provider': uiDataProvider.address,
  };
  const json = JSON.stringify(addrs, null, 2);
  console.log(json);

  fs.writeFileSync('addresses.json', json, 'utf-8');
});

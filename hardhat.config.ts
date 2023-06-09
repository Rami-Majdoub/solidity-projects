import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@rami-majdoub/hardhat-tasks";
import "@rami-majdoub/hardhat-interact";

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: process.env.PROVIDER_ENDPOINT_GOERLI,
      accounts: [ process.env.DEPLOYER_PRIVATE_KEY || "" ]
    },
    polygonMumbai: {
      url: process.env.PROVIDER_ENDPOINT_MUMBAI,
      accounts: [ process.env.DEPLOYER_PRIVATE_KEY || "" ]
    },
    mainnet: {
      url: process.env.PROVIDER_ENDPOINT_MAINNET,
      accounts: [ process.env.DEPLOYER_PRIVATE_KEY || "" ]
    },
    // used by hardhat test & node
    // when using hardhat node deploy with option --network localhost
    hardhat: {
      chainId: 1337, // fixes metamask (default 31337)
      accounts: { // don't use public accounts
        mnemonic: process.env.MNEMONIC_FOR_LOCAL_DEV,
        count: 10,
       },
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {
    	goerli: process.env.ETHERSCAN_APIKEY || "",
    	mainnet: process.env.ETHERSCAN_APIKEY || "",
    	
    	polygonMumbai: process.env.POLYGONSCAN_APIKEY || "",
    	polygon: process.env.POLYGONSCAN_APIKEY || "",
    }
  }
};

export default config;

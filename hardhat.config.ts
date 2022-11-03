import dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  namedAccounts: {
    deployer: {
        default: 0
    }
  },
  networks: {
    SKALE: {
      url: process.env.RPC_URL as string,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string] /// Should Not Contain 0x at the start
    },
  },
  etherscan: {
    apiKey: {
        SKALE: "this-value-does-not-matter"
    },
    customChains: [
        {
            network: "SKALE",
            chainId: Number(process.env.CHAIN_ID),
            urls: {
                apiURL: process.env.API_URL as string,
                browserURL: process.env.BROWSER_URL as string
            }
        }
    ]
  }
};

export default config;

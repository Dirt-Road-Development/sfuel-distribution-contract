import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    SKALE: {
      url: process.env.RPC_URL as string,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string] /// Should Not Contain 0x at the start
    },
  }
};

export default config;

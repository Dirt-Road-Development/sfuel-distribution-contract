import dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-deploy";
import "hardhat-deploy-ethers";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (PRIVATE_KEY === null || PRIVATE_KEY === undefined) throw new Error("Env: Missing Private Key");

function getTestnetEndpoint(chainName: string) : string {
  return "https://testnet.skalenodes.com/v1/" + chainName + "-testnet";
}

function getTestnetBlockExplorerEndpoint(chainName: string, api: boolean = false): string {
  const url = `https://${chainName}-testnet.explorer.testnet.skalenodes.com`;

  return api ? url + "/api" : url;
}

function getMainnetEndpoint(chainName: string) : string {
  return "https://mainnet.skalenodes.com/v1/" + chainName;
}

function getMainnetBlockExplorerEndpoint(chainName: string, api: boolean = false): string {
  const url = `https://${chainName}.explorer.mainnet.skalenodes.com`;

  return api ? url + "/api" : url;
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  namedAccounts: {
    deployer: {
        default: 0
    }
  },
  networks: {
    "calypso-testnet": {
      url: getTestnetEndpoint("giant-half-dual"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "europa-testnet": {
      url: getTestnetEndpoint("juicy-low-small"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "nebula-testnet": {
      url: getTestnetEndpoint("lanky-ill-funny"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "titan-testnet": {
      url: getTestnetEndpoint("aware-fake-trim"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "calypso-mainnet": {
      url: getMainnetEndpoint("honorable-steel-rasalhague"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "europa-mainnet": {
      url: getMainnetEndpoint("elated-tan-skat"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "nebula-mainnet": {
      url: getMainnetEndpoint("green-giddy-denebola"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
    "titan-mainnet": {
      url: getMainnetEndpoint("parallel-storym-spica"),
      accounts: [PRIVATE_KEY] /// Should Not Contain 0x at the start
    },
  },
  etherscan: {
    apiKey: {
        "calypso-testnet": "non-applicable",
        "europa-testnet": "non-applicable",
        "nebula-testnet": "non-applicable",
        "titan-testnet": "non-applicable",
        "calypso-mainnet": "non-applicable",
        "europa-mainnet": "non-applicable",
        "nebula-mainnet": "non-applicable",
        "titan-mainnet": "non-applicable",
    },
    customChains: [
        {
            network: "calypso-testnet",
            chainId: 974399131,
            urls: {
                apiURL: getTestnetBlockExplorerEndpoint("giant-half-dual"),
                browserURL: getTestnetBlockExplorerEndpoint("giant-half-dual", true)
            }
        },
        {
            network: "europa-testnet",
            chainId: 1444673419,
            urls: {
                apiURL: getTestnetBlockExplorerEndpoint("juicy-low-small"),
                browserURL: getTestnetBlockExplorerEndpoint("juicy-low-small", true)
            }
        },
        {
            network: "nebula-testnet",
            chainId: 37084624,
            urls: {
                apiURL: getTestnetBlockExplorerEndpoint("lanky-ill-funny"),
                browserURL: getTestnetBlockExplorerEndpoint("lanky-ill-funny", true)
            }
        },
        {
            network: "titan-testnet",
            chainId: 1020352220,
            urls: {
                apiURL: getTestnetBlockExplorerEndpoint("aware-fake-trim"),
                browserURL: getTestnetBlockExplorerEndpoint("aware-fake-trim", true)
            }
        },
        {
            network: "calypso-mainnet",
            chainId: 1564830818,
            urls: {
                apiURL: getMainnetBlockExplorerEndpoint("honorable-steel-rasalhague"),
                browserURL: getMainnetBlockExplorerEndpoint("honorable-steel-rasalhague", true)
            }
        },
        {
            network: "europa-mainnet",
            chainId: 2046399126,
            urls: {
                apiURL: getMainnetBlockExplorerEndpoint("elated-tan-skat"),
                browserURL: getMainnetBlockExplorerEndpoint("elated-tan-skat", true)
            }
        },
        {
            network: "nebula-mainnet",
            chainId: 1482601649,
            urls: {
                apiURL: getMainnetBlockExplorerEndpoint("green-giddy-denebola"),
                browserURL: getMainnetBlockExplorerEndpoint("green-giddy-denebola", true)
            }
        },
        {
            network: "titan-mainnet",
            chainId: 1350216234,
            urls: {
                apiURL: getMainnetBlockExplorerEndpoint("parallel-storym-spica"),
                browserURL: getMainnetBlockExplorerEndpoint("parallel-storym-spica", true)
            }
        },
    ]
  }
};

export default config;

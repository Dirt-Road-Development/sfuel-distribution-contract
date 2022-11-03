# SKALE Proof of Work Deployment

## Overview

The following sections offer high level detail about the [SKALE Network](https://skale.space) and what this repo does.

###  What is SKALE? 

SKALE is a multi-chain EVM blockchain network that is Ethereum Native. It offers an infinite amount of fast Ethereum-like blockchains where developers can deploy with tools they are familiar with (Solidity, Hardhat, etc) and where users can use their favorite tools (MetaMask, Wallet Connect, etc).

### What is Proof of Work?

Proof-of-Work ("PoW") is a mechanism which allows a user to mine small amounts of sFUEL. The mining process utilizes local computer resources which is the "Work" and then uses this to send a transaction. In this case, the PoW will be used to hit an on-chain "faucet" that then distributes sFUEL back to the user.

### What is sFUEL?

SKALE FUEL ("sFUEL") replaces gas on the SKALE Network. It is the equivalent of Ether on the Ethereum mainnet because it is used to "pay" for transactions, however, it is valueless by default on SKALE. 

Each SKALE Chain utilizes its own sFUEL token meaning that an attack on one network would not leave the rest vulnerable. Additionally, because it is valueless, it should only be given in small amounts to user which is why the faucet ("PowSecure") offers a limited draw for users.

### What does this repo do?
The client side of Proof-of-Work on SKALE is very flexible. The contract on the other hand is very simple and acts identical to a faucet. However, in order to be compatible with community tools and make the deployment both easier and faster;
this repository offers a simple solution to get the Proof-of-Work distribution running on your SKALE chain quickly. Additionally, after deploying to your chain, your chain is then immediatley compatible with the [sFUEL Station](https://sfuel.station).

## Installation

### Automated Install
```
   git clone https://github.com/Dirt-Road-Development/skale-pow-deployment
   cd skale-pow-deployment
   ./setup.sh
```
### Setup Environment

Edit the .env file that was created using VIM ```vim .env```, Nano ```nano .env```, or your favorite editor or IDE.
The .env file after running the setup scripts should look identical to the example found [here](.env/example).

```
# Private Key - DO NOT SHARE - Should NOT start with 0x
DEPLOYER_PRIVATE_KEY=

# SKALE Chain RPC
RPC_URL=

# Decimal Form
CHAIN_ID= 

# Blockscout -> Browser Url + /api
API_URL=

# Blockscout
BROWSER_URL=
```

This fully filled out for a SKALE chain should look similar to the following:

```
# Private Key - DO NOT SHARE - Should NOT start with 0x
DEPLOYER_PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000000

# SKALE Chain RPC
RPC_URL=https://mainnet.skalenodes.com/v1/some-amazing-schain-name

# Decimal Form
CHAIN_ID=11111111111

# Blockscout -> Browser Url + /api
API_URL=https://some-amazing-schain-name.explorer.mainnet.skalenodes.com/api

# Blockscout
BROWSER_URL=https://some-amazing-schain-name.explorer.mainnet.skalenodes.com
```

**NOTICE** In order to deploy on a default SKALE Chain, the DEPLOYER address that is derived from the private key
above must have DEPLOYER_ROLE assigned from the [ConfigController](https://github.com/skalenetwork/config-controller) as well as sFUEL which can be attained from the SKALE Chain Owner.

## Deployment

Deploying to your chosen chain can happen in a few different ways:

1. NPM Script

Run the following in your terminal:

```bash
  npm run deploy
```

The NPM script is an automation identical to the bash script found below. It utilizes the hardhat cli to deploy to the SKALE Network with the default account and network details being configured from the .env file. 

2. Bash Script

Run the following in your terminal:
```bash
./deploy_secure.sh
```

The bash script found [here](./deploy_secure.sh) when run will use the default setup that is created for you.
This means that the provided RPC Url and Private Key will be used to deploy the PoWSecure contract on your chosen SKALE Chain.

**NOTE** Both options above run identically. There is no room for script customization in either of these. If the .env is not filled out properly it will throw an error.

3. Direct from the Command Line (More Customization)

If you are looking to have a bit more customization to your deployment, the hardhat cli is available in this repo once setup and is exposed via npx hardhat <cmd>.

For example, you could setup a different network called CUSTOM and then run the script with ```npx hardhat deploy --network CUSTOM``` in which case the custom network details would be utilized.

## Configuration

The repo contains a JSON file in the root called [config.json](./config.json) that contains the defaults for the various scripts. These defaults are listed below and can be changed and modified to customize your PoW Contract.

#### Default Configuration

```json
  {
    "deploy": {
        "contractName": "PoWSecure",
        "log": true,
        "value": "100",
        "tags": [
            "POW",
            "Secure",
            "Default"
        ]
    },
    "verify": {
        "taskName": "verify:verify",
        "contract": "contracts/PoWSecure.sol:PowSecure"
    }
  }
```




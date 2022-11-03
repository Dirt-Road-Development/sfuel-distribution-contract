# SKALE Proof of Work Deployment 1

## Overview

The following sections offer high level detail about the [SKALE Network](https://skale.space) and what this repo does.

###  What is SKALE? 

SKALE is a multi-chain EVM blockchain network that is Ethereum Native. It offers an infinite amount of fast Ethereum-like blockchains where developers can deploy with tools they are familiar with (Solidity, Hardhat, etc) and where users can use their favorite tools (MetaMask, Wallet Connect, etc).

### What is Proof of Work?

Proof-of-Work ("PoW") is a mechanism which allows a user to mine small amounts of sFUEL. The mining process utilizes local computer resources which is the "Work" and then uses this to send a transaction. In this case, the PoW will be used to hit an on-chain "faucet" that then distributes sFUEL back to the user.

### What is sFUEL?

SKALE FUEL ("sFUEL") replaces gas on the SKALE Network. It is the equivalent of Ether on the Ethereum mainnet because it is used to "pay" for transactions, however, it is valueless by default on SKALE. 

Each SKALE Chain utilizes its own sFUEL token meaning that an attack on one network would not leave the rest vulnerable. Additionally, because it is valueless, it should only be given in small amounts to user which is why the faucet ("PowSecure") offers a limited draw for users.

## Installation

### Automated Install
```
   git clone https://github.com/Dirt-Road-Development/skale-pow-deployment
   cd skale-pow-deployment
   ./setup.sh
```
### Setup Environment

Edit the .env file that was created using VIM ```vim .env```, Nano ```nano .env```, or your favorite editor or IDE.
The .env file after running the setup scripts should look identical to the (Example ENV File)[./env.exmaple]

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

5. Fill the .env (Environment Variable File) with the proper values
    This is your SKALE Chain Deployer Private Key
    - DEPLOYER_PRIVATE_KEY=abcd... 
    This is the RPC URL of your SKALE Chain
    - RPC_URL=https://...

## Deploy
You can either deploy through npm scripts or bash scripts. 

### NPM Deployment
Run ```npm run deploy:pow```

### Bash Deployment
Run ```chmod +x ./deploy_pow.sh && ./deploy_pow.sh```

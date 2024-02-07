![GitHub](https://img.shields.io/github/license/Dirt-Road-Development/sfuel-distribution-contract.svg)

# SKALE Network sFUEL Faucet Contract

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
PRIVATE_KEY
```

This fully filled out for a SKALE chain should look similar to the following:

```
# Private Key - DO NOT SHARE - Should NOT start with 0x
PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000000
```

**NOTICE** In order to deploy on a default SKALE Chain, the DEPLOYER address that is derived from the private key
above must have DEPLOYER_ROLE assigned from the [ConfigController](https://github.com/skalenetwork/config-controller) as well as sFUEL which can be attained from the SKALE Chain Owner.

## Deployment

Deploying to your chosen chain can happen in a few different ways:

1. NPM Script

Run the following in your terminal:

```bash
  npm run deploy --network <network-of-choice>
```

### Network Options


#### Mainnet
- calypso-mainnet
- europa-mainnet
- nebula-mainnet
- titan-mainnet

#### Testnet
- calypso-testnet
- europa-testnet
- nebula-testnet
- titan-testnet

## License

![GitHub](https://img.shields.io/github/license/Dirt-Road-Development/sfuel-distribution-contract.svg)

All contributions are made under the [MIT License](https://www.mit.edu/~amini/LICENSE.md). See [LICENSE](LICENSE).

## Security and Liability
The sFUEL Faucet and code is WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.


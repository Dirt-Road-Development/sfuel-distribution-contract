# SKALE Proof of Work Deployment

## Installation
1. git clone https://github.com/mylilius/skale-pow-deployment
2. cd skale-pow-deployment
3. Run ```npm install```
4. Run ```cp .env.example .env```
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
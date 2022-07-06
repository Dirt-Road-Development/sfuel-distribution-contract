#!/bin/bash

echo "Deploying Proof-of-Work Payer to SKALE Chain"
npx hardhat compile

npx hardhat run --network SKALE ./scripts/deploy_pow.ts

echo "Deployment Complete"
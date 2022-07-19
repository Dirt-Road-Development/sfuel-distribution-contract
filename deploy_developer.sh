#!/bin/bash

echo "Deploying Proof-of-Work Payer to SKALE Chain"
npx hardhat compile

npx hardhat run --network SKALE ./scripts/deploy_developer.ts

echo "Deployment Complete"
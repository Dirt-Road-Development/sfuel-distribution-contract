#!/bin/bash

echo "Deploying Proof-of-Work Payer to SKALE Chain"

npx hardhat compile

npx hardhat deploy --network SKALE

echo "Deployment Complete"

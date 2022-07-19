#!/bin/bash

echo "Adding Developers"
npx hardhat compile

npx hardhat run --network SKALE ./scripts/add_developer.ts

echo "Script Complete"
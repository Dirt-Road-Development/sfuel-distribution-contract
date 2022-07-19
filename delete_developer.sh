#!/bin/bash

echo "Removing Developers"
npx hardhat compile

npx hardhat run --network SKALE ./scripts/delete_developer.ts

echo "Script Complete"
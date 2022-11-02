#!/bin/bash

# Author Sawyer Cutler
# Copyright Dirt Road Dev
# License MIT

set -Eeu

echo "Setting up PoW Repo"

npm install

npm install @openzeppelin/contracts

echo "Copying Env Files"

cp .env.example .env

echo "Ready To Go"

import { Contract } from "ethers";
import { ethers } from "hardhat";
import { PoWDeveloper, PoWDeveloper__factory } from "../typechain";
import dotenv from 'dotenv';
dotenv.config();

const developerContractAddress: string = process.env.DEVELOPER_POW_ADDRESS ?? "";
const developerAddressList: string[] = [];

const deleteDevelopers = async() => {

    try {

        const [ signer ] = await ethers.getSigners()

        const contract: PoWDeveloper = await ethers.getContractAt("PoWDeveloper", developerContractAddress, signer);
        
        if (await contract.owner() === signer.address) {
            for (const address of developerAddressList) {
                await contract.removeDeveloper(address);
            }
        }

        console.log("Developers Added");

    } catch (err: any) {
        throw err;
    }
}

deleteDevelopers()
    .catch(err => console.log("Error: ", err));
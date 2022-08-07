import { ethers } from "hardhat";
import { PoWDeveloper } from "../typechain";
import dotenv from 'dotenv';
dotenv.config();

const developerContractAddress: string = process.env.DEVELOPER_POW_ADDRESS ?? "";
const developerAddressList: string[] = [];

const addDevelopers = async() => {

    try {

        const [ signer ] = await ethers.getSigners()

        const contract: PoWDeveloper = await ethers.getContractAt("PoWDeveloper", developerContractAddress, signer);
        
        if (await contract.owner() === signer.address) {
            for (const address of developerAddressList) {
                await contract.addDeveloper(address);
            }
        }

        console.log("Developers Added");

    } catch (err: any) {
        throw err;
    }
}

addDevelopers()
    .catch(err => console.log("Error: ", err));
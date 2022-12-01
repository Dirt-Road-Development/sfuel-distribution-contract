import { ethers } from "hardhat";

async function main() {

  const factory = await ethers.getContractFactory("PoWSecure");
  const contract = await factory.deploy({
    value: ethers.utils.parseEther("15"),
    gasLimit: ethers.utils.hexlify(5000000)
  });

  await contract.deployed();

  console.log("PoW Secure deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

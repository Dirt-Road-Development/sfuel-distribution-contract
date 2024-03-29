import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'ethers';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();
    
    const result =  await deploy(
        "sFUELFaucet",
        {
            from: deployer,
            log: true,
            value: ethers.utils.parseEther("5")
        } 
    );
    
    const address: string = result.address;

    await hre.run("verify:verify", {
        address,
        contract: "contracts/sFUELFaucet.sol:sFUELFaucet"
    });
}

export default func;

func.tags = ["deploy", "faucet"];

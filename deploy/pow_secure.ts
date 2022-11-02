import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'ethers';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    await deploy(
        "PoWSecure",
        {
            from: deployer,
            log: true,
            value: ethers.utils.parseEther("100")
        } 
    );
}

export default func;

func.tags = ["POW", "Secure", "Default"];

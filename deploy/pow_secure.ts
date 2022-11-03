import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'ethers';
import Config from '../config.json';

const func: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {
    
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();
    
    const result =  await deploy(
        Config.deploy.contractName,
        {
            from: deployer,
            log: Config.deploy.log,
            value: ethers.utils.parseEther(Config.deploy.value)
        } 
    );
    
    const address: string = result.address;

    await hre.run(Config.verify.taskName, {
        address,
        contract: Config.verify.contract
    });
}

export default func;

func.tags = Config.deploy.tags;

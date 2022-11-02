import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BigNumber } from 'ethers';
import Constants from './constants';

async function deployFixture() {
    const [ owner, actor1, actor2, actor3 ] = await ethers.getSigners();

    const factory = await ethers.getContractFactory(Constants.name);
    
    const contract = await factory.deploy({
        value: ethers.utils.parseEther(Constants.startingAllotment)
    });

    const res = await contract.deployed();

    return { factory, contract, owner, actor1, actor2, actor3 };
}

describe("PoWSecure Unit Tests", () => {
    describe("Deployment Checks", () => {
        it("Should Deploy from the Owner Account", async() => {
            const { contract } = await loadFixture(deployFixture);
            expect(contract.address.length).to.be.equal(42);
        });
        it("Expect contract to have 1 sFUEL", async() => { 
            const { contract } = await loadFixture(deployFixture);
            
            expect(
                await contract.callStatic.getBalance()
            ).to.be.equal(ethers.utils.parseEther(Constants.startingAllotment));
        })
        it("Expect Contract to Be Active", async() => {
            const { contract } = await loadFixture(deployFixture);

            expect(
                await contract.callStatic.getState()
            ).to.be.true;
        });
    })
    describe("Ownership Checks", () => {
        it("Should toggle for owner and be inactive", async() => {
            const { contract, owner } = await loadFixture(deployFixture);

            expect(
                await contract.toggleState()
            ).to.emit(Constants.name, "StateToggled").withArgs(owner.address, false);

            expect(
                await contract.callStatic.getState()
            ).to.be.false;
        })
        it("Should throw for non owner and be true", async() => {
            const { contract, actor1 } = await loadFixture(deployFixture);
            
            const nonOwnerContract = contract.connect(actor1);

            await expect(
               nonOwnerContract.toggleState()
            ).to.be.revertedWith(Constants.errors.Ownable);

            expect(
                await contract.callStatic.getState()
            ).to.be.true;
        })
        it("Should update for owner and 0.005", async() => {
            const { contract, owner } = await loadFixture(deployFixture);

            const newAmount: BigNumber = ethers.utils.parseEther("0.005");
            const oldAmount: BigNumber = ethers.utils.parseEther("0.0075"); 

            expect(
                await contract.updateAmount(newAmount)
            ).to.emit(Constants.name, "AmountUpdated").withArgs(oldAmount, newAmount, owner.address);
        
            expect(
                await contract.callStatic.getAmount()
            ).to.be.equal(newAmount);
        })
        it("Should throw for non owner and not change", async() => {
            const { contract, actor1 } = await loadFixture(deployFixture);
            
            const nonOwnerContract = contract.connect(actor1);

            const newAmount: BigNumber = ethers.utils.parseEther("0.005");
            const oldAmount: BigNumber = ethers.utils.parseEther("0.0075"); 
            
            await expect(
               nonOwnerContract.updateAmount(newAmount)
            ).to.be.revertedWith(Constants.errors.Ownable);

            expect(
                await contract.callStatic.getAmount()
            ).to.be.equal(oldAmount);
        })
        it("Should self destruct owner", async() => {
            const { contract, owner } = await loadFixture(deployFixture);


            const res = await contract.deprecate()
            
            await expect(
                contract.callStatic.getBalance()
            ).to.be.reverted;

        })
        it("Should throw for non owner and not change", async() => {
            const { contract, actor1 } = await loadFixture(deployFixture);
            
            const nonOwnerContract = contract.connect(actor1);
            
            await expect(
               nonOwnerContract.deprecate()
            ).to.be.revertedWith(Constants.errors.Ownable);

            expect(
                await contract.callStatic.getAmount()
            ).to.be.equal(ethers.utils.parseEther(Constants.defaultAmount));
        })
    })
});

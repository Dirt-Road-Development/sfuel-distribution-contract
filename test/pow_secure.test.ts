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

    await contract.deployed();

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
            const { contract} = await loadFixture(deployFixture);


            await contract.deprecate();
            
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
        it("Should self destruct owner", async() => {
            const { contract } = await loadFixture(deployFixture);

            await contract.withdraw();
            
            expect(
               await contract.callStatic.getBalance()
            ).to.be.equal(BigNumber.from(0));
        })
        it("Should throw for non owner and not change", async() => {
            const { contract, actor1 } = await loadFixture(deployFixture);
            
            const nonOwnerContract = contract.connect(actor1);
            
            await expect(
             nonOwnerContract.withdraw()
            ).to.be.revertedWith(Constants.errors.Ownable);

            expect(
               await contract.callStatic.getBalance()
            ).to.be.equal(ethers.utils.parseEther(Constants.startingAllotment));
        })
    })
    describe("Update Amount General Check", () => {
        it("Should throw an error on 0", async() => {
            
            const { contract } = await loadFixture(deployFixture);
            
            const newAmount: BigNumber = ethers.utils.parseEther("0");
            const oldAmount: BigNumber = ethers.utils.parseEther("0.0075"); 
            
            await expect(
               contract.updateAmount(newAmount)
            ).to.be.revertedWith(Constants.errors.Amount);

            expect(
                await contract.callStatic.getAmount()
            ).to.be.equal(oldAmount);
        })
        it("Should Change Distribution to 1", async() => {
            const { contract, owner } = await loadFixture(deployFixture);

            const newAmount: BigNumber = ethers.utils.parseEther("0.005");
            const oldAmount: BigNumber = ethers.utils.parseEther("1"); 

            expect(
                await contract.updateAmount(newAmount)
            ).to.emit(Constants.name, "AmountUpdated").withArgs(oldAmount, newAmount, owner.address);
        
            expect(
                await contract.callStatic.getAmount()
            ).to.be.equal(newAmount); 
        })
    })
    describe("Payable Checks", () => {
        it("Should pay 10 random accounts without issue", async() => {
            
            const { contract } = await loadFixture(deployFixture);
            const provider = contract.provider;

            for (let i = 0; i < 10; i++) {
                let wallet = ethers.Wallet.createRandom();
                wallet = wallet.connect(provider);
                const rng = wallet.address;

                await expect(
                    contract.pay(rng)
                ).to.emit(contract, "Payed");

                expect(
                    await wallet.getBalance()
                ).to.be.equal(ethers.utils.parseEther(Constants.defaultAmount));
            }
        })
        it("Should fail on 134 fill up due to being empty", async() => {
            const { contract } = await loadFixture(deployFixture);
            const provider = contract.provider;

            for (let i = 0; i < 133; i++) {
                let wallet = ethers.Wallet.createRandom();
                wallet = wallet.connect(provider);
                const rng = wallet.address;

                await expect(
                    contract.pay(rng)
                ).to.emit(contract, "Payed");

                expect(
                    await wallet.getBalance()
                ).to.be.equal(ethers.utils.parseEther(Constants.defaultAmount));
            }

            let wallet = ethers.Wallet.createRandom();
            wallet = wallet.connect(provider);
            const rng = wallet.address;
            
            await expect(
                contract.pay(rng)
            ).to.be.revertedWith(Constants.errors.Empty);
        })

    });
});

const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Demo", function () {
    let owner
    let other_addr
    let demo

    beforeEach(async function () {
        [onwer, other_addr] = await ethers.getSigners()
        const DemoContract = await ethers.getContractFactory("Demo", owner)
        demo = await DemoContract.deploy()
        await demo.deployed()
    })

    async function sendMoney(sender) {
        const amount = 100
        const txData = {
            to: demo.address,
            value: amount
        }

        const tx = await sender.sendTransaction(txData)
        await tx.wait()
        return [tx, amount]
    }

    it("should allow to send money", async function() {
        const [sendMoneyTx, amount] = await sendMoney(other_addr)
    
        await expect(() => sendMoneyTx)
        .to.changeEtherBalance(demo, amount)
    
        const timestamp = (
            await ethers.provider.getBlock(sendMoneyTx.blockNumber)
        ).timestamp
    
        await expect(sendMoneyTx)
        .to.emit(demo, "Paid")
        .withArgs(other_addr.address, amount, timestamp)
    })
})


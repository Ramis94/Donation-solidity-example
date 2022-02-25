const { expect } = require("chai");

const {ethers} = require("hardhat");

describe("Donation", function () {

    let DonationContract;
    let donation;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        DonationContract = await ethers.getContractFactory("Donation");
        [owner, addr1, addr2] = await ethers.getSigners();
        donation = await DonationContract.deploy();
        await donation.deployed();
    });

    it("getDonationAmountTest", async function () {
        await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther("0.1") });
        await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther("0.2") });
        await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther("0.3") });

        const donationAmount = await donation.getDonationAmount(addr1.address);

        expect(donationAmount).to.equal(ethers.utils.parseEther("0.6"));
    });

    it("getDonatorsTest", async function () {

        await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther("0.1") });
        await donation.connect(addr2).gatherDonation({ value: ethers.utils.parseEther("0.1") });

        const donators = await donation.getDonators();

        expect(donators.length).to.equal(2);
    });

    it("transfer", async function () {

        await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther("0.2") });
        expect(await donation.getBalance()).to.equal(ethers.utils.parseEther("0.2"));

        await donation.connect(owner).transfer(addr2.address, ethers.utils.parseEther("0.1"));
        expect(await donation.getBalance()).to.equal(ethers.utils.parseEther("0.1"));
    });

    it("transferNotOwner", async function () {

        let error = null;
        await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther("0.2") });
        try {
            await donation.connect(addr2).transfer(addr2.address, ethers.utils.parseEther("0.2"))
        } catch (err) {
            error = err;
        }
        expect(error).to.be.an('Error')
        expect(error.message).to.equal("VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'")
    });

    it("transferIfAmountMoreThanBalance", async function () {

        await donation.connect(addr1).gatherDonation({ value: ethers.utils.parseEther("0.2") });
        expect(await donation.getBalance()).to.equal(ethers.utils.parseEther("0.2"));

        let error = null;
        try {
            await donation.connect(owner).transfer(addr2.address, ethers.utils.parseEther("0.5"));
        } catch (err) {
            error = err;
        }
        expect(error).to.be.an('Error')
    });
});

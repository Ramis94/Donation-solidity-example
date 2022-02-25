const hre = require("hardhat");

async function main() {
  const DonationContract = await hre.ethers.getContractFactory("Donation");
  const donation = await DonationContract.deploy();

  await donation.deployed();

  console.log("Donation.sol deployed to:", donation.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

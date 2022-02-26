task("gatherDonation", "Gather Donation")
    .addParam("contract", "The donation address")
    .addParam("amount", "donation amount")
    .setAction(async (taskArgs, hre) => {
        const amount = hre.ethers.utils.parseEther(taskArgs.amount);
        const contract = await hre.ethers.getContractAt("Donation", taskArgs.contract);
        console.log(await contract.gatherDonation({value: amount}));
    });


task("getDonators", "find all donators in contract")
    .addParam("contract", "The donation address")
    .setAction(async (taskArgs, hre) => {
        const contract = await hre.ethers.getContractAt("Donation", taskArgs.contract);
        const result = await contract.getDonators();
        console.log("result: " + result);
    });

task("getDonationAmount", "get donation amount from address")
    .addParam("contract", "The donation address")
    .addParam("donator", "Donator address")
    .setAction(async (taskArgs, hre) => {
        const contract = await hre.ethers.getContractAt("Donation", taskArgs.contract);
        const result = await contract.getDonationAmount(taskArgs.donator);
        console.log(hre.ethers.utils.formatEther(result));
    });

task("transfer", "transfer tokens to another address")
    .addParam("contract", "The donation address")
    .addParam("to", "Output address")
    .addParam("amount", "Output amount")
    .setAction(async (taskArgs, hre) => {
        const amount = hre.ethers.utils.parseEther(taskArgs.amount);
        const contract = await hre.ethers.getContractAt("Donation", taskArgs.contract);
        console.log(await contract.transfer(taskArgs.to, amount));
    });

task("balance", "get contract balance")
    .addParam("contract", "The donation address")
    .setAction(async (taskArgs, hre) => {
        const contract = await hre.ethers.getContractAt("Donation", taskArgs.contract);
        const result = await contract.getBalance();
        console.log(hre.ethers.utils.formatEther(result));
    });
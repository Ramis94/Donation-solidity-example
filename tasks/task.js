task("gatherDonation", "Gather Donation")
    .addParam("contract", "The donation address")
    .addParam("amount", "donation amount")
    .setAction(async (taskArgs, hre) => {
        const amount = decimalToEther(taskArgs.amount);
        const contract = await hre.ethers.getContractAt("Donation", taskArgs.contract);
        console.log(await contract.gatherDonation({value: amount}));
    });


task("getDonators", "find all donators in contract")
    .addParam("contract", "The donation address")
    .setAction(async (taskArgs, hre) => {
        // const contractAddress = web3.utils.toChecksumAddress(taskArgs.contract);
        // let contract = new web3.eth.Contract(abi, contractAddress);
        // console.log(await contract.methods.getDonators().call());

        const contract = await hre.ethers.getContractAt("Donation", taskArgs.contract);
        const result = await contract.getDonators();

        console.log("result = " + result);
    });

task("getDonationAmount", "get donation amount from address")
    .addParam("contract", "The donation address")
    .addParam("donator", "Donator address")
    .setAction(async (taskArgs, hre) => {
        const contract = await hre.ethers.getContractAt("Donation", taskArgs.contract);
        console.log(await contract.getDonationAmount(taskArgs.donator));
    });

task("transfer", "transfer tokens to another address")
    .addParam("contract", "The donation address")
    .addParam("to", "Output address")
    .addParam("amount", "Output amount")
    .setAction(async (taskArgs, hre) => {
        const to = taskArgs.to;

        const amount = decimalToEther(taskArgs.amount);
        console.log("amount = " + amount)
        const contract = await hre.ethers.getContractAt("Donation", taskArgs.contract);
        console.log(await contract.transfer(to, amount));
    });

function decimalToEther(decimal) {
    return Math.round(decimal * Math.pow(10, 18));
}
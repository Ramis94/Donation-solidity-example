require("@nomiclabs/hardhat-waffle");
require('solidity-coverage');
require("dotenv").config();
require("./tasks/task.js");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    rinkeby: {
      url: process.env.RENKEBY_URL || '',
      accounts: process.env.MNEMONIC !== undefined ? { mnemonic: process.env.MNEMONIC} : [],
    }
  },
  solidity: {
    version: "0.8.4"
  }
}
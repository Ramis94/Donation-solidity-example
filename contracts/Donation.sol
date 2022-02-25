pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Donation is Ownable {

    mapping(address => uint) private donators;
    address[] private donatorsArray;

    function gatherDonation() public payable {
        if (donators[msg.sender] == 0) {
            donators[msg.sender] = msg.value;
            donatorsArray.push(msg.sender);
        } else {
            donators[msg.sender] = donators[msg.sender] + msg.value;
        }
    }

    function transfer(address payable to, uint amount) external onlyOwner {
        require(getBalance() >= amount);
        to.transfer(amount);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getDonationAmount(address donator) public view returns (uint) {
        return donators[donator];
    }

    function getDonators() public view returns(address[] memory) {
        return donatorsArray;
    }
}

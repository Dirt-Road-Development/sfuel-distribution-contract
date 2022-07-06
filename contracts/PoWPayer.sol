//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract PoWPayer { 
    constructor () payable {}
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function pay(address payable receiver) external payable {
        receiver.transfer(0.00005 ether);
    }
}

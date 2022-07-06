//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract PoWPayerTimeLock { 

    mapping(uint256 => uint256) private sFuelTracker;

    uint256 constant private MAX_SFUEL_PER_BLOCK = 0.1 ether; 
    uint256 private sFuelSent;
    uint256 private currentBlock;

    constructor () payable {
        sFuelSent = 0;
        currentBlock = block.number;
    }
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function pay(address payable receiver) external payable {
        if (sFuelSent < 0.1 ether) {
            if (sFuelSent + 0.00005 ether <= 0.1 ether) {
                receiver.transfer(0.00005 ether);
            } else {
                receiver.transfer(0.1 ether - sFuelSent);
            }
        }
        if (block.number > currentBlock) {
            sFuelSent = 0;
            currentBlock = block.number;
        }
    }
}

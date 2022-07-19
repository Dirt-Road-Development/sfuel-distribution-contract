//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PoWDeveloper is Ownable { 

    mapping(address => bool) private developers;

    event DeveloperAdded(address indexed developer, uint256 timestamp);
    event DeveloperRemoved(address indexed developer, uint256 timestamp);
    event Payed(address indexed payee, uint256 indexed amount, uint256 indexed timestamp);

    /// @notice The MAX Amount a developer can attain from the faucet
    uint256 private constant AMOUNT = 0.1 ether;


    /// @notice Is Developer Check
    modifier onlyDeveloper {
        require(developers[msg.sender], "Not a Developer");
        _;
    }

    constructor () payable {}
    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function addDeveloper(address developer) external onlyOwner {
        developers[developer] = true;
        emit DeveloperAdded(developer, block.timestamp);
    }

    function removeDeveloper(address developer) external onlyOwner {
        delete developers[developer];
        emit DeveloperRemoved(developer, block.timestamp);
    }

    function pay(address payable receiver) external payable onlyDeveloper {
        uint256 receiverBalance = receiver.balance;
        if (receiverBalance < AMOUNT) {
            uint256 amount = AMOUNT - receiverBalance;
            receiver.transfer(amount);
            emit Payed(receiver, amount, block.timestamp);
        }
    }
}

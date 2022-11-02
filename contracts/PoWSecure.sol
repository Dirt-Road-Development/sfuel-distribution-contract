//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PoWSecure is Ownable { 
    
    /**
      * @dev the Payed Event is called with a successful pay
    **/
    event AmountUpdated(uint256 indexed originalAmount, uint256 indexed newAmount, address indexed signer);

    event Payed(address indexed payee, uint256 indexed amount, uint256 indexed timestamp);
    
    event StateToggled(address indexed signer, bool indexed newState);

    /**
      * @dev the amount the contract should fill a user up to
      * @notice can be changed by the owner
    **/
    uint256 private amount = 0.0075 ether;

    /**
      @dev Value used to determine state
    **/
    bool private isActive;
    
    /**
      * @dev Allows owner to temporarily pause the contract
    **/
    modifier onlyActive {
        require(isActive, "PoWSecure: Contract is Paused");
        _;
    }

    constructor () payable {
        isActive = true;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}
    
    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    /**
      * @dev Gets the balance of the contract (sFUEL)
    **/
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    /**
      * @dev The pay function hit via PoW
      * @param receiver is a payable address
    **/
    function pay(address payable receiver) external payable onlyActive {
        require(amount > 0, "PowSecure: Invalid amount");
        uint256 receiverBalance = receiver.balance;
        if (receiverBalance < amount) {
            uint256 payableAmount = amount - receiverBalance;
            receiver.transfer(payableAmount);
            emit Payed(receiver, payableAmount, block.timestamp);
        }
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(getBalance());
    }
    
    /**
      * @dev Updates the base amount the contract checks for
      * @param _newAmount -> Uint256
    **/
    function updateAmount(uint256 _newAmount) external onlyOwner {
        require(amount > 0, "PowSecure: Invalid Amount");
        uint256 originalAmount = amount;
        amount = _newAmount;
        emit AmountUpdated(originalAmount, amount, msg.sender);
    }
    
    /**
      * @dev Toggles the ability for users to use this contract via the sFUEL Station
      *
    **/
    function toggleState() external onlyOwner {
        isActive = !isActive;
        emit StateToggled(msg.sender, isActive);
    }

    /**
      * @dev Ready to deprecate your contract and upgrade? Hit this to destroy it :)
      * @dev P.S. Be careful
    **/
    function deprecate() external onlyOwner {
        selfdestruct(payable(owner()));
    }

    /**
      * @dev Gets the public amount this faucet gives out
    **/
    function getAmount() external view returns (uint256) {
        return amount;
    }

    /**
      * @dev Gets the state of the active contract
      * If true -> IsActive
    **/
   function getState() external view returns (bool) {
        return isActive;
   }
}

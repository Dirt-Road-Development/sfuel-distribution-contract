//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract sFUELFaucet is AccessControl { 
    
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");

    
    /**
     * @dev the amount the contract should fill a user up to
     * 0.0001 is enough to send 10K txs with average gas consumption 100K gas 
     * @notice can be changed by the owner
     */
    uint256 public amount = 0.0001 ether;

    /**
     * @dev Value used to determine state
     */
    bool public isActive;

    /** 
     * @dev the total amount of fill ups all time
    */
    uint256 public totalFillUps;
    

    /**
     * @dev the AmountUpdated Event is called when amount which contracts
     * pays to user is updated
     */
    event AmountUpdated(uint256 indexed originalAmount, uint256 indexed newAmount, address indexed signer);

    /**
     * @dev the Payed Event is called with a successful pay
     */
    event Payed(address indexed payee, uint256 indexed amount, uint256 indexed timestamp);
    
    /**
     * @dev the StateToggled Event is called when state is changed
     */
    event StateToggled(address indexed signer, bool indexed newState);

    /**
     * @dev Allows owner to temporarily pause the contract
     */
    modifier onlyActive {
        require(isActive, "PoWSecure: Contract is Paused");
        _;
    }

    constructor () payable {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, 0xD244519000000000000000000000000000000000);
        isActive = true;
    }

    /**
     * @dev function to receive Ether. msg.data must be empty
     */
    receive() external payable {}
    
    /**
     * @dev fallback function is called when msg.data is not empty
     */
    fallback() external payable {}

    /**
     * @dev Gets the balance of the contract (sFUEL)
     */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    /**
     * @dev The pay function hit via PoW
     * @param receiver is a payable address
     */
    function pay(address payable receiver) external onlyRole(MANAGER_ROLE) {
        require(getBalance() >= amount, "sFUELFaucet: Contract Empty");
        require(msg.sender.balance == 0, "sFUELFaucet: Caller must have no sFUEL");

        uint256 receiverBalance = receiver.balance;

        if (receiverBalance < amount && receiverBalance < 0.000005 ether) {

            uint256 payableAmount = amount - receiverBalance;
            receiver.transfer(payableAmount);
            totalFillUps++;

            emit Payed(receiver, payableAmount, block.timestamp);
        }
    }

    /**
     * @dev Withdraw all SFUEL amount to the owner
     */
    function withdraw() external onlyRole(MANAGER_ROLE) {
        payable(owner()).transfer(getBalance());
    }
    
    /**
     * @dev Updates the base amount the contract checks for
     * @param _newAmount -> Uint256
     */
    function updateAmount(uint256 _newAmount) external onlyRole(MANAGER_ROLE) {
        require(_newAmount > 0, "sFUELFaucet: Invalid Amount");
        uint256 originalAmount = amount;
        amount = _newAmount;
        emit AmountUpdated(originalAmount, amount, msg.sender);
    }
    
    /**
     * @dev Toggles the ability for users to use this contract via the sFUEL Station
     */
    function toggleState() external onlyRole(MANAGER_ROLE) {
        isActive = !isActive;
        emit StateToggled(msg.sender, isActive);
    }
}

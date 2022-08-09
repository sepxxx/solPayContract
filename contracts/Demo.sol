// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Demo {
    address owner;
    event Paid(address indexed _from, uint _amount, uint _timestamp);
    constructor() {
        owner = msg.sender;
    }

    receive() external payable{
        pay();
    }

    function pay() public payable {
        emit Paid(msg.sender, msg.value, block.timestamp);
    }

    modifier onlyOwner(address _to) {
        require(msg.sender == owner, "you are not onwer");
        _;
    }

    function withdraw(address payable _to) external onlyOwner(_to) {
        _to.transfer(address(this).balance);
    }
}
pragma solidity ^0.4.25;

contract Lottery {

    address public manager;

    constructor() public {
        manager = msg.sender;
    }

}
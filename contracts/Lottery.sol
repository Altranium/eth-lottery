pragma solidity ^0.4.25;

contract Lottery {

    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }

}
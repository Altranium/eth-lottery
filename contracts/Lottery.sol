pragma solidity ^0.4.25;

contract Lottery {

    address public manager;
    address[] public players;

    constructor() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, 'Account most fund more than .01 ether');

        players.push(msg.sender);
    }

    //! Solidity can only handle pseudo-random and does not have random function built-in
    //! It's not truely random because there is preset knowledge that is fed in before the number is generated
    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));    // Uses block & now global variable
    }

    function pickWinner() public {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);      // Transfer the contract's balance to the winner
    }
}
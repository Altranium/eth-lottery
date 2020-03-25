const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;


beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // User one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))  // Teaches web3 about what methods an Inbox contract has
        .deploy( { data: bytecode, arguments: ['Hi there!'] })  // Tells web3 to deploy a copy of this contract
        .send({ from: accounts[0], gas: '1000000'});            // Instructs web3 to send out a transaction that creates the contract

    });

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);   // Checks if it contains a non-null value
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});

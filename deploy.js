const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// Connect to an external live wallet
const provider = new HDWalletProvider(
    'announce decorate permit glide fruit canvas there quote oyster lion cupboard crime',
    'https://rinkeby.infura.io/v3/9fceba3567cc46febe552f2545c6f29f'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy( { data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000'});
        
    console.log('Contract deployed to', result.options.address);
};

deploy();   // Deploy contract
import Web3 from 'web3';
const NETWORK_TYPE = 'live'
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/0fcc4ae8169e407c8773f83621bb92e0"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

let defaultAccount = {
    address: '0xB728473FE039DAC2e72bf17dd960687b9cdd81C1', 
    privateKey: '698870f8bb8e8914bdf332cce43ebeaab1cc4628389d499df5878ced0f6798ea' 
}
let ABI = [{"constant":false,"inputs":[{"internalType":"uint256","name":"pollid","type":"uint256"}],"name":"getVotes","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32[]","name":"arr","type":"bytes32[]"},{"internalType":"string","name":"PollName","type":"string"}],"name":"addNewPoll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"pollId","type":"uint256"},{"internalType":"uint256","name":"choiceId","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"topPoll","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]
let Address = '0xBD1bc0925D6b77cc2923CfA65aa1eb27f1477587' 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const Contract = new web3.eth.Contract(ABI, Address)
export {
    web3,
    NETWORK_TYPE,
    defaultAccount,
    Contract
}

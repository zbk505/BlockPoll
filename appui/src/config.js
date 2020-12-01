import Web3 from 'web3';
const NETWORK_TYPE = 'live'
const ENDPOINT = NETWORK_TYPE === 'private' ? "http://localhost:8545" : "https://ropsten.infura.io/v3/0fcc4ae8169e407c8773f83621bb92e0"
const web3 = new Web3(new Web3.providers.HttpProvider(ENDPOINT))

let defaultAccount = {
    address: '<0xB728473FE039DAC2e72bf17dd960687b9cdd81C1>', 
    privateKey: '<698870f8bb8e8914bdf332cce43ebeaab1cc4628389d499df5878ced0f6798ea>' 
}
let ABI = []
let Address = ''
// Initialize the rating contract with web3 
// Reference: https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html
const Contract = new web3.eth.Contract(ABI, Address)
export {
    web3,
    NETWORK_TYPE,
    defaultAccount,
    Contract
}

var Polls = artifacts.require("./BlockPoll.sol");

module.exports = function(deployer, network, accounts){
    deployer.deploy(Polls,[])
}
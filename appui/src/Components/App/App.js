import React, { Component } from 'react';
import './App.css';
import { web3, NETWORK_TYPE, defaultAccount, Contract } from "./config";
import { UpdatePoll } from "./UpdatePoll";
const Tx = require('ethereumjs-tx').Transaction

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      Polls: [], NewPoll: ""
    }
    this.addNewPoll = this.addNewPoll.bind(this);
    this.handleVoting = this.handleVoting.bind(this);
  }

  addNewPoll(poll) {
    web3.eth.getTransactionCount(defaultAccount.address, (err, txCount) => {
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(468000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei')),
        to: Contract._address,
        data: Contract.methods.addNewPoll(poll).encodeABI()
      }
      const tx = NETWORK_TYPE === 'private' ? new Tx(txObject) : new Tx(txObject, { 'chain': 'ropsten' });
      tx.sign(Buffer.from(defaultAccount.privateKey.substr(2), 'hex'))

      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, 'txHash:', txHash)
        if (!err) {
            this.loadMoviesAsync();
        }
    })
  })
}



  handleVoting(Poll) {
    web3.eth.getTransactionCount(defaultAccount.address, (err, txCount) => {
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(468000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei')),
        to: Contract._address,
        data: Contract.methods.vote(Poll).encodeABI()
      }

      const tx = NETWORK_TYPE === 'private' ? new Tx(txObject) : new Tx(txObject, { 'chain': 'ropsten' });
      tx.sign(Buffer.from(defaultAccount.privateKey.substr(2), 'hex'))

      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, 'txHash:', txHash)
        if (!err) {
            this.getRating(Poll);
        }
      })
    })
  }
  handleChange(event){
    this.setState({NewPoll: event.target.value})
  }
      render() {
        return (
          <div className="App">
            <p className="App-intro">
              BlockPoll: Decentralized Voting App
            </p>
            <form>
            <label>
              Create Poll:
            <input type="text" value={this.state.NewPoll} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit"/>
          </form>
          </div>
        );
      }
}
export default App;

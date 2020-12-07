import React, { Component } from 'react';
import './App.css';
import { web3, NETWORK_TYPE, defaultAccount, Contract } from "./config";
import { UpdatePoll } from "./UpdatePoll";
const Tx = require('ethereumjs-tx').Transaction

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Polls: [],
      newPollName: ''
    }

    this.handleVoting = this.handleVoting.bind(this);
    this.handleNewPoll = this.handleNewPoll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getVotes(Poll) {
    Contract.methods.getVotes(Poll).call().then((votes) => {
        this.setState({
          Polls: this.state.Polls.map(
            (option) => option.name === PollName ? Object.assign({}, option, { rating: votes }) : option
          )
        })
    })
  }

  async getVotesAsync(PollName) {
      let rating = await Contract.methods.getTotalVotes(Poll).call();
      return rating;
  }

  async loadPollsAsync() {
      let polls = []
      let pollsList = await Contract.methods.getPolls().call();
      for (let poll of pollsList) {
          let rating = await this.getRatingAsync(poll);
          polls.push({name: poll, rating: rating});
          console.log(poll);
      }

      this.setState({polls: polls});
  }

  async componentDidMount() {
      await this.loadPollsAsync();
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
            this.getRating(poll);
        }
      })
    })
  }

  handleNewPoll(Poll) {
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
            this.loadPollsAsync();
        }
      })
    })
  }

  handleChange(event) {
    this.setState({newPollName: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.newPollName);
    event.preventDefault();
    this.handleAddingPoll(this.state.newPollName);
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Decentralized Polling Application 
        </p>
        <form onSubmit={this.handleSubmit}>
        <label>
          Poll Name:
          <input type="text" value={this.state.newPollName} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add New Poll" />
      </form>
        <div className="poll-table">
          <UpdatePoll Poll={this.state.polls} vote={this.handleVoting} />
        </div>
      </div>
    );
  }
}
export default App;

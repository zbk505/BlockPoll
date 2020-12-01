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
      PollName: ''
    }

    this.handleVoting = this.handleVoting.bind(this);
    this.handleAddingNewMovie = this.handleAddingNewMovie.bind(this);
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
      let movies = []
      let moviesList = await Contract.methods.getMovies().call();
      for (let movie of moviesList) {
          let rating = await this.getRatingAsync(movie);
          movies.push({name: movie, rating: rating});
          console.log(movie);
      }

      this.setState({movies: movies});
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
            this.getRating(movie);
        }
      })
    })
  }

  handleAddingPoll(Poll) {
    web3.eth.getTransactionCount(defaultAccount.address, (err, txCount) => {
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(468000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei')),
        to: Contract._address,
        data: Contract.methods.addNewMovie(movie).encodeABI()
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

  handleChange(event) {
    this.setState({newMovieName: event.target.value});
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.newMovieName);
    event.preventDefault();
    this.handleAddingPoll(this.state.newMovieName);
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
          <input type="text" value={this.state.newMovieName} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Add New Movie" />
      </form>
        <div className="movie-table">
          <UpdatePoll Poll={this.state.movies} vote={this.handleVoting} />
        </div>
      </div>
    );
  }
}
export default App;

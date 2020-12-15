import React, { Component } from 'react';
import './App.css';
import { web3, NETWORK_TYPE, defaultAccount, Contract } from "./config";
const Tx = require('ethereumjs-tx').Transaction

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleNewPoll = this.handleNewPoll.bind(this);
    this.handleSubmit.bind(this);
  }
  handleVote(Poll){
    web3.eth.getTransactionCount(defaultAccount.address, (err, txCount) => {
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(468000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei')),
        to: Contract._address,
        data: Contract.methods.vote(Poll).encodeABI()
      }
    });
  }
    handleNewPoll() {
      this.handleSubmit();
     let a = document.getElementsByName("PollName");
     let b = document.getElementsByName("Choices");

    web3.eth.getTransactionCount(defaultAccount.address, (err, txCount) => {
      const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(468000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'wei')),
        to: Contract._address,
        data: Contract.methods.addNewPoll(b, a).encodeABI()
      }
    });
  }
  handleSubmit()
  {
    alert("New Poll created!");
    document.getElementById("submitArea").textContent = "";
  }
      render() {
        return (
          <body>
            <h1>BlockPoll</h1>

            <p class ="desc">A Decentralized voting App;<br/>
            Designed to ensure the validity of online polling
            </p>
            <p class = "newpoll_name">Enter poll name</p>
            <p class = "newpoll_choices">Enter poll choices</p>
            <textarea class = "newpoll_name" id="submitArea" name="PollName"></textarea>
            <textarea class="newpoll_choices" id="submitArea" name="Choices"></textarea>
            <button class="submit" id="submitButton" onClick={this.handleNewPoll}>Submit</button>
        
          <form class = "choiceid">
            <label for = "Choice ID">Choice: </label>
          <input type = "text" id = "choiceid"></input>
          </form>
          <button class="submit_vote" id="votebutton" on Click={""}>Vote</button>

          <table class = "demo_table">
          <tr>
            <th>Demo Poll</th> 
          </tr>
          <tr>
            <td>Demo Choice1  votes:  4</td>
          </tr>
          <tr>
            <td>Demo Choice2  votes: 5</td>
          </tr>
          </table>
          </body>
          
        );
      }
}
export default App;

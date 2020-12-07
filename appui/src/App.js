import React, { Component } from 'react';
import './App.css';
import { web3, NETWORK_TYPE, defaultAccount, Contract } from "./config";
import { CurrentPoll } from "./CurrentPoll";
const Tx = require('ethereumjs-tx').Transaction

class App extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.handleNewPoll = this.handleNewPoll.bind(this);
    this.handleSubmit.bind(this);
  }
  handleNewPoll(){

  }
  handleSubmit(event)
  {
    event.preventDefault();
    alert("New Poll created");
    document.getElementById("submitArea").textContent = "";
  }
      render() {
        return (
          <body>
            <h1>BlockPoll</h1>

            <p class ="desc">A Decentralized voting App;<br/>
            Designed to ensure the validity of online polling
            </p>
            <p class = "newpoll">Enter in format of Poll Name first<br/> Then add options seperated by a new line</p>
            <button class="submit" id="submitButton" onClick={this.handleSubmit}>Submit</button>
            <textarea class="newpoll" id="submitArea"></textarea>
          </body>
        );
      }
}
export default App;

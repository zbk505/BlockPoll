import React, { Component } from 'react';
import './UpdatePoll.css'
export class UpdatePoll extends Component {
    handleChange = (poll) => {
        let _poll = poll;
        console.log(poll)
        this.props.vote(_poll)
    }
    render() {
        let pollList = this.props.polls.map((poll, i) =>
            <tr key = { i }>
            <td onClick = { this.handleChange.bind(this, poll.name) } > { poll.name } </td> 
            <td> { poll.rating} </td> 
            </tr>)
            return ( 
                <div>
                <h3> polls </h3> 
                <hr/>
                <table>
                <tbody>
                <tr>
                <th> poll </th> 
                <th > Rating </th> 
                </tr> { pollList } 
                </tbody> 
                </table> 
                </div>
            )
        }
    }
    module.export = UpdatePoll;
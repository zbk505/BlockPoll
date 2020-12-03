import React, { Component } from 'react';
import './UpdatePoll.css'
export class UpdatePoll extends Component {
    handleChange = (poll) => {
        let _poll = poll;
        console.log(poll)
        this.props.vote(_poll)
    }
    render() {
            return ( 
                <div>
                <h3> </h3> 
                <hr/>
                <table>
                <tbody>
                <tr>
                
                </tr>
                </tbody> 
                </table> 
                </div>
            )
        }
    }
    module.export = UpdatePoll;
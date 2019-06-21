	
import React, { Component } from "react";
import {RaisedButton} from "material-ui";
// import CRTickets from "../CRTickets";
import { Redirect,BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import {  browserHistory}  from 'react-router';
import {withRouter} from "react-router-dom";
import { CheckStatus } from "./CheckStatus";

export  class CreateTicket extends Component{
    state={
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
        city: '',
        bio: ''
    };
    
    handleClick = () => {
        this.props.history.push('/MaterialUiForm');
    };

    handleClickStatus = () => {
        this.props.history.push('/CheckStatusForm');
    };
    render(){
        const {handleChange} = this.props;
        return (

                <React.Fragment>
                {/* <CRTickets /> */}
            <button>
                <Link  to="/materialUiForm">
                
                CreateTicket</Link></button>
                 {/* <button
                        label ="CreateTicket"
                        primary={true}
                        component={Link} 
                        to="materialUiForm"
                        // style={styles.button}
                        // onClick={this.handleClick}
                        >CreateTicket</button> */}
                <button
                        // label ="CheckStatus"
                        // Component = {}
                        primary={true}
                        // style={styles.button}
                        // onClick={this.handleClickStatus}
                        ><Link to='/CheckStatusForm'>CheckStatus</Link>
                        </button>
                <button
                        label ="ReceivedStatus"
                        primary={true}
                        // style={styles.button}
                        onClick={this.handleClick}
                        >ReceivedStatus</button> 
                </React.Fragment>

           
        )
    }

}

const styles = {
    button: {
        margin: 40
    }
};




export default withRouter(CreateTicket,CheckStatus);
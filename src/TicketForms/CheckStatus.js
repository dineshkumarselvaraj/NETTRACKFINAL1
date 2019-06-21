
import React, { Component } from "react";
import {RaisedButton} from "material-ui";
// import CRTickets from "../CRTickets";
import { Redirect,BrowserRouter, Switch, Route } from 'react-router-dom'
import {  browserHistory}  from 'react-router';
import {withRouter} from "react-router-dom";
export  class CheckStatus extends Component{
   
    
    handleClick = () => {
        this.props.history.push('/CheckStatusForm');
    };

    render(){
        const {handleChange} = this.props;
        return (
            
                <React.Fragment>
                {/* <CRTickets />                 */}
                <RaisedButton
                        label ="CheckStatus"
                        primary={true}
                        style={styles.button}
                        onClick={this.handleClick}
                        /> 
                </React.Fragment>
          
        )
    }

}

const styles = {
    button: {
        margin: 40
    }
};

export default withRouter(CheckStatus);
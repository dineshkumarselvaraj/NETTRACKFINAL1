
import React, { Component } from "react";
import {withRouter} from "react-router-dom";
//import { CheckStatus } from "./CheckStatus";
import Iframe from 'react-iframe'


export  class CheckSpeed extends Component{
    render(){
        // const {handleChange} = this.props;
        return (
            <Iframe url="https://fast.com/"
            position="absolute"
            width="100%"
            id="myId"
            className="myClassname"
            height="100%"
            styles={{height: "25px"}}/>
        )
    }

}

const styles = {
    button: {
        margin: 40
    }
};




export default withRouter(CheckSpeed);
import React, { Component } from "react";
import CreateTicket from './CreateTicket';
import CheckStatus from './CheckStatus';

export default class TicketHomepage extends Component { 

state = {
  step : 1
};

moveForward =()=>{
  const {step} = this.state;
  this.setState({
    step :step + 1
  })
}

moveBackward =()=>{
  const {step} = this.setState;
  this.setState({
    step:step - 1
  })
}

handleChange = input => e => {
  this.setState({[input]: e.target.value});
};

render(){
  const{step} = this.state;
  switch(step){
    case 1:
    return(
        <CreateTicket
        moveForward = {this.moveForward}
        handleChange={this.handleChange} />
        
      );
    case 2:
    return(
        <CheckStatus
        moveForward = {this.moveForward} 
        handleChange={this.handleChange} />
      );
      default :
            return ''
  }

  }

}
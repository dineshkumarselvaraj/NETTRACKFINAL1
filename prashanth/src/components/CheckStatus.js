import React, { Component } from "react";
import Select from 'react-select';
import axios, { post } from 'axios';
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import "./CreateTicket.css";



const statesList = [
  { label: "TamilNadu", value: 1 },
  { label: "Kerala", value: 2 },
  { label: "Karnataka", value: 3 },
  { label: "Andhra", value: 4 },
  { label: "Madhya Pradesh", value: 1 },
  { label: "Telugana", value: 2 },
  { label: "Delhi", value: 3 },
  { label: "West Bengal", value: 4 },
  { label: "Gujarat", value: 1 },
];

const cityList = [
  { label: "Chennai", value: 1 },
  { label: "Bangalore", value: 2 },
  { label: "Kolkata", value: 3 },
  { label: "Mumbai", value: 4 },
  { label: "Delhi", value: 1 },
  { label: "Cochin", value: 2 },
  { label: "Hyderabad", value: 3 },
  { label: "Pune", value: 4 },
  { label: "Punjab", value: 1 },
];

const prioirtyList = [
  { label: "Low", value: 1 },
  { label: "High", value: 2 },
  { label: "Medium", value: 3 },
];

const NetworkOperator = [
  { label: "Airtel", value: 1 },
  { label: "Vodafone", value: 2 },
  { label: "BSNL", value: 3 },
  { label: "Idea", value: 4 },
  { label: "Jio", value: 1 },
  { label: "Act", value: 2 },
  { label: "Aircel", value: 3 },
  { label: "Ticona", value: 4 },
];

const networkType = [
  { label: "Mobile", value: 1 },
  { label: "BroadBand", value: 2 },
];


const Prioirty = [
  { label: "Low", value: 1 },
  { label: "Medium", value: 2 },
  { label: "High", value: 3 }
];


class CheckStatus extends Component {
  state={
    area: " ",
    assignedTo: 0,
    city: " ",
    complaintAgainst: 0,
    description: " ",
    email: " ",
    expectedCompletionDate: "",
    isNew: 0,
    isReplied: 0,
    networkType: 0,
    requestID: 0,
    requestedBy: 0,
    requesterContactNo: " ",
    requesterName: " ",
    state: " ",
    subject: " ",
    technicianComments: " ",
    technicianContactNo: " ",
    userComments: " "
  }

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    };

    handleChangeDL = value => e => {
      this.setState({[value]: e.target.value});
  };
    
    handleClose = () => {
      this.setState({ open: false });
    };


    continue = e =>{
      e.preventDefault();
      createtickId(this.state);
      //createtic
    };
    
    

  render() {
    const { vertical, horizontal, open } = this.state;
    //const { formErrors } = this.state;
   // const { selectedOption } = this.state;

    return (
        
      <div className="wrapper">
        <div className="form-wrapper">
         <h1>Check Status</h1>
         <h2>User Details</h2>
          <form >
              <label>Request ID</label>
              <input
                placeholder="Request ID"
                type="text"
                onChange={this.handleChange('requesterName')}
              />
&nbsp;&nbsp;
             <button Component={Link} to="/status" >Submit</button> &nbsp;&nbsp;
             <button type="submit">Cancel</button>
             <Route path="/users/" component={Users} />
        
          </form>
        </div>
       </div>
    );
  }
}

function Users() {
    return <h2>Users</h2>;
  }



async function createtickId(data) {
  console.log("%%%%%%%%%%%%%%%%%%%%%%:::::::"+data);
  // alert("ffff>>>"+  JSON.stringify(data))
  return await fetch('http://localhost:8080/complaint/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(response => {
   
    alert(response.firstName);
    console.log('response>> '+response.value);
   
    console.log(".status>> "+response.status);
   
    
      if (response.status >= 200 && response.status < 300) {
          return response;
         console.log('response222>> '+response);
         // window.location.reload();
        } else {
         console.log('Somthing happened wrong');
        }
  }).catch(
    console.log('ll'));
}

export default CheckStatus;

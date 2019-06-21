import React, { Component } from "react";
import Select from 'react-select';
import axios, { post } from 'axios';
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


class CreateTic extends Component {
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
    };
    
    
  render() {
    const { vertical, horizontal, open } = this.state;
    //const { formErrors } = this.state;
   // const { selectedOption } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>File a Compliant</h1>
          <h2>User Details</h2>
          <form noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange('requesterName')}
              />

            </div>
            
            <div className="firstName">
              <label htmlFor="firstName">Email</label>
              <input
                placeholder="Email"
                type="text"
                name="email"
                noValidate
                onChange={this.handleChange('email')}
              />
          </div>
    <div className="firstName">
              <label htmlFor="firstName">State</label>
              <Select options={ statesList } 
               placeholder="State"
               value={this.state.value}
               //value={selectedOption}
               onChange={this.handleChangeDL}  />
        </div>

         <div className="firstName">
              <label htmlFor="firstName">City</label>
              <Select options={cityList}
               placeholder="City"
               //value={selectedOption}
               onChange={this.handledropdown} />
        </div>
         <h2>Compliant Details</h2>

            <div className="firstName">
              <label htmlFor="lastName">Network Type</label>
              <Select options={networkType}
               placeholder="Network Type"
               //value={selectedOption}
               onChange={this.handledropdown} />
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Network Operator</label>
              <Select options={NetworkOperator}
               placeholder="Network Operator"
               //value={selectedOption}
               onChange={this.handledropdown} />
            </div>
            
            <div className="firstName">
              <label htmlFor="lastName">Mobile No</label>
              <input
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange('technicianContactNo')}
              />
            </div>

            <div className="lastName">
              <label htmlFor="lastName">Prioirty</label>
              <Select options={Prioirty}
               placeholder="Network Operator"
               //value={selectedOption}
               onChange={this.handledropdown} />
            </div>
        
         <div className="mobile">
              <label htmlFor="mobile">Issue description</label>
              <input
                placeholder="Mobile No"
                type="mobile"
                name="mobile"
                height = "50px"
                noValidate
                onChange={this.handleChange('userComments')}
                pattern="^\d{4}-\d{3}-\d{4}$" required
              />
            </div> 

             
            <div className="createAccount">
              <button type="submit" onClick={this.continue}>Register</button>
            </div>
            <div className="createAccount">
              <button type="submit">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
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

export default CreateTic;

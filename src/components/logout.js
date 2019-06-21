import React, { Component } from "react";
import Select from 'react-select';
import {withRouter} from "react-router-dom";

class Logout extends Component {
    
  render() {
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Log out page</h1>
          <form noValidate>
            <div className="firstName">
              <label htmlFor="firstName">Logged out successfully.....</label>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default withRouter(Logout);
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import {RaisedButton} from "material-ui";
//import asyncValidate from './asyncValidate';
import validate from '../validate';
// import pop from '../pop'
import { Popover } from '@material-ui/core';
//import { withToastManager } from 'react-toast-notifications';
import {withRouter} from "react-router-dom";
import Popup from "reactjs-popup";

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
};

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
);

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const renderSelectField = (
  { input, label, meta: { touched, error }, children, ...custom },
) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);
const handleClick = (onClick) => {
 window.alert("Tiket Created Successfully: Ticket ID - 4767")
  // window.confirm("Tiket Created Successfully: Ticket ID - 4767") &&
  // document.write("Cleared")
};  



const styles = {
  button: {
      margin: 40
  }
};

class MaterialUiForm extends React.Component{

  prevStep = ()=> {
    console.log("clicked")
    this.props.history.push('/')
  }

  render(){
    const {pristine, reset, submitting } = this.props;
    return(
      <form >
      <b>Create Ticket</b>
      <div>
        <Field
          name="userName"
          component={renderTextField}
          label="User Name"
        />
      </div>
      <div>
        <Field name="department" component={renderTextField} label="Department" />
      </div>
      <div>
        <Field name="email" component={renderTextField} label="Email" />
      </div>
      <div>
        <Field
          name="issue"
          component={renderSelectField}
          label="Issue"
        >
          <MenuItem value="1" primaryText="Walled Off Internet" />
          <MenuItem value="2" primaryText="Cloud Attacks" />
          <MenuItem value="3" primaryText="speed" />
        </Field>
      </div>    

      <div>
        <Field
          name="prioirty"
          component={renderSelectField}
          label="priority"
        >
          <MenuItem value="1" primaryText="High" />
          <MenuItem value="2" primaryText="Low" />
          <MenuItem value="3" primaryText="Medium" />
        </Field>
      </div>
      <div>
        <Field
          name="notes"
          component={renderTextField}
          label="Notes"
          multiLine={true}
          rows={2}
        />
      </div>
      <div>
      <button
                        // label ="Back"
                        primary={true}
                        // style={styles.button}
                        onClick={this.prevStep}
                        //onClick={reset}
                        >Back</button>

  <Popup
    
    trigger={<button 
      // label ="Submit" 
    primary={true} 
    style={styles.button} 
    // className="button"
    >Submit</button>}
    modal
    contentStyle={contentStyle}
  >
    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Ticket Generated Successfully - 4917 </div>
        <div className="content">
          {" "}
          TicketName
          <br />
          TicketID
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button>
        </div>
      </div>
    )}
  </Popup>   

       <button
                        // label ="Clear Values"
                        primary={true}
                        // style={styles.button}
                        onClick={reset}
                        //onClick={reset}
                        >Clear Values</button>
        
      </div>
    </form>
    )
  }
}


export default withRouter(reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  //asyncValidate,
})(MaterialUiForm));

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {RaisedButton} from "material-ui";
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

  checkstform = ()=> {
    console.log("clicked")
    this.props.history.push('/statusForm')
  }

  render(){
    const {pristine, reset, submitting } = this.props;
    return(
      <form >
      <b>Check Status</b>
      <div>
        <Field
          name="ticketID"
          component={renderTextField}
          label="TikcetID"
        />
      </div>
      <div>
      <button
                        // label ="Back"
                        primary={true}
                        // style={styles.button}
                        onClick={this.prevStep}
                        >Back</button>

       <button
                        // label ="Submit"
                        primary={true}
                        // style={styles.button}
                        onClick={this.checkstform}
                        >Submit</button>
        <button
                        // label ="Clear Values"
                        primary={true}
                        // style={styles.button}
                        onClick={reset}
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

import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";

import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';

import Button from '@material-ui/core/Button';

import CssBaseline from '@material-ui/core/CssBaseline';

import FormControl from '@material-ui/core/FormControl';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox from '@material-ui/core/Checkbox';

import Input from '@material-ui/core/Input';

import InputLabel from '@material-ui/core/InputLabel';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';

import withStyles from '@material-ui/core/styles/withStyles';
import MySupport from '../MySupport'
import { AlertError } from "material-ui/svg-icons";






const styles = theme => ({

  main: {

    width: 'auto',

    display: 'block', // Fix IE 11 issue.

    marginLeft: theme.spacing.unit * 3,

    marginRight: theme.spacing.unit * 3,

    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {

      width: 400,

      marginLeft: 'auto',

      marginRight: 'auto',

    },

  },

  paper: {

    marginTop: '25px',

    display: 'flex',

    flexDirection: 'column',

    alignItems: 'center',

    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,

  },

  avatar: {

    margin: theme.spacing.unit,

    backgroundColor: theme.palette.secondary.main,

  },

  form: {

    width: '100%',

    marginTop: theme.spacing.unit,

  },

  submit: {

    marginTop: theme.spacing.unit * 3,

  },

});





class SignIn extends Component {



  state = {

    redirectToReferrer: false,

    userName: '',

    rowsdata: []

  }


  /*
  
  async componentWillMount() {
  
  
  try {
  
  const password = this.state.password;
  
  const userid = this.state.userName;
  
  const res = await fetch(`http://localhost:8080/login?password=${password}&userid=${userid}`);
  
  alert("ss>> "+res)
  
  const movie = await res.json();
  
  alert("movie>> "+movie)
  
   
  
   
  
  } catch (e) {
  
   
  
  console.log(e);
  
   
  
  }
  
   
  
  }*/



  handleSubmit = () => {


    const password = this.state.password;

    const email = this.state.email;

    fetch(`http://localhost:8083/login?email=${email}&password=${password}`).then(response =>

      response.json()

    )

      .then(data => {

        //alert(data.email)

        this.setState({

          rowsdata: data,

        })

        // alert("fff>> "+this.state.rowsdata);

        // alert("fff>> "+this.state.rowsdata.userName);

      })

    // alert("outt>> "+this.state.rowsdata);

    if (this.state.email === email ) {
  
      this.fakeAuth()
      

     // this.fakeAuth()

    }
    else{
     
      alert("Invalid Email or Password");
    }

    

    // this.getLogin();

  }


  /*
  
  handleSubmit = ()=>{
  
  
  const password = this.state.password;
  
  const userid = this.state.userName;
  
  const res = await fetch(`http://localhost:8080/login?password=${password}&userid=${userid}`)
  
  alert("res>> "+res);
  
  const movies = await res.json();
  
  alert("after>> "+movies);
  
  alert("after>> "+movies.userName);
  
  this.setState({
  
   
  
  rowsdata: movies.results,
  
   
  
  });
  
   
  
   
  
  alert("outt>> "+this.state.rowsdata);
  
  if(this.state.rowsdata.userName==='admin')
  
  {
  
  alert("inside>> "+this.state.rowsdata);
  
  this.fakeAuth()
  
  }
  
  // this.fakeAuth()
  
  // this.getLogin();
  
  }
  
  
  */

  /* getLogin(){
  
  const password = this.state.password;
  
  const userid = this.state.userName;
  
  alert("fffee")
  
  return async function(){
  
  const res=await fetch(`http://localhost:8080/login?password=${password}&userid=${userid}`);
  
  alert("fff")
  
  const movies =await res.json();
  
   
  
  }
  
  }*/


  fakeAuth = () => {

    //alert(this.state.rowsdata);

    this.setState({

      redirectToReferrer: true

    })

  }

  handleChange = input => e => {

    this.setState({ [input]: e.target.value });

    console.log(this.state.email)

  }

  render() {


    const { classes } = this.props;

    const { redirectToReferrer } = this.state;

    // const { from } = this.props.location.state || { from: { pathname: '/' } }



    // if (redirectToReferrer === true){

    // return <Redirect to='./Checkout'/>

    // }

    if (redirectToReferrer === true) {
      
      // return (this.state.email === this.state.email ?

      //   <Redirect to='/MySupport' /> :

      //   <Redirect to='/MySupport' />

      // )
      return (

        <Redirect to='/MySupport' /> 

      

      )



    }


    return (

      <main className={classes.main}>

        <CssBaseline />

        <Paper className={classes.paper}>


          {/* <ImageAvatars/> */}



          <form className={classes.form} onSubmit={this.handleSubmit}>

            <FormControl margin="normal" required fullWidth>

              <InputLabel htmlFor="email">Email Address/User Name</InputLabel>

              <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange('email')} />

            </FormControl>

            <FormControl margin="normal" required fullWidth>

              <InputLabel htmlFor="password">Password</InputLabel>

              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange('password')} />

            </FormControl>

            <FormControlLabel

              control={<Checkbox value="remember" color="primary" />}

              label="Remember me"

            />



            <Button type="submit" fullWidth variant="contained"

              color="primary" className={classes.submit} >Sign-in</Button>



            <p>Click here to <a href="/SignUp">Signup </a> </p>

            {/* onClick={this.handleSubmit} */}


          </form>

        </Paper>



        {/* <a target='_blank' href="https://facebook.com"><iclass="socialIcons facebook fab fa-facebook-square"></i></a>

<a target='_blank' href="https://twitter.com"><iclass="socialIcons twitter fab fa-twitter-square"></i></a>

{/* <a target='_blank' href="https://plus.google.com"><iclass="socialIcons google fab fa-google-plus-g"></i></a> */}

        {/* <a target='_blank' href="https://www.linkedin.com/"><iclass="socialIcons linkedin fab fa-linkedin"></i></a> */}

      </main>

    );
  }

}


SignIn.propTypes = {

  classes: PropTypes.object.isRequired,

};


export default withStyles(styles)(SignIn);
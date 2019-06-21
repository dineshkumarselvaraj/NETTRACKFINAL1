import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { white } from 'material-ui/styles/colors';
import './work.css'

const styles = {
  root: {
    flexGrow: 1,
    color:white
  },
  grow: {
    flexGrow: 1,
  },
  appbar:{
     height:70 
  //   color:red

   },
  menuButton: {
    marginLeft: -20,
    marginRight: 20,
    height: 20
  },
};

function MakeComplaint(props) {
  const { classes } = props;
  return (
    <div className="root1">
      <AppBar className={classes.appbar + " tool-bar"}>
     
        <Toolbar>
          {/* <IconButton className={classes.menuButton + "button-bar"} color="inherit" aria-label="Menu">
            
          </IconButton> */}
          <Typography variant="h6" color="inherit" className={classes.grow}>
           
          </Typography>
          <img src= {logo} height="165" alt="dsdsds" width="165" />
          <div class="topnav" id="myTopnav">
  <Link to="/Home" class="active">Home</Link>
  <Link to="/About" class="active">About</Link>
  <Link to="/Works" class="active">How its Work</Link>
  <Link to="/Complaints" class="active">Resolved Complaints</Link>
   
   
    

</div>
          <Button component={Link} to="/login" >Login</Button> &nbsp;&nbsp; 
          <Button component={Link} to="/signup">signUp</Button>
        </Toolbar>
      </AppBar>
      <div className="jumbotron jumbotron--standard">
          <div className="container-fluid container-fluid--lg">
              <h1>How to make a complaint</h1>
            <p>
              Please use this process if you wish to make a complaint about any of the services provided by Networks Companies.
              </p>
              </div>
          </div>
   
  </div>
     
      




     );
   }
   
   MakeComplaint.propTypes = {
     classes: PropTypes.object.isRequired,
   };
   
   export default withStyles(styles)(MakeComplaint);
   
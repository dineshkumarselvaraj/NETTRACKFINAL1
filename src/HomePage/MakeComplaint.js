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
  <Link to="/" class="active">Home</Link>
  <Link to="/About" class="active">About Us</Link>
  {/* <Link to="/Works" class="active">How It Works</Link> */}
  {/* <Link to="/Complaints" class="active">Resolved Complaints</Link> */}
   
   
    

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
          <div class="col-md-12">
				<h4>Our Story</h4>
<p><strong>We at Nettrack believe that everybody should have access to clear and effective guidance to help them deal with their consumer complaints. Our dedicated team of experts are there to help you with each and every step to make sure your complaint gets resolved, from filing a complaint to filing a legal notice to filing a legal complaint, Consumer Sathi is there till you’re not appeased.</strong></p>
		
				
				</div>
        <div className="footer"> 
@CopyRights NetTrack
</div>
  </div>
     
      




     );
   }
   
   MakeComplaint.propTypes = {
     classes: PropTypes.object.isRequired,
   };
   
   export default withStyles(styles)(MakeComplaint);
   
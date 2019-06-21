import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from "../images/logo.png"
import "../footer.css"

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
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

function About(props) {
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
  <Link to="/Works" class="active">How It Works</Link>
  <Link to="/Complaints" class="active">Sucess Stories</Link>

</div>

<Button component={Link} to="/login" >Login</Button> &nbsp;&nbsp; 
          <Button component={Link} to="/signup">signUp</Button>
          
        </Toolbar>
      </AppBar>
      <div class="header1" >
     
      <div class="banner-captions">
      
      <div class="banner-captions-n">

<h2>About Us – Our name speaks for itself.</h2>
      </div>
     
</div>
<div class="banner1">
<section class=""> 
<div class=" container">
<div class="row">
				<div class="col-md-12">
				<h4>Our Story</h4>
<p><strong>We at Nettrack believe that everybody should have access to clear and effective guidance to help them deal with their consumer complaints. Our dedicated team of experts are there to help you with each and every step to make sure your complaint gets resolved, from filing a complaint to filing a legal notice to filing a legal complaint, Consumer Sathi is there till you’re not appeased.</strong></p>
		
				
				</div>
				
				</div>
				</div>
        

</section>
</div>
</div>
</div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);

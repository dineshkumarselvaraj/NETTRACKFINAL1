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

function menuBar(props) {
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
  <Link to="/About" class="active">About Us</Link>
  <Link to="/Works" class="active">How It Works</Link>
  <Link to="/Complaints" class="active">Sucess Stories</Link>
   
   
    

</div>
          <Button component={Link} to="/login" >Login</Button> &nbsp;&nbsp; 
          <Button component={Link} to="/signup">signUp</Button>
        </Toolbar>
      </AppBar>
   
<div class="header" >

<div class="banner-caption">


  
  <div class="banner-caption-n">
<h1>Are You
<spam>Frustrated With Yor BandWidth ?</spam></h1>
<div class="banner">
<h2>Net Track – Your One Stop Destination For All Network Related Issues.</h2>

</div>
</div>
</div>
  </div>
  <section class="countertxt"> 
       <div class="row">
         <div class="col-md-3">
           <div id="talkbubble">
             <span class="widtot">No. of Complaints Received</span>
             <span class="count">11120</span>
          </div>
        </div>  
        <div class="col-md-3">
          <div id="talkbubble">
             <span class="widtot">No. of Cases Resolved</span>
             <span class="count">10271</span>
          </div>
        </div>
        </div>
     
  </section>
  <div className="footer"> 

</div>
 
  
  </div>
    );
}

menuBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(menuBar);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../images/logo.png";
import { white } from 'material-ui/styles/colors';
// import "./partners.css"

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

class menuBar extends Component {
  
  
  render() {
    const { classes } = this.props;
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
  <Link to='/' class="active">Home</Link>
  <Link to="/About" class="active">About Us</Link>
  {/* <Link to="/Works" class="active">How It Works</Link> */}
  {/* <Link to="/Complaints" class="active">Sucess Stories</Link> */}
  </div>
          <Button component={Link} to="/login" >Login</Button> &nbsp;&nbsp; 
          <Button component={Link} to="/signup">signUp</Button>
        </Toolbar>
      </AppBar>
   
<div class="header" >

<div class="banner-caption">
  <div class="banner-caption-n">
<h3>Net Track – Your One Stop Destination For All Network Related Issues.</h3>
<div class="banner">
<h3>Are You
Frustrated With Your BandWidth ?</h3>

</div>
</div>
</div>
  </div>
  <section class="countertxt"> 
       <div class="row">
         <div class="col-md-3">
           <div id="talkbubble">
             <span class="widtot">No. of Complaints Received</span>
             <span class="count">00003</span>
          </div>
        </div>  
        <div class="col-md-3">
          <div id="talkbubble">
             <span class="widtot">No. of Cases Resolved</span>
             <span class="count">00000</span>
          </div>
        </div>
        </div>
     
  </section>
<div class="col-sm-12 col-lg-6 col-md-12">
  <div class="about-home-left about-home-right mycl">
    <h3 class="about-heading">
    Solved complaints against
      </h3>
      <div class="solvedWrapper">
        </div>
    </div>

  </div>


  <div className="footer"> @2019 NetTrack

</div>
 
  
  </div>
    );
}
}

menuBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(menuBar);

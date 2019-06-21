import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Monitor from './Monitor';
import CheckSpeed from './CheckSpeed'
import CreateTic from './CreateTic'
import CheckStatus from './CheckStatus'
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Notifications from './Notifications';
import Badge from '@material-ui/core/Badge';

// const styles = {
//   root: {
//     flexGrow: 1,
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(requestid, date, companyname, description, status) {
  // id += 1;
  return { requestid, date, companyname, description, status};
}

const rowsData = [
  createData('1', 'Jan 01 2019', 'Airtel', 'Very slow 3G speed', 'Open'),
  createData('2', 'Jan 02 2019', 'Vodafone', 'Very slow 3G speed', 'Open'),
  createData('3', 'Jan 03 2019', 'Jio', 'Very slow 3G speed', 'Open'),
  createData('4', 'Jan 04 2019', 'Idea', 'Very slow 3G speed', 'Closed'),
  createData('5', 'Jan 05 2019', 'Reliance', 'Very slow 3G speed', 'Open'),
];

// function ButtonAppBar(props) {
  class MySupport extends Component {

    constructor(props){
        super(props);
        this.state = {
          notificationList: [],
          isLoaded: false,
        }
    }

    componentDidMount(){
      fetch('http://127.0.0.1:8090/notification/1')
      .then(res => res.json())
      .then(data => {
        console.log("data ==>" +data);
        this.setState({
          isLoaded: true,
          notificationList: data,
        })
      });
    }
  
  render(){
    var {isLoaded} = this.state;
    const { classes } = this.props;

    // if(!isLoaded){
    //   return <div>Loading...</div>
    // }else{
      return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            <Button color="inherit" className = {" supportButton"}>
            <Link to='/CheckSpeed' color="inherit" >Check Your Internet Speed</Link>
            </Button>
            {/* <Button color="inherit">How it Works?</Button>
            <Button color="inherit">Resolved Complaints</Button> */}
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Notifications stateValue = {this.state} isAuthed={true} />
              </Badge>
            </IconButton>
            </Typography>
            <Button color="inherit" align="right">Logout</Button>
            <Button color="inherit" className = {" supportButton"} >
            <Link to='/CreateTic' align="right">Take a Complaints </Link>
            </Button>
            <Button color="inherit" className = {" supportButton"} >
            <Link to='/CheckStatus' align="right">Check Status </Link>
            </Button>
          </Toolbar>
        </AppBar>
          
        <Paper className={classes.root}>
        <Typography variant="h5" color="inherit" className={classes.grow} align="left">My Support</Typography>
        <Typography variant="h6" color="inherit" className={classes.grow} align="left">Your Last 5 active interactions will be listed here</Typography>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Request ID</CustomTableCell>
              <CustomTableCell align="right">Date of request</CustomTableCell>
              <CustomTableCell align="right">Raised Against</CustomTableCell>
              <CustomTableCell align="right">Description</CustomTableCell>
              <CustomTableCell align="right">Status</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsData.map(data => (
              <TableRow className={classes.row} key={data.requestid}>
                <CustomTableCell component="th" scope="row">
                  {data.requestid}
                </CustomTableCell>
                {/* <CustomTableCell align="right"></CustomTableCell> */}
                <CustomTableCell align="right">{data.date}</CustomTableCell>
                <CustomTableCell align="right">{data.companyname}</CustomTableCell>
                <CustomTableCell align="right">{data.description}</CustomTableCell>
                <CustomTableCell align="right">{data.status}</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      

      <Switch>
          <Route exact path = "/"  render={(props) => <Monitor {...props} isAuthed={true}  />}></Route>
          <Route  path = "/CheckSpeed" component = {CheckSpeed} ></Route>
          <Route  path = "/CreateTic" component = {CreateTic} ></Route>
          <Route  path = "/CheckStatus" component = {CheckStatus} ></Route>
      </Switch>
      </div>
    );
    }
  // }
}

MySupport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MySupport);

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckSpeed from './CheckSpeed'
import {BrowserRouter as Router,Route,Link,Switch,Redirect,withRouter} from 'react-router-dom';
import Notifications from './Notifications';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ExpandCollapse from 'react-expand-collapse';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from '@material-ui/icons/Delete';
import Moment from 'react-moment';
import ManageTickets from '../TicketForms/ManageTickets';
import ViewTickets from '../TicketForms/ViewTickets';
import ViewStatus from '../TicketForms/ViewStatus';
// import Logout from '../components/logout';

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

const showTicketStatus = (value) => {
  switch(value){
    case 0:
      return "Open";
    case 1:
      return "Assigned";
    case 2:
      return "Closed";
    case 3:
      return "Replied";
    case 4:
      return "Rejected";
    default:
      return "UnKnown";
  }
};

//Dialog box
const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  },
}))(MuiDialogActions);

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
function getSteps() {
  return ['Open', 'Assigned', 'Closed/Rejected'];
}

function getStepsWithoutReject() {
  return ['Open', 'Assigned', 'Closed'];
}
// function ButtonAppBar(props) {
  class MySupport extends Component {

    constructor(props){
        super(props);
        this.state = {
          notificationList: [],
          userComplaintList: [],
          isLoaded: false,
          notificationLength: 0,
          openDialog: false,
          openCancelRequestDialog: false,
          currentData: {},
          skipped: new Set(),
          currentRequestId: 0,
        }
    }

    componentDidMount(){
      this.loadNotificationData();
      this.loadTop5Request();
    }

    logoutFromApp = (userId) => {
      console.log("logoutFromApp beign called")
      fetch('http://localhost:8083/logout?userId='+userId, {
			method: 'PUT',
			headers: {
			  "Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
      alert("user logged out successfully")
						return response.json()
		})
    };

    
    setRequestId = (requestID) => {
      console.log('*****setRequestId method called*********requestID:'+requestID);
      console.log('*************')
      
      this.setState({
        currentRequestId : requestID,
      });
      console.log("currentRequestId :" +JSON.stringify(this.state));

      console.log("currentRequestId :" +this.state.currentRequestId);
    };

    loadTop5Request = () => {
      fetch('http://localhost:8082/complaint/user/?requestedBy=11')
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          userComplaintList: data,
        })
      });
    };

    loadNotificationData = () => {
      fetch('http://127.0.0.1:8081/notification?userID=11')
      .then(res => res.json())
      .then(data => {
        console.log("data ==>" +data);
        console.log("data ==>" +data.length);
        this.setState({
          isLoaded: true,
          notificationList: data,
          notificationLength: data.length,
        })
      });
    };
  
  openStatusDialog = (data) => {
    console.log("openStatusDialog Data : " + JSON.stringify(data));
    this.setState({
      openDialog: true,
      currentData: data,
    });
  };

  openCancelRequestStatusDialog = (data) => {
    console.log("openCancelRequestStatusDialog Data : " + JSON.stringify(data));
    this.setState({
      openCancelRequestDialog: true,
      currentData: data,
    });
  };

  closeStatusDialog = () => {
    this.setState({ openDialog: false });
  };
  closeCancelRequestStatusDialog = () => {
    this.setState({ openCancelRequestDialog: false });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render(){
    var {isLoaded,userComplaintList} = this.state;
    const { classes,onClose,children  } = this.props;
    const steps = getSteps();
    const stepsWithoutReject = getStepsWithoutReject();
    
    // const [value, setValue] = React.useState('');

    // React.useEffect(() => {
    //   localStorage.setItem('latestRequestId', value);
    // }, [value]);

    // const onChange = event => setValue(event.target.value);

    if(!isLoaded){
      return <div>Loading...</div>
    }else{
      return (
      <div className={classes.root}>
        <AppBar position="static" >
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {/* <Button color="inherit" onClick = {this.redirectTo}>Check Your Internet Speed</Button> */}

              <Button color="inherit" className = {" supportButton "}>
              {/* style="color: #FFFFFF; text-decoration: none;"  */}
                  <Link to='/CheckSpeed' >Test Speed</Link> 
              </Button>

              <Button color="inherit" className = {" supportButton "}>
                  <Link to='/ViewTickets'>Tickets</Link> 
              </Button>

              <Button color="inherit" className = {" supportButton "}>
                  <Link to='/ViewStatus'>View</Link> 
              </Button>

              <Button color="inherit"className = {" supportButton "}>
              <Link to='/CreateTicket'>File a Complaint</Link>  </Button>
            </Typography>
            <IconButton  color="inherit" align = "right">
            
              <Badge className={"MuiIconButton-colorInherit-110"} badgeContent={2} color="secondary">
                <Notifications stateValue = {this.state} isAuthed={true} />
              </Badge>
              <Link to='/Notification'></Link> 
            </IconButton>
            <Button color="inherit" align="right" className = {" supportButton "} 
            onClick={() => this.logoutFromApp(1)}>
              <Link to='/'>Logout</Link> 
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
              <CustomTableCell align="center">Date of request</CustomTableCell>
              <CustomTableCell align="center">Raised Against</CustomTableCell>
              <CustomTableCell align="center">Description</CustomTableCell>
              <CustomTableCell align="center">Status</CustomTableCell>
              <CustomTableCell align="center">Action</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        
            {userComplaintList.map(data => (
              <TableRow className={classes.row} key={data.requestID}>
                <CustomTableCell component="th" scope="row">
                  {data.requestID}
                </CustomTableCell>

                {/* <CustomTableCell align="left">{Moment(data.requestedDate).format('YYYY-MM-DD')}</CustomTableCell> */}
                <CustomTableCell align="left"><Moment format="YYYY/MM/DD">{data.requestedDate}</Moment></CustomTableCell>
                <CustomTableCell align="left">{data.complaintAgainst}</CustomTableCell>
                <CustomTableCell align="left">{data.description}</CustomTableCell>
                <CustomTableCell align="left">{showTicketStatus(data.status)}</CustomTableCell>
                <CustomTableCell align="left">

                {/* <Button color="inherit" align="left" onClick={() => this.openStatusDialog(data)} >View</Button>  */}
                      <Button color="inherit" align="left" className = {"hideUnderLine"} onClick={()=> this.setRequestId(data.requestID)}>
                          <Link to='/ManageTickets' >View</Link>
                      </Button> 

                      <Button color="inherit" align="left" onClick={() => this.openCloseRequestDialog(data)}><DeleteIcon /> </Button>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog
          onClose={this.openStatusDialog}
          aria-labelledby="customized-dialog-title"
          open={this.state.openDialog}>
          <DialogTitle  id="customized-dialog-title" onClose={this.closeStatusDialog}>
            Ticket Details
          </DialogTitle >
          <DialogContent >
            <form >
            <TextField
            id="filled-read-only-input"
            label="Request ID"
            defaultValue={this.state.currentData.requestID}
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"/>
          <TextField
            id="filled-read-only-input"
            label="Date of Request"
            defaultValue={this.state.currentData.requestedDate}
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <TextField
            id="filled-read-only-input"
            label="Requested Against"
            defaultValue={this.state.currentData.complaintAgainst}
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <TextField
            id="filled-read-only-input"
            label="Subject"
            defaultValue={this.state.currentData.description}
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"
          />
          <ExpandCollapse>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6" className={classes.heading}>View Status</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        {/* <Stepper  activeStep={this.state.currentData.status}> */}
                        <Stepper  activeStep= {2}>
                        {this.state.currentData.status === 3 ? (stepsWithoutReject.map((newLable, index) => {
                        const props = {};
                        const newLabelProps = {};
                                console.log("Inside without reject");
                        if (this.isStepSkipped(index)) {
                          props.completed = false;
                        }
                        return (
                          <Step key={newLable} {...props}>
                            <StepLabel {...newLabelProps}>{newLable}</StepLabel>
                          </Step>
                        );
                      })) : (steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        console.log("Inside with reject");
                      
                        if (this.isStepSkipped(index)) {
                          props.completed = false;
                        }
                        return (
                          <Step key={label} {...props}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      }))}
                        
                    </Stepper>
                    </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel> 
            </ExpandCollapse>
            </form>
          </DialogContent >
        </Dialog>

     <Switch>
          {/* <Route exact path = "/"  render={(props) => <Monitor {...props} isAuthed={true}  />}></Route> */}
          <Route  path = "/CheckSpeed" component = {CheckSpeed} ></Route>
          
          <Route  path = "/ViewStatus" render={(props) => <ViewStatus/>}></Route>
          <Route  path = "/ManageTickets" render={(props) => <ManageTickets stateVal = {this.state} isAuthed={true}  />}></Route>
          {/* <Route  path = "/" component = {Logout} ></Route> */}
      </Switch>
      <div className="footer"> 

</div>
      </div>
    );
    }
  }
}

MySupport.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(MySupport);
 
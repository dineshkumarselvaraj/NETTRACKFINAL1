import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import {BrowserRouter as Router,Route,Link,Switch,Redirect,withRouter} from 'react-router-dom';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import Moment from 'react-moment';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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

const networkType = (value) => {
  switch(value){
    case 1:
      return "Mobile";
    case 2:
      return "BroadBand";
    default:
      return "UnKnown";
  }
}; 

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

class ViewStatus extends Component {

    constructor(props){
        super(props);
        this.state = {
          technicianAssignedData: [],
          isLoaded: false,
          notificationLength: 0,
          openDialog: false,
          openCancelRequestDialog: false,
          currentData: {},
          techID: 0,
          technicianDataList: [],
          networkOperatoreData: {},
          skipped: new Set(),
          isDataLoaded: false,
          currentRequestId: 0,
          ticketId: 0,
        }
    }

    componentDidMount(){
      this.loadTechnicianAssingnedData();
      
    }
   
    setRequestId = async (requestID) => {
      console.log('*****setRequestId method called*********requestID:'+requestID);
      console.log('*************')
      await this.setState({
        currentRequestId : requestID,
      },console.log("currentRequestId :" +this.state.currentRequestId));
      // console.log("State :" +JSON.stringify(this.state));
      // console.log("currentRequestId :" +this.state.currentRequestId);
    };

    loadTicketData = (requestID) => {
      console.log('**********loadTicketData Method called*********');
      console.log('**********RequestID*********'+requestID);
      if(requestID !== 0)
        this.callGetServices(requestID);
    }

    callGetServices = async (requestID) => {
     console.log('**********callGetServices*********');
      var url = 'http://localhost:8082/complaint/request?requestID='+requestID
     await axios({
        method: 'get',
        url : url,
      }).then(response => {
        console.log("Respon se  " +JSON.stringify(response))
        let data = response.data;
        this.callNetworkOperator(data.complaintAgainst)
      
      this.setState({
        isLoaded: true,
        currentData: data,
        isDataLoaded: true,
      })
      }).catch(error => {
      console.log(error);
      });
      console.log("this.currentData : " + JSON.stringify(this.state.currentData));
      console.log("this.currentData : " + this.state.isDataLoaded);
      }
    
      callNetworkOperator = async (partnerID) => {
        console.log('************callNetworkOperator*************');
        console.log('PartnerID :'+partnerID);
        var url = 'http://localhost:8083/partner/?partnerID='+partnerID
        await axios({
          method: 'get',
          url : url,
        }).then(response => {
          console.log("Response networkOperatoreData:  " +JSON.stringify(response))
        let data = response.data;
        this.setState({
          networkOperatoreData: data,
        })
        }).catch(error => {
        console.log(error);
        });
        console.log('networkOperatoreData : ' + JSON.stringify(this.state.networkOperatoreData));
        }

    loadTechnicianAssingnedData = () => {

    //need to pass logged in user id in stead of 2 in the below url
      fetch('http://localhost:8082/complaint/assignedto?assignedUserID=2')
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          technicianAssignedData: data,
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

  handleChange = input => e => {
    this.setState({[input]: e.target.value,openSelectBox: false});
};

  render(){
    var {isLoaded,technicianAssignedData,currentData,ticketId} = this.state;
    const { classes } = this.props;
  
      return (
    <div>
    <div align='left'>
    <Paper className={classes.root}>
    
      <div style={{paddingLeft:"12px"}}>
      <Typography variant="h6" color="inherit" className={classes.grow} align="left">Search Your Ticket Information</Typography>        
      <TextField
            id="outlined-with-placeholder"
            label="Request Id"
            placeholder="Enter Request Id"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange('ticketId')}
        />
        <Fab color="primary" aria-label="Search"   className='searchButton' onClick={()=> this.loadTicketData(ticketId)}>
                <SearchIcon/>
        </Fab>
      </div>
    </Paper>    
    </div>    
      {!this.state.isDataLoaded ?
       <div></div> :
      <div className="wrapper">
        <div className="form-wrapper">
        <form>  
          
          <h1>Ticket Details</h1>
          <h2>Compliant Details</h2>

          <div className="firstName">
            <label htmlFor="requestid">Request ID</label>
            <input type="text" name="requestid" value = {currentData.requestID} inputProps={{readOnly: true,}}/>
          </div>

          <div className="firstName">
            <label htmlFor="networktype">Network Type</label>
            <input type="text" name="networktype" value = {networkType(currentData.networkType)} inputProps={{readOnly: true,}}/>
          </div>

          <div className="firstName">
            <label htmlFor="raisedagainst">Complaint Against</label>
            {/* <input type="text" name="raisedagainst" value = {networkOperator(currentData.complaintAgainst)} inputProps={{readOnly: true,}}/> */}
            <input type="text" name="raisedagainst" value = {this.state.networkOperatoreData.name} inputProps={{readOnly: true,}}/>
            
          </div>

          <div className="firstName">
            <label htmlFor="subject">Subject</label>
            <input type="text" name="subject" value = {currentData.subject} inputProps={{readOnly: true,}}/>
          </div>

          <div className="firstName">
            <label htmlFor="description">Description</label>
            <input type="text" name="description" value = {currentData.description} inputProps={{readOnly: true,}}/>
          </div>

          <div className="firstName">
            <label htmlFor="status">Status</label>
            <input type="text" name="status" value = {showTicketStatus(currentData.status)} inputProps={{readOnly: true,}}/>
          </div>

          <h2>User Details</h2>

            <div className="firstName">
              <label htmlFor="requsterId">Requester Id</label>
              <input type="text" name="requsterId" value = {currentData.requestedBy}
                inputProps={{readOnly: true,}}/>
            </div>

            <div className="firstName">
              <label htmlFor="userName">Name</label>
              <input type="text" name="userName" value = {currentData.requesterName}
                inputProps={{readOnly: true,}}/>
            </div>
            
            <div className="firstName">
              <label htmlFor="email">Email</label>
              <input type="text" name="email" value = {currentData.email} inputProps={{readOnly: true,}}/>
            </div>
            
            <div className="firstName">
              <label htmlFor="area">Locality</label>
              <input type="text" name="area" value = {currentData.area} inputProps={{readOnly: true,}}/>
            </div>

            <div className="firstName">
              <label htmlFor="city">City</label>
              <input type="text" name="city" value = {currentData.city} inputProps={{readOnly: true,}}/>
            </div>

            <div className="firstName">
              <label htmlFor="contactno">ContactNo</label>
              <input type="text" name="contactno" value = {currentData.requesterContactNo} inputProps={{readOnly: true,}}/>
            </div>

            <div className="firstName">
              <label htmlFor="requestercomments">Replied Comments</label>
              <input type="text" name="requestercomments" value = {currentData.userComments} inputProps={{readOnly: true,}}/>
            </div>
            
            <h2>Technician Details</h2>

            <div className="firstName">
              <label htmlFor="technicianId">Assigned To</label>
              <input type="text" name="technicianId" value = {currentData.assignedTo} inputProps={{readOnly: true,}}/>
            </div>

            <div className="firstName">
              <label htmlFor="technicianname">Name</label>
              <input type="text" name="technicianname" value = {currentData.technicianName} inputProps={{readOnly: true,}}/>
            </div> 

            <div className="firstName">
              <label htmlFor="techniciancontactno">Contact No</label>
              <input type="text" name="techniciancontactno" value = {currentData.technicianContactNo} inputProps={{readOnly: true,}}/>
            </div>

            <div className="firstName">
              <label htmlFor="completiondate">Expected Completion Date</label>
              <input type="text" name="completiondate" value = {currentData.expectedCompletionDate} inputProps={{readOnly: true,}}/>
            </div>

            <div className="firstName">
              <label htmlFor="techniciancomments">Technician Comments</label>
              <input type="text" name="techniciancomments" value = {currentData.technicianComments} inputProps={{readOnly: true,}}/>
            </div>

      <h2></h2>      

          </form>

          <div className="manageButtons">
              <button type="submit"  onClick={() => this.openAssignTicketDialog(currentData.complaintAgainst)}>Assign</button>
              <button type="submit" onClick={() => this.openReplyTicketDialog()}>Reply</button>
              <button onClick={() => this.openCloseTicketDialog()}>Close</button>
          </div>
      <h2></h2>

      <Dialog
      onClose={this.assignCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={this.state.openAssignDialog}>
      <DialogTitle  id="customized-dialog-title" onClose={this.closeAssignDialog}>
        Assign To Technician
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
            Please select any of the technicians available in the dropdown list
         </DialogContentText>
         <MuiThemeProvider>
              <FormControl>
              <Select open={this.state.openSelectBox}
                onClose={this.handleClose}
                defaultValue = "Select"
                onOpen={this.handleOpen}
                value={this.state.techID}
                onChange = {this.handleChange('techID')}
                inputProps={{
                  name: 'techID',
                  id: 'demo-controlled-open-select',
                }}
              >
          
              <option value={0}>Select</option>
              {this.state.technicianDataList.map((data) => (
                  <option value={data.technicianID}>{data.technicianName}</option>
              ))}
              </Select>
              </FormControl>

          </MuiThemeProvider>

      </DialogContent >

        <DialogActions>
          <button onClick={this.assignRequest} color="primary">
            Submit
          </button>
          <button onClick={this.closeAssignDialog} color="primary">
            Cancel
          </button>
        </DialogActions>
      </Dialog> 

      <Dialog
      onClose={this.openTicketCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={this.state.openDialog}>
      <DialogTitle  id="customized-dialog-title" onClose={this.closeTicketDialog}>
        Ticket Closure Confirmation
      </DialogTitle >
      <DialogContent >
        <DialogContentText>
            Please verify the details before closure of the ticket.
         </DialogContentText>
         <TextField
            autoFocus
            margin="dense"
            id="closurecomments"
            label="Technician Comments"
            value = {this.techComments}
            onChange={this.handleChange('techComments')}
            placeholder="Write your comments for the closure"
            fullWidth
          />
      </DialogContent >

      <DialogActions>
          <button onClick={this.closeRequest} color="primary">
            Submit
          </button>
          <button onClick={this.closeTicketDialog} color="primary">
            Cancel
          </button>
        </DialogActions>

      </Dialog> 

      <Dialog
      onClose={this.replyCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={this.state.openReplyDialog}>
      <DialogTitle  id="customized-dialog-title" onClose={this.closeReplyDialog}>
        Request for clarification
      </DialogTitle >
      <DialogContent >
        <DialogContentText>
            Please mention your queries in the below comments section.
         </DialogContentText>
         <TextField
            autoFocus
            margin="dense"
            id="replycomments"
            label="Technician Comments"
            value = {this.state.techComments}
            onChange={this.handleChange('techComments')}
            placeholder="Write your comments"
            fullWidth
          />
      </DialogContent >

      <DialogActions>
          <button onClick={this.replyRequest} color="primary">
            Submit
          </button>
          <button onClick={this.closeReplyDialog} color="primary">
            Cancel
          </button>
        </DialogActions>

      </Dialog> 

        </div>
      </div>
      }
    </div>
    );
  }
}


ViewStatus.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewStatus);
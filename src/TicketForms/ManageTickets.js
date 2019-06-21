import React, { Component } from "react";
  import {withRouter} from "react-router-dom";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const menuStyles = {
  width: 300,
  fontSize: "30px"
};

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


class ManageTickets extends Component {
  state={
    area: " ",
    assignedTo: 0,
    city: " ",
    complaintAgainst: 0,
    description: " ",
    email: " ",
    expectedCompletionDate: "",
    isNew: 0,
    isReplied: 0,
    networkType: 0,
    requestID: 0,
    requestedBy: 0,
    requesterContactNo: " ",
    requesterName: " ",
    state: " ",
    subject: " ",
    technicianComments: " ",
    technicianContactNo: " ",
    userComments: " ",
    currentData: {},
    networkOperatoreData: {},
    technicianDataList: [],
    technicianData: {},
    techComments: '',
    isLoaded: false,
    openDialog: false,
    openReplyDialog: false,
    openAssignDialog: false,
    techID: 0,
    openSelectBox: false,
  }

  handleClose = () => {
    this.setState({
      openSelectBox: false });
  };

  handleOpen = () => {
  this.setState({
    openSelectBox: true });
  };

    handleChange = input => e => {
        this.setState({[input]: e.target.value,openSelectBox: false});
    };
    

    handleChangeDL = value => e => {
      this.setState({[value]: e.target.value});
  };
    
    handleClose = () => {
      this.setState({ open: false });
    };


    continue = e =>{
      e.preventDefault();
      // createtickId(this.state);
    };
    
    openCloseTicketDialog = (data) => {
      console.log("openStatusDialog Data : " + JSON.stringify(data));
      this.setState({
        openDialog: true,
      });
    };

    closeTicketDialog = () => {
      this.setState({ openDialog: false });
    };

    closeRequest = (id) => {
      console.log('*****CloseRequest method Being called**************')
      var url = 'http://localhost:8082/complaint/ticket/?requestID='+this.state.currentData.requestID+'&technicianComments='+this.state.techComments
    
      axios({
        method: 'PUT',
        url : url,
      }).then(response => {
        console.log("Reply Response  " +JSON.stringify(response))
      let data = response.data;
      this.setState({
        currentData:data,
        openDialog:false,
      })
      }).catch(error => {
      console.log(error);
      });
    };

    openReplyTicketDialog = (data) => {
      this.setState({
        openReplyDialog: true,
      });
    };

    closeReplyDialog = () => {
      this.setState({ openReplyDialog: false });
    };

    replyRequest = () => {
      console.log('*****replyRequest method Being called**************')
      var url = 'http://localhost:8082/complaint/technician/?requestID='+this.state.currentData.requestID+'&technicianComments='+this.state.techComments
    
      axios({
        method: 'PUT',
        url : url,
      }).then(response => {
        console.log("Reply Response  " +JSON.stringify(response))
      let data = response.data;
      this.setState({
        currentData:data,
        openReplyDialog:false,
      })
      }).catch(error => {
      console.log(error);
      });

    };

    openAssignTicketDialog = () => {
      var url = 'http://localhost:8083/technician?partnerID='+this.state.currentData.complaintAgainst+'&status=1'
      axios({
        method: 'get',
        url : url,
      }).then(response => {
        console.log("Technician Response  " +JSON.stringify(response))
      let data = response.data;
      this.setState({
        openAssignDialog: true,
        technicianDataList: data,
      })
      }).catch(error => {
      console.log(error);
      });
    };

    closeAssignDialog = () => {
      this.setState({ openAssignDialog: false });
    };

    assignRequest = () => {
      
      this.getTechnicianDetails();

      console.log('*****assignRequest method Being called**************')
      var url = 'http://localhost:8082/complaint/request?assignedTo='+this.state.techID+'&contactNo='+this.state.technicianData.technicianContactNo+'&requestID='+this.state.currentData.requestID+'&technicianName='+this.state.technicianData.technicianName
      axios({
        method: 'PUT',
        url : url,
      }).then(response => {
        console.log("Assigned Response  " +JSON.stringify(response))
      let data = response.data;
      this.setState({
        currentData:data,
        openAssignDialog:false,
      })
      }).catch(error => {
      console.log(error);
      });
    };

    componentDidMount(){ 
      console.log("**************************************************");
      console.log("requestID " + this.props.stateVal.currentRequestId);
      if(this.props.stateVal.currentRequestId !== 0){
        console.log("********Inside fetch data************")
      this.callGetServices();
      console.log("********Ending fetch data************")
    }
  }

  getTechnicianDetails = async (url) => {
    url = 'http://localhost:8083/technician/'+this.state.techID
    await axios({
      method: 'get',
      url : url,
    }).then(response => {
      console.log("Individual Technician Response" +JSON.stringify(response))
      let data = response.data;
    this.setState({
      technicianData: data,
    })
    }).catch(error => {
    console.log(error);
    });
    console.log("this.currentData : " + JSON.stringify(this.state.currentData));
  }
  callGetServices = async (url) => {
  url = 'http://localhost:8082/complaint/request?requestID='+this.props.stateVal.currentRequestId
  await axios({
    method: 'get',
    url : url,
  }).then(response => {
    console.log("Response  " +JSON.stringify(response))
    let data = response.data;
    this.callNetworkOperator(data.complaintAgainst)
  
  this.setState({
    isLoaded: true,
    currentData: data,
  })
  }).catch(error => {
  console.log(error);
  });
  console.log("this.currentData : " + JSON.stringify(this.state.currentData));
  }

  callNetworkOperator = (partnerID) => {
    var url = 'http://localhost:8083/partner/?partnerID='+partnerID
    axios({
      method: 'get',
      url : url,
    }).then(response => {
      console.log("Response  " +JSON.stringify(response))
    let data = response.data;
    this.setState({
      networkOperatoreData: data,
    })
    }).catch(error => {
    console.log(error);
    });
    }

  render() {
    const {currentData ,isLoaded,values, setValues} = this.state;

    console.log("currentData" + JSON.stringify(currentData));
    console.log("this.isLoaded" + isLoaded);
  
    if(!isLoaded){
      return <div>Loading...</div>
    }else{
    return (
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
            // type = {currentData.technicianComments}
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
            // type= {currentData.technicianComments}
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

      
    );
  }
}
}

export default withRouter(ManageTickets);
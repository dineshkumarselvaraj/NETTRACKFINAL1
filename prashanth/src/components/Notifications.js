import NotificationsIcon from '@material-ui/icons/Notifications'; 
import Popup from "reactjs-popup";

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import NotificationsData from '../data/DummyNotificationData.js';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ExpandCollapse from 'react-expand-collapse';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiDialogActions from '@material-ui/core/DialogActions';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

const contentStyle = {
  maxWidth: "600px",
  width: "90%"
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
      <Typography variant="h4">{children}</Typography>
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

function getSteps() {
  return ['Open', 'Assigned', 'Closed','Rejected'];
}

function getStepsWithoutReject() {
  return ['Open', 'Assigned', 'Closed'];
}

function getCommentDetails(step,assignedTo,reason) {
  switch (step) {
    case 1:
      return 'Your request is still open...';
    case 2:
      return 'Your request is assigned to ' + assignedTo;
    case 3:
      return 'Your request is closed, Kindly check from your end';
    case 4:
      return 'Your request is rejected, Reason :'+ reason;
    default:
      return 'Unknown step';
  }
}

function updateStatusForTicket(data){
  const NotificationsDataTemp = NotificationsData;
  NotificationsDataTemp.map((obj,index)=> {
    if(obj.id === data.id){
      obj.isOpened = true;
      obj.status = data.status;
    }
  })

  return NotificationsDataTemp;
}


class MenuListComposition extends React.Component {
  state = {
    open: false,
    opendialog: false,
    selectState: false,
    NotificationsDataLocal: NotificationsData,
    DataValue: {},
    activeStep: 0,
    skipped: new Set(),
    isOpened: false,
    showStatusDetails: false,
    selected: "",
    openAssigneePopup: false,
    name: "",
    notificationList : [],
  };  

  showStatus = () => {

    console.log("inside showStatus method ")
    this.setState({
      showStatusDetails: true,
    })

  }
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false,
      opendialog: false,
      selectState: false,
      DataValue: {} });
  };

  handleSelect = () => {
    this.setState({ selectState: true });
  };

  handleDialogClose = () => {
    console.log("Inside handleDialogClose");
    this.setState({ open: false,
      opendialog: false,
      selectState: false,
      DataValue: {} });
  };

  // Added for Status check
  isStepOptional = step => step === 1;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped,
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  
  handleClickOpen = (data) => {
    console.log("handleClickOpen :" + data)
    this.setState({
      opendialog: true,
      DataValue: data,
      isOpened: true,
      NotificationsDataLocal: updateStatusForTicket(data),
      
    });
    // console.log("DataValue" + this.state.DataValue)
  };

  handleReject = (data) => {
    console.log("Inside reject method")
    let dataLocal = data;
    dataLocal.status = 4;
    console.log("Inside reject method status, data : " +JSON.stringify(dataLocal) )
    this.setState({
      opendialog: true,
      DataValue: dataLocal,
      isOpened: true,
      NotificationsDataLocal: updateStatusForTicket(dataLocal),
      
    });
   // close();
    console.log("Inside reject method status, NotificationsDataLocal : " + updateStatusForTicket(data).status )
  }

  handleAssignTo = (data) => {
    console.log("Inside reject method")
    let dataLocal = data;
    dataLocal.status = 2;
    dataLocal.assignTo = "Rahul";
    console.log("Inside reject method status, data : " +JSON.stringify(dataLocal) )
    this.setState({
      opendialog: true,
      DataValue: dataLocal,
      isOpened: true,
      NotificationsDataLocal: updateStatusForTicket(dataLocal),
      
    });
   // close();
    console.log("Inside reject method status, NotificationsDataLocal : " + updateStatusForTicket(data).status )
  }

  handleCloseTicket = (data) => {
    console.log("Inside reject method")
    let dataLocal = data;
    dataLocal.status = 3;
    console.log("Inside reject method status, data : " +JSON.stringify(dataLocal) )
    this.setState({
      opendialog: true,
      DataValue: dataLocal,
      isOpened: true,
      NotificationsDataLocal: updateStatusForTicket(dataLocal),
      
    });
   // close();
    console.log("Inside reject method status, NotificationsDataLocal : " + updateStatusForTicket(data).status )
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  _onSelect (assignedToName) {
    console.log('You selected ', assignedToName.label)
    this.setState({selected: assignedToName})
  }

  handleChange = name => event => {
    this.setState({ [name]: Text(event.target.value) });
  };

  handleClickOpenAssigneeDialog = () => {
    console.log("inside handleClickOpenAssigneeDialog");
    this.setState({ openAssigneePopup: true });
  };

  handleAssigneeDialogClose = () => {
    this.setState({ openAssigneePopup: false });
  };

  render() {
    
    const { classes } = this.props;
    const { open,notificationList } = this.state;

    //Status Check
    // const { classes } = this.props;
    const steps = getSteps();
    const stepsWithoutReject = getStepsWithoutReject();
    const assignToList = ['Rahul', 'Vijay', 'Anton']
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label
    const defaultOption = this.state.selected

    const { activeStep,DataValue } = this.state;
    const { stateValue } = this.props;
    console.log(this.state.DataValue.status)
    console.log(JSON.stringify(stateValue.notificationList));

    return (
      <div className={classes.root}>
        <div>
          <Button 
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <NotificationsIcon  />
          </Button>
          <Popper className="popup" open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      { stateValue.notificationList.map((data,index)=> {
                        return <div>
 {/* {this.state.opendialog && */}
<Popup className="popupChild"
    trigger={<MenuItem onClick={()=> this.handleClickOpen(data)}  > 
{/* onClick={()=> this.handleClickOpen(data)} */}
                        {!data.isOpened  ? 
                        
                         (<b>You have new request ( Request Id : {data.requestId} ) <br/>
                         {/* Subject: {data.subject} */}
                         </b>)
                         :  (<div>You have new request ( Request Id : {data.requestId} ) <br/>
                         {/* Subject: {data.subject} */}
                         </div>)
                        }
                        </MenuItem>}
    modal
    contentStyle={contentStyle}>

    {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="popup-header"> Ticket Status  </div>
        <hr/>
        <div className="newFontClass">
              <div>Ticket ID  : {data.id}</div> <br/>
              <label>Email ID   : </label> {data.email} <br/>
              <label>Subject : </label> {data.subject} <br/>
              <label>AssignedTo : </label> {data.assignedTo} <br/>
             {/* { data.status !== 1  (<label>AssignedTo : </label> {data.assignedTo} <br/> )} */}
              {/* <label>Department : </label> {data.department} <br/> */}
              <ExpandCollapse>
              <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Check Status</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                      <Stepper  activeStep={data.status}>

                      {data.status === 3 ? (stepsWithoutReject.map((newLable, index) => {
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
        </div>
        <div className="actions">
          {/* <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            close modal
          </button> */}

        {data.status !== 4 && data.status !== 3 && ( <button onClick={()=> {this.handleReject(data)}}  className="button">Reject</button> )}
        {data.status === 1 && (<button onClick={() => {this.handleAssignTo(data)}} className="button">AssignTo</button>  )}

        { this.openAssigneePopup &&  
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Select AssignTo</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="assignTo">AssignTo</InputLabel>
                <Select
                  value={this.state.assignTo}
                  onChange={this.handleChange('assignTo')}
                  input={<Input id="assignTo" />}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem value={1}>Ajay</MenuItem>
                  <MenuItem value={2}>Rahul</MenuItem>
                  <MenuItem value={3}>Rohit</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Submit
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        }

      {data.status !== 4 && data.status !== 3 && (  <button onClick={()=>{this.handleCloseTicket(data)}} className="button">Close Ticket</button> )}

      {/* { data.status === 1 &&     
      <Popup
        trigger={<button className="button"> Assign To </button>}
        modal
        contentStyle={contentStyle}>
        {close => (
      <div className="modal">
        <a className="close" onClick={close}>
          &times;
        </a>
        <div className="header"> Select AssignTo </div>
        <div className="content">
          <Dropdown assignToList={assignToList} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={(event) => {
              close();
            }}>
            Submit
          </button>
          <button
            className="button"
            onClick={() => {
              console.log("modal closed ");
              close();
            }}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </Popup>
      } */}
        </div>
      </div>
    )}
  </Popup>
                     </div>
                      })}
                    </MenuList>                    
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

MenuListComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuListComposition);
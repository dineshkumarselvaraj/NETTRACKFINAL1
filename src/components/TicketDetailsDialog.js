import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ExpandCollapse from 'react-expand-collapse';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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

function getSteps() {
  return ['Open', 'Assigned', 'Closed/Rejected'];
}

function getStepsWithoutReject() {
  return ['Open', 'Assigned', 'Closed'];
}
class TicketDetailsDialog extends Component {

render(){
  const steps = getSteps();
  const stepsWithoutReject = getStepsWithoutReject();
  const { classes,onClose,children  } = this.props;
  return(
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
            defaultValue={this.state.currentData.requestid}
            className={classes.textField}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
            variant="filled"/>
          <TextField
            id="filled-read-only-input"
            label="Date of Request"
            defaultValue={this.state.currentData.date}
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
            defaultValue={this.state.currentData.companyname}
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
      )
    }
  }

  export default TicketDetailsDialog;
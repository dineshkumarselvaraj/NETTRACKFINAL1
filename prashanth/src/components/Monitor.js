import React,{Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import SimpleLineChart from './SimpleLineChart';
import { withStyles } from '@material-ui/core/styles';
import  DataSpeedInfoExtra from '../data/DummyDataSpeedExtra'
import dataSpeedInfo from '../data/DummyDataSpeed';
import Iframe from 'react-iframe'
const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
    button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

let data = {};
let clickCount = 0;

// function addLatestSpeedInfo(){
//   clickCount++
//   data = DataSpeedInfoExtra[3]
//   console.log("console:"+JSON.stringify(data))
//   return data;
// }

 class Monitor extends Component {
 
   state = {
    DataSpeedInfoLocal: dataSpeedInfo,
   }

  

 async updateLatestSpeed(data){
  let test = await this.state.DataSpeedInfoLocal;
   test.push(data)
  console.log(test)
    // console.log("form main: "+ JSON.stringify(data))
    this.setState( {
      DataSpeedInfoLocal: test
    })
    // console.log(JSON.stringify(this.state.DataSpeedInfoLocal))  
  }


  // addLatestSpeedInfo=()=>{
    
  //   this.updateLatestSpeed()
  //   console.log("console:"+JSON.stringify(data))

  // }
  

  render(){

    const {isAuthed,classes,} = this.props;  
    let lengthOfArray = this.state.DataSpeedInfoLocal.length;
     console.log("length"+lengthOfArray)
    // console.log("values:" + JSON.stringify(values))
    return (
      // 99% per https://github.com/recharts/recharts/issues/172
      
         
      <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Network Monitor
          </Typography>
          
          {/* <Iframe url="https://fast.com/"
            position="absolute"
            width="100%"
            id="myId"
            className="myClassname"
            height="100%"
            styles={{height: "25px"}}/> */}

          <Typography component="div" className={classes.chartContainer}>
            <SimpleLineChart values = {this.state.DataSpeedInfoLocal} />

            
            <label>Ping</label> <label>150 ms</label> <br/>
            <label>Download</label>  <label>{this.state.DataSpeedInfoLocal[lengthOfArray-1].DownloadSpeed} Kbps</label> <br/>
            <label>Upload</label> <label>{this.state.DataSpeedInfoLocal[lengthOfArray-1].UploadSpeed} Kbps</label>  

            {/* <label>Download</label>  <label>{latestData.DownloadSpeed} Kbps</label> <br/>
            <label>Upload</label> <label>{latestData.UploadSpeed} Kbps</label> */}
          </Typography>
        </main>
    );
    }
}

export default withStyles(styles)(Monitor);